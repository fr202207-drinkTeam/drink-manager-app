import { rest } from "msw"

export const handlers = [
  rest.get("http://localhost:50000/getItemData/12345", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ props1: "hoge", props2: "huga" }))
  }),
]
