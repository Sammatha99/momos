export type LogicOperator = "and" | "or";

export interface Condition<T> {
  property: keyof T;
  type: FieldType;
  operator: Operators;
  value?:
    | (T[keyof T] extends any[] ? T[keyof T] : T[keyof T][])
    | string
    | number;
}

export type Filter<T> = Condition<T> | FilterGroup<T>;

export interface FilterGroup<T = any> {
  logic: LogicOperator;
  filters: Filter<T>[];
}

export type FilterOption<T> =
  | {
      key: keyof T;
      type: "multi_select" | "select" | "checkbox";
      values?: T[keyof T] extends any[] ? T[keyof T] : T[keyof T][];
    }
  | {
      key: keyof T;
      type: Exclude<FieldType, "multi_select" | "select" | "checkbox">;
    };

export type FieldType =
  | "rich_text"
  | "number"
  | "select"
  | "multi_select"
  | "checkbox"
  | "date";

const OPERATORS = [
  "equals",
  "does_not_equal",
  "contains",
  "does_not_contain",
  "starts_with",
  "ends_with",
  "is_empty",
  "is_not_empty",
  "greater_than",
  "less_than",
  "greater_than_or_equal_to",
  "less_than_or_equal_to",
  "before",
  "after",
  "next_month",
  "next_week",
  "on_or_after",
  "on_or_before",
  "past_month",
  "past_week",
  "past_year",
  "this_week"
] as const;

export const OPERATORS_SINGLE = [
  "is_empty",
  "is_not_empty",
  "past_month",
  "past_week",
  "past_year",
  "this_week",
  "next_month",
  "next_week"
] as const;

export type Operators = (typeof OPERATORS)[number];
export type OperatorsSingle = (typeof OPERATORS_SINGLE)[number];

export const OperatorByType: {
  [key in FieldType]: Operators[];
} = {
  rich_text: [
    "equals",
    "does_not_equal",
    "contains",
    "does_not_contain",
    "starts_with",
    "ends_with",
    "is_empty",
    "is_not_empty"
  ],
  number: [
    "equals",
    "does_not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal_to",
    "less_than_or_equal_to",
    "is_empty",
    "is_not_empty"
  ],
  select: ["equals", "does_not_equal", "is_empty", "is_not_empty"],
  multi_select: ["contains", "does_not_contain", "is_empty", "is_not_empty"],
  checkbox: ["equals", "does_not_equal"],
  date: [
    "equals",
    "before",
    "after",
    "is_empty",
    "is_not_empty",
    "next_month",
    "next_week",
    "on_or_after",
    "on_or_before",
    "past_month",
    "past_week",
    "past_year",
    "this_week"
  ]
};
