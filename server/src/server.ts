import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import compression from 'compression'

import { saleParser } from "./utils/parsers/response";
import { parseSortQuery } from "./utils/parsers/query";
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

app.get("/test", async (req, res) => {
  const sorts = parseSortQuery(req.query);

  try {
    const query = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      sorts
    });

    const data = saleParser.parseQueryDatabaseResponse(query);

    res.status(200).json({ message: "Success", data, sorts });
  } catch (error) {
    res.status(500).json({ message: "Error", error: (error as Error).message });
  }
});

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
