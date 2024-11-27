import cors from "cors"
import express from "express"

import { rootRouter } from "./routes/index"
import loggingMiddlware from "./middleware/logging.middleware"

const app = express()

// app.use(
//   cors({
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//   })
// )
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggingMiddlware)

app.use("/api/v1", rootRouter)

export default app