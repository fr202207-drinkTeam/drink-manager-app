import PostItemData from "../utils/PostItemData";
import "cross-fetch/polyfill"
import { server } from "./../mocks/server"
import { rest } from "msw"

const data1 = {
  itemName: "jest追加テスト用商品データ1",
  description: "説明",
  itemCategory: 1,
  inTheOffice: false,
  approval: true,
  author: 1,
  pollItem: false,
  isDiscontinued: false,
  images: [
    { imagePath: "item/png" },
    { imagePath: "item/png" },
    { imagePath: "item/png" },
  ],
};

const data2 = {
  itemName: "jest追加テスト用商品データ2",
  description: "説明",
  itemCategory: 1,
  inTheOffice: false,
  approval: true,
  author: 1,
  pollItem: false,
  isDiscontinued: false,
  images: [
    { imagePath: "item/png" },
    { imagePath: "item/png" },
    { imagePath: "item/png" },
  ],
};

describe("GetAnItemData", () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test("trueが返ってくること", async () => {
    expect(await PostItemData(data1)).toBe(true)
  })

  test("falseが返ってくること", async () => {
    server.use(
      rest.post("http://localhost:50000/additem", (req, res, ctx) => {
        throw new Error()
      })
    )
    expect(await PostItemData( data2 )).toBe(false)
  })

});
