import { z } from 'zod';

const directionSchema = z.enum(['ascending', 'descending']);

const propertySortSchema = z.object({
  property: z.string().min(1, 'Property name cannot be empty'),
  direction: directionSchema
});

const timestampSortSchema = z.object({
  timestamp: z.enum(['created_time', 'last_edited_time']),
  direction: directionSchema
});

const sortSchema = z.union([propertySortSchema, timestampSortSchema]);

const sortsSchema = z.array(sortSchema).optional();

const propertyFilterSchema = z.object({
  property: z.string(),
}).passthrough();

const timestampCreatedTimeFilterSchema = z.object({
  timestamp: z.literal('created_time'),
  created_time: z.object({
    after: z.string().datetime().optional(),
    before: z.string().datetime().optional(),
    equals: z.string().datetime().optional(),
    is_empty: z.boolean().optional(),
    is_not_empty: z.boolean().optional(),
    on_or_after: z.string().datetime().optional(),
    on_or_before: z.string().datetime().optional(),
    past_month: z.object({}).optional(),
    past_week: z.object({}).optional(),
    past_year: z.object({}).optional(),
    this_week: z.object({}).optional(),
    next_month: z.object({}).optional(),
    next_week: z.object({}).optional(),
    next_year: z.object({}).optional()
  }).partial()
});

const timestampLastEditedTimeFilterSchema = z.object({
  timestamp: z.literal('last_edited_time'),
  last_edited_time: z.object({
    after: z.string().datetime().optional(),
    before: z.string().datetime().optional(),
    equals: z.string().datetime().optional(),
    is_empty: z.boolean().optional(),
    is_not_empty: z.boolean().optional(),
    on_or_after: z.string().datetime().optional(),
    on_or_before: z.string().datetime().optional(),
    past_month: z.object({}).optional(),
    past_week: z.object({}).optional(),
    past_year: z.object({}).optional(),
    this_week: z.object({}).optional(),
    next_month: z.object({}).optional(),
    next_week: z.object({}).optional(),
    next_year: z.object({}).optional()
  }).partial()
});

const baseFilterSchema = z.union([
  propertyFilterSchema,
  timestampCreatedTimeFilterSchema,
  timestampLastEditedTimeFilterSchema
]);

const compoundFilterSchema: z.ZodType<any> = z.lazy(() => 
  z.union([
    baseFilterSchema,
    z.object({
      or: z.array(compoundFilterSchema)
    }),
    z.object({
      and: z.array(compoundFilterSchema)
    })
  ])
);

const filterSchema = z.union([
  compoundFilterSchema,
  z.object({
    or: z.array(compoundFilterSchema)
  }),
  z.object({
    and: z.array(compoundFilterSchema)
  })
]).optional();

export const notionQueryBodySchema = z.object({
  sorts: sortsSchema,
  filter: filterSchema
});

export type NotionQueryBody = z.infer<typeof notionQueryBodySchema>;