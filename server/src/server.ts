require('dotenv').config();
import express from 'express';
import cors from 'cors';

import { saleParser } from './utils/parsers/response';
import { parseSortQuery } from './utils/parsers/query';
import { notion } from './db';
import { AddressInfo } from 'net';

const app = express();

app.use(cors());

app.get('/test', async (req, res) => {
  const sorts = parseSortQuery(req.query);

  try {
    const query = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
      sorts,
    });

    const data = saleParser.parseQueryDatabaseResponse(query);

    res.status(200).json({ message: 'Success', data, sorts });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: (error as Error).message });
  }
});

app.get('/', async (req, res) => {
  const sorts = parseSortQuery(req.query);

  try {
    const query = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
      sorts,
      // filter: {

      // }
    });

    const data = saleParser.parseQueryDatabaseResponse(query);

    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: (error as Error).message });
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log(
    'Your app is listening on port ' + (listener.address() as AddressInfo)?.port
  );
});
