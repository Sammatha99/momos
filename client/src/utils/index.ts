import { Condition, Filter, FilterGroup } from "@src/components/Filter/types";

export function isEnumValue<T extends object>(
  enumObj: T,
  value: unknown
): value is T[keyof T] {
  return Object.values(enumObj).includes(value as T[keyof T]);
}

export function formatNotionFilter<T>(
  filter: Filter<T>,
  enumMap: Record<keyof T, string>
): any {
  if ("logic" in filter) {
    return {
      [filter.logic]: filter.filters.map((f) => formatNotionFilter(f, enumMap))
    };
  } else {
    const { property, type, operator, value } = filter;
    const propName = enumMap[property];

    if (type === "multi_select" && Array.isArray(value)) {
      if (operator === "contains") {
        return {
          or: value.map((val: any | T[keyof T]) => ({
            property: propName,
            multi_select: { contains: val }
          }))
        };
      } else if (operator === "does_not_contain") {
        return {
          and: value.map((val: any | T[keyof T]) => ({
            property: propName,
            multi_select: { does_not_contain: val }
          }))
        };
      }
    }

    // other cases (number, string, boolean, select, date...)
    return {
      property: propName,
      [type]: {
        [operator]: value
      }
    };
  }
}
