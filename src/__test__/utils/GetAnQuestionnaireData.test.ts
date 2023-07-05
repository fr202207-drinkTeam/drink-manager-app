import "cross-fetch/polyfill"
import { rest } from "msw"
import { setupServer } from 'msw/node';
import GetAnQuestionnaireData from "../../utils/GetAnQuestionnaireData";

const id = 123
const mockData = { props1: "hoge", props2: "huga" }

describe("GetAnQuestionnaireData", () => {
  const server = setupServer();
  server.use(
    rest.get('http://localhost:50000/questionnairesresult/123', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ props1: "hoge", props2: "huga" })
      );
    })
  );

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test("アンケートの取得ができる", async () => {
    expect(await GetAnQuestionnaireData(id)).toStrictEqual({
      questionnaireData: mockData,
      getSuccess: true
    })
  })

  test("id が無効な場合、undefined を返す。", async () => {
    expect(await GetAnQuestionnaireData(null)).toBe(undefined);
  });

  test("api が失敗した場合、エラ-を返すようにする。", async () => {
    server.use(
      rest.get("http://localhost:50000/questionnairesresult/123", (req, res, ctx) => {
        throw new Error()
      })
    )
    expect(await GetAnQuestionnaireData(id)).toStrictEqual({
      questionnaireData: undefined,
      getSuccess: false,
    })
  })
})
