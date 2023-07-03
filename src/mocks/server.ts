import { setupServer } from "msw/node"
import { addPollHandlers, handlers } from "./handlers"

export const server = setupServer(...handlers)
export const addPollServer = setupServer(...addPollHandlers)
