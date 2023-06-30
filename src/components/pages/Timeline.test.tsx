import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Timeline from "./Timeline";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const apptheme = createTheme({
  typography: {
    fontFamily: ["M PLUS 1p", "sans-serif"].join(","),
  },
});

const requestMock = jest.fn();

const server = setupServer(
  rest.get("http://localhost:50000/items", (req, res, ctx) => {
    requestMock();
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          itemName: "ブライトブレンドブライトブレンド",
          description:
            "ミディアムローストの豆をブレンドしたブライトブレンドは、キャラメル、ベリー、はちみつのバランスのとれたほんのり甘い香りが楽しめる一杯です。",
          image: ["/bright.png", "/item.png", "/item.png"],
          itemCategory: 2,
          createdAt: "",
          intheOffice: true,
          author: "",
          otherItem: false,
          isDiscontinued: false,
        },
        {
          id: 2,
          itemName: "LAVAZZA CLASSICO",
          description:
            "しっかりとした珈琲感とドライフルーツの風味が特徴のミディアムローストコーヒー。バランスのとれたリッチな味わいがお好みの方へオススメです。",
          image: ["/crassico.png", "/item.png", "/coffee.png"],
          itemCategory: 2,
          createdAt: "",
          intheOffice: false,
          author: "",
          otherItem: false,
          isDiscontinued: false,
        },
      ])
    );
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PostForm item information", () => {
  it("Should get item infomation", async () => {
    render(
      <RecoilRoot>
        <ThemeProvider theme={apptheme}>
          <BrowserRouter>
            <Timeline />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    );
    expect(screen.getAllByText("タイムライン")[0]).toBeInTheDocument();
    await waitFor(() => expect(requestMock).toHaveBeenCalled());
  });
});
