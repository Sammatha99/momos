import { SchemaBuilder, ParserBuilder } from 'notion-database-parser';

const saleSchema = SchemaBuilder.create()
  .addProperty('name', 'Name', 'title')
  .addProperty('kpi', 'KPI', 'checkbox')
  .addProperty('status', 'Status', 'multi_select')
  .addProperty('priority', 'Priority', 'select')
  .addProperty('esValue', 'Estimated Value', 'number')
  .addProperty('deadline', 'Deadline', 'date')
  .build();

export const saleParser = ParserBuilder.create().build(saleSchema);
