import { waitFor } from "@testing-library/react";
import sendPostData from "../../utils/sendPostData";
import { rest } from "msw";
import { setupServer } from "msw/node";

const requestMock = jest.fn();

const server = setupServer(
  rest.post("http://localhost:50000/posts", (req, res, ctx) => {
    requestMock();
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// sendPostData(
//   postForm.current[0].value,
//   postForm.current[2].value,
//   inputImages,
//   loginUser.id,
//   setPostError,
//   setEditPostData,
//   editPostData
// );

describe("Send PostData", () => {
  it("Should send PostData correctly", async () => {
    const setPostError = jest.fn();
    const setEditPostData = jest.fn();
    sendPostData(
      "新しい投稿です。コーヒーは美味しいです。",
      "1",
      [new File([], "")],
      1,
      setPostError,
      setEditPostData,
      null
    );
    await waitFor(() => expect(requestMock).toHaveBeenCalled());
  });

  it("Should not send PostData and due to character limit", async () => {
    const setPostError = jest.fn();
    const setEditPostData = jest.fn();
    await sendPostData(
      "新しい投稿です。",
      "1",
      [new File([], "")],
      1,
      setPostError,
      setEditPostData,
      null
    );
    await waitFor(() =>
      expect(setPostError).toHaveBeenCalledWith(
        "投稿内容は20文字以上255文字以内で入力してください"
      )
    );
  });
});
