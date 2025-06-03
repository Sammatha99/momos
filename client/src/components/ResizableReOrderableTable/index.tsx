import {
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import DraggableHeader from '../DraggableHeader';
import ResizeBox from '../ResizeBox';
import styles from './styles.module.css';
import { Props } from './type';
import LoadingSpinner from '@src/components/LoadingSpinner';
import clsx from 'clsx';

export default function ResizableReOrderableTable<T>(props: Props<T>) {
  const { data, columns, sorting, isLoading, onSortingChange } = props;
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() =>
    columns.map((col) => col.id || '')
  );

  const table = useReactTable({
    data,
    columns,
    state: { columnOrder, sorting },
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    isMultiSortEvent(e) {
      return true;
    },
    manualSorting: true,
    onSortingChange: onSortingChange,
    enableMultiSort: true,
  });

  const headerResizeMap = useMemo(() => {
    const map: Record<string, (event: unknown) => void> = {};
    table.getHeaderGroups().forEach((group) => {
      group.headers.forEach((header) => {
        if (header.column.getCanResize()) {
          map[header.column.id] = header.getResizeHandler();
        }
      });
    });
    return map;
  }, [table]);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setColumnOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={styles.container}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <table className={styles.table}>
          <thead>
            <SortableContext
              items={table.getAllLeafColumns().map((col) => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <DraggableHeader key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </SortableContext>
          </thead>
          <tbody className={styles.body}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={styles.cell}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {cell.column.getCanResize() &&
                      headerResizeMap[cell.column.id] && (
                        <ResizeBox onMouse={headerResizeMap[cell.column.id]} />
                      )}
                  </td>
                ))}
              </tr>
            ))}
            {isLoading && !!table.getRowModel().rows.length && (
              <div className={styles.loadingContainer}>
                <LoadingSpinner />
              </div>
            )}
          </tbody>
        </table>
      </DndContext>
      {!table.getRowModel().rows.length && (
        <div className={clsx([styles.loadingContainer, styles.emptyContainer])}>
          {isLoading ? <LoadingSpinner /> : <span>Empty</span>}
        </div>
      )}
    </div>
  );
}
