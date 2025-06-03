import { useSortable } from "@dnd-kit/sortable";
import { Header, flexRender } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import styles from "./styles.module.css";
import ResizeBox from "../ResizeBox";

function DraggableHeader<T>({ header }: { header: Header<T, unknown> }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: header.column.id
    });

  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: header.getSize(),
    cursor: canSort ? "pointer" : "default"
  };

  return (
    <th
      ref={setNodeRef}
      colSpan={header.colSpan}
      className={styles.header}
      style={style}
      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanResize() && (
        <ResizeBox
          onMouse={(e) => {
            header.getResizeHandler()(e);
          }}
        />
      )}
      <span
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={styles.dragHandle}
        onClick={(e) => e.stopPropagation()} // prevent sorting when dragging
      >
        ≡
      </span>
      <span className={styles.sort}>
        {sortDirection === "desc" && "🔽"}
        {sortDirection === "asc" && "🔼"}
      </span>
    </th>
  );
}

export default DraggableHeader;
