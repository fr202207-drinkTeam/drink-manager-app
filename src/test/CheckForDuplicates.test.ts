import CheckForDuplicates from "../utils/CheckForDuplicates";

describe("商品の重複チェックテスト", () => {
  test("商品名として「jest商品」を渡したらtrueが返ってくること", async() => {
    const result: Boolean = await CheckForDuplicates({ itemName: "jest商品" });
    expect(result).toBe(true);
  });

  test("商品名として「テスト」を渡したらtrueが返ってくること", async() => {
    const result: Boolean = await CheckForDuplicates({ itemName: "テスト" });
    expect(result).toBe(false);
  });
});
