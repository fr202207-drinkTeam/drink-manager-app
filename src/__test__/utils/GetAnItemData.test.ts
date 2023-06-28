import GetAnItemData from "../../utils/GetAnItemData"
import "cross-fetch/polyfill"
import { server } from "./../../mocks/server"
import { rest } from "msw"

const mockItemId = 12345
const mockItemData = { props1: "hoge", props2: "huga" }

describe("GetAnItemData", () => {
  // it("should return itemData successfully, mocking fetch api", async () => {
  //   // こういう、リクエストそのものをモックする必要がある時のやり方はいくつかあります。
  //   // ①fetchという関数そのものをmockしてしまう
  //   // ②mswなどを使って、リクエスト自体はさせるが返り値をmockしてしまうやり方。

  //   // このitの中は、①の方法を行っている。
  //   // jest.fnを使って関数自体をモックする方法は使い勝手がいいので、色々なところで使えると思います
  //   // ただ、glonalなfetchをmockした後にmockClearするやり方がわからなかったのでコメントアウトしています、、すみません

  //   const mockFetchAPI = () =>
  //     Promise.resolve({
  //       ok: true,
  //       status: 200,
  //       statusText: "ok",
  //       json: async () => mockItemData,
  //     })

  //   global.fetch = jest.fn().mockImplementation(mockFetchAPI)
  //   // itemDataの型
  //   expect(await GetAnItemData({ itemId: mockItemId })).toStrictEqual({
  //     itemData: mockItemData,
  //     getSuccess: true,
  //   })
  // })

  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it("should return itemData successfully, with msw", async () => {
    expect(await GetAnItemData({ itemId: mockItemId })).toStrictEqual({
      itemData: mockItemData,
      getSuccess: true,
    })
  })

  it("hould return undefined, when itemId is invalid", async () => {
    expect(
      await GetAnItemData(({ itemId: null } as unknown) as {
        itemId: number
      })
    ).toBe(undefined)
  })

  it("should return error response, when getItemData api failed", async () => {
    server.use(
      rest.get("http://localhost:50000/getItemData/12345", (req, res, ctx) => {
        throw new Error()
      })
    )

    expect(await GetAnItemData({ itemId: mockItemId })).toStrictEqual({
      itemData: undefined,
      getSuccess: false,
    })
  })
})
