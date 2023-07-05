import "cross-fetch/polyfill"
import { rest } from "msw"
import { setupServer } from 'msw/node';
import GetAnPollData from "../../utils/GetAnPollData";

const id = 123
const mockItemData = { props1: "hoge", props2: "huga" }

describe("GetAnPollData", () => {
  const server = setupServer();
  server.use(
    rest.get('http://localhost:50000/pollsdata/123', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ props1: "hoge", props2: "huga" })
      );
    })
  );

  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test("票の取得ができる", async () => {
    expect(await GetAnPollData(id)).toStrictEqual({
      pollData: mockItemData,
      getSuccess: true
    })
  })

  test("id が無効な場合、undefined を返す。", async () => {
    expect(await GetAnPollData(null)).toBe(undefined);
  });

  test("api が失敗した場合、エラ-を返すようにする。", async () => {
    server.use(
      rest.get("http://localhost:50000/pollsdata/123", (req, res, ctx) => {
        throw new Error()
      })
    )
    expect(await GetAnPollData(id)).toStrictEqual({
      pollData: undefined,
      getSuccess: false,
    })
  })
})
