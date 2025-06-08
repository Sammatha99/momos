import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import compression from 'compression'

import { saleParser } from "./utils/parsers/response";
import { notion } from "./db";
import { env } from "./env";
import { validate } from "./validators/validate";
import { notionQueryBodySchema, NotionQueryBody } from "./validators/schemas";
import {errorHandler} from './middlewares/errorHandler'
import {asyncHandler} from './utils/asyncHandler'

const app = express();

app.use(cors());
app.use(compression())
app.use(express.json());

app.post("/", validate({ body: notionQueryBodySchema }), asyncHandler<unknown, any, NotionQueryBody>(async (req, res) => {
  const { sorts, filter } = req.body;

  const query = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      sorts,
      filter
    });

    const data = saleParser.parseQueryDatabaseResponse(query);

    res
      .status(StatusCodes.OK)
      .json({ success: true , data });
}));

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Your app is listening on port ${env.PORT}`);
});
