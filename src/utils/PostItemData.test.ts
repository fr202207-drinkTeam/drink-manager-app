import PostItemData from "./PostItemData";

type Data = {
  itemName: string;
  description: string;
  itemCategory: number;
  inTheOffice: boolean;
  approval: boolean;
  author: number | null;
  pollItem: boolean;
  isDiscontinued: boolean;
  images: { imagePath: string | unknown }[];
};

const data: Data = {
  itemName: "jestテスト用商品データ",
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

describe("商品の追加登録テスト", () => {
  test("商品追加が成功すること", async () => {
    const result: Boolean = await PostItemData(data);
    expect(result).toBe(true);
  });
});
