import { render, screen } from "@testing-library/react";
import PostForm from "../components/organisms/PostForm";
import userEvent from "@testing-library/user-event";
import React from "react";



const itemData = [
  {
    id: 1,
    itemName: "ブライトブレンドブライトブレンド",
    description:
      "ミディアムローストの豆をブレンドしたブライトブレンドは、キャラメル、ベリー、はちみつのバランスのとれたほんのり甘い香りが楽しめる一杯です。",
    image: ["/bright.png", "/item.png", "/item.png"],
    itemCategory: 2,
    createdAt: new Date(2021, 0, 1, 1, 1, 1),
    intheOffice: true,
    author: "",
    otherItem: false,
    isDiscontinued: false,
  },
];

const loginUser = {
  userId: 1111,
  firstName: "テスト",
  lastName: "太郎",
  email: "example1@rakus-partners.co.jp",
  password: "Example1",
  confirmPassword: "Example1",
  authId: "lx3GELGo9kbsM1NxkhaHMU08ISa2",
  isAdmin: true,
  id: 1,
};

const setEditPostData = jest.fn();
const setReloadPost = jest.fn();

// describe("Rendering", () => {
//   it("Should render all elements correctly", () => {
//     const itemError = false;
//     const editPostData = null;
//     const reloadPost = false;

//     render(
//       <PostForm
//         itemData={itemData}
//         itemError={itemError}
//         loginUser={loginUser}
//         editPostData={editPostData}
//         setEditPostData={setEditPostData}
//         reloadPost={reloadPost}
//         setReloadPost={setReloadPost}
//       />
//     );

//     expect(screen.getByRole("form")).toBeTruthy();
//     expect(screen.getAllByRole("button")[0]).toHaveTextContent("商品を選択");
//   });

//   it("Should not render Item Select", () => {
//     const itemError = true;
//     const editPostData = null;
//     const reloadPost = false;
//     render(
//       <PostForm
//         itemData={itemData}
//         itemError={itemError}
//         loginUser={loginUser}
//         editPostData={editPostData}
//         setEditPostData={setEditPostData}
//         reloadPost={reloadPost}
//         setReloadPost={setReloadPost}
//       />
//     );
//     expect(screen.getByRole("form")).toBeTruthy();
//     expect(screen.getAllByRole("button")[0]).toHaveTextContent(
//       "商品情報の取得に失敗しました、再読み込みしてください"
//     );
//   });
// });

describe("Post content", () => {
  it("Should post new post correctly", async () => {
    const itemError = false;
    const editPostData = null;
    const reloadPost = false;
    render(
      <PostForm
        itemData={itemData}
        itemError={itemError}
        loginUser={loginUser}
        editPostData={editPostData}
        setEditPostData={setEditPostData}
        reloadPost={reloadPost}
        setReloadPost={setReloadPost}
      />
    );

    expect(screen.queryByLabelText("transition-modal-title")).toBeNull();

    const typingContent = "こちらは新しい投稿です。コーヒーは美味しいです。";

    userEvent.type(screen.getByRole("textbox"), typingContent);

    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
      typingContent
    );
    userEvent.click(screen.getAllByRole("button")[1]);

    expect(await screen.findByLabelText("transition-modal-title")).toBeTruthy();
    expect(await screen.findAllByText("確定")).toBeTruthy();

    // userEvent.click(screen.getAllByText("確定")[1]);
    // await waitFor(() => expect(requestMock).toHaveBeenCalledTimes(1));
  });
});
