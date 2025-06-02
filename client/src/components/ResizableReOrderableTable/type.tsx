import {
  ColumnDef,
  OnChangeFn,
  RowData,
  SortingState,
} from '@tanstack/react-table';

export type Props<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  sorting: SortingState;
  isLoading: boolean;
  onSortingChange: OnChangeFn<SortingState>;
};
