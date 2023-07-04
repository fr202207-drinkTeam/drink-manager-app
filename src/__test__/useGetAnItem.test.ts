import useGetAnItem from "../hooks/useGetAnItem";
import "cross-fetch/polyfill"
import { server } from "./../mocks/server"
import { rest } from "msw"

const mockItemId = 12345;
const mockItemData = {
  id: 16,
  itemName: "紅茶",
  description: "紅茶の説明が入ります",
  itemCategory: 7,
  createdAt: "2023-06-26T09:03:56.178Z",
  approval: true,
  author: 1,
  images: [
    {
      id: 30,
      itemId: 16,
      imagePath: "/item.png",
      createdAt: "2023-06-26T09:03:56.178Z",
    },
  ],
  inTheOffice: true,
  isDiscontinued: false,
  manufacturer: null,
  pollItem: false,
  purchaseLocation: null,
};

describe("GetAnItemData", () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test("正常にデータ取得ができること", async () => {
    expect(await useGetAnItem({ itemId: mockItemId })).toStrictEqual(mockItemData);
  });

  test("itemIdがnullの時、undefinedが返ってくること", async () => {
    expect(
      await useGetAnItem(({ itemId: null } as unknown) as {
        itemId: number;
      })
    ).toBe(undefined);
  });

  test("エラーが返ってくること", async () => {
    server.use(
      rest.get("http://localhost:50000/getItemData/12345", (req, res, ctx) => {
        throw new Error();
      })
    );

    expect(await useGetAnItem({ itemId: mockItemId })).toStrictEqual(undefined);
  });

});
