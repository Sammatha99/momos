type SortDirection = 'ascending' | 'descending';

interface Sort {
  property: string;
  direction: SortDirection;
}

const SORT_SEPARATOR = ':';

// export const parseSortQuery = (query: string): Sort[] | undefined => {
//   console.log('🚀 ~ query:', query);

//   if (!query) {
//     return;
//   }

//   return query.split(',').map((entry) => {
//     const [property, directionStr] = entry.split(SORT_SEPARATOR);

//     const direction: SortDirection =
//       directionStr === 'desc' ? 'descending' : 'ascending';

//     return { property, direction };
//   });
// };

export function parseSortQuery(query: Record<string, any>): Sort[] {
  const result: Record<number, Partial<Sort>> = {};

  for (const key in query) {
    const match = key.match(/^sorts\[(\d+)\]\[(property|direction)\]$/);
    if (!match) continue;

    const index = parseInt(match[1], 10);
    const field = match[2] as keyof Sort;

    if (!result[index]) result[index] = {};
    result[index][field] = query[key];
  }

  return Object.keys(result)
    .map(Number)
    .sort((a, b) => a - b)
    .map((index) => {
      const item = result[index];
      if (!item.property || !item.direction) {
        throw new Error(
          `Missing property or direction for sort index ${index}`
        );
      }
      return item as Sort;
    });
}
