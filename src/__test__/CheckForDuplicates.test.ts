import CheckForDuplicates from "../utils/CheckForDuplicates";
import "cross-fetch/polyfill"
import { server } from "./../mocks/server"
import { rest } from "msw"

describe("商品の重複チェックテスト", () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test("商品名として「jest商品」を渡したらtrueが返ってくること", async() => {
    const result: Boolean = await CheckForDuplicates({ itemName: "jest商品" });
    expect(result).toBe(true);
  });

  test("商品名として「紅茶」を渡したらtrueが返ってくること", async() => {
    const result: Boolean = await CheckForDuplicates({ itemName: "紅茶" });
    expect(result).toBe(false);
  });

  it("エラーが返ってくること", async () => {
    server.use(
      rest.get("http://localhost:50000/itemName/jest", (req, res, ctx) => {
        throw new Error()
      })
    )

    expect(await CheckForDuplicates({ itemName: "jest" }))
    .toBe(false)
  })
});
