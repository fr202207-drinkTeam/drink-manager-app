import "cross-fetch/polyfill"
import { rest } from "msw"
import { setupServer } from 'msw/node';
import GetAllQuestionnaireData from "../../utils/GetAllQuestionnairesData";

const id = 123
const mockData = { props1: "hoge", props2: "huga" }

describe("GetAllQuestionnaireData", () => {
  const server = setupServer();
  server.use(
    rest.get('http://localhost:50000/questionnaires', (req, res, ctx) => {
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
    expect(await GetAllQuestionnaireData()).toStrictEqual({
      questionnaireData: mockData,
      getSuccess: true
    })
  })

  test("api が失敗した場合、エラ-を返すようにする。", async () => {
    server.use(
      rest.get("http://localhost:50000/questionnaires", (req, res, ctx) => {
        throw new Error()
      })
    )
    expect(await GetAllQuestionnaireData()).toStrictEqual({
      questionnaireData: undefined,
      getSuccess: false,
    })
  })
})