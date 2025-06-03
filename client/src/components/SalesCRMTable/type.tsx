import { createColumnHelper } from "@tanstack/react-table";
import Cell from "@src/components/Cell";
import { FieldType, FilterGroup, FilterOption } from "../Filter/types";

export const initFilter: FilterGroup = {
  logic: "and",
  filters: []
};

export enum Status {
  CLOSED = "Closed",
  LEAD = "Lead",
  PROPOSAL = "Proposal",
  NEGOTIATION = "Negotiation",
  LOST = "Lost",
  QUALIFIED = "Qualified"
}

export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}

export enum SalesCRMColumns {
  name = "Name",
  kpi = "KPI",
  status = "Status",
  priority = "Priority",
  esValue = "Estimated Value",
  deadline = "Deadline"
}

export interface SaleCRM {
  id: string;
  name: string;
  kpi: boolean;
  status: Status[];
  priority: Priority;
  esValue: number;
  deadline: string;
}

export const saleCRMFilter: FilterOption<SaleCRM>[] = [
  { key: "name", type: "rich_text" },
  {
    key: "kpi",
    type: "checkbox",
    values: [true, false]
  },
  {
    key: "status",
    type: "multi_select",
    values: Object.values(Status)
  },
  {
    key: "priority",
    type: "select",
    values: Object.values(Priority)
  },
  { key: "esValue", type: "number" },
  { key: "deadline", type: "date" }
];

const columnHelper = createColumnHelper<SaleCRM>();

export const columns = [
  // columnHelper.accessor((row) => row.id, {
  //   id: 'id',
  //   header: () => <span>Id</span>,
  //   cell: (info) => <span>{info.getValue()}</span>,
  //   footer: (info) => info.column.id,
  // }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: () => <span>Name</span>,
    cell: (info) => <Cell value={info.getValue()} />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.kpi, {
    id: "kpi",
    header: () => <span>KPI</span>,
    cell: (info) => <Cell value={info.getValue()} />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: () => <span>Status</span>,
    cell: (info) => <Cell value={info.getValue()} />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.priority, {
    id: "priority",
    header: () => <span>Priority</span>,
    cell: (info) => <Cell value={info.getValue()} />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.esValue, {
    id: "esValue",
    header: () => <span>Estimated Value</span>,
    cell: (info) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(info.getValue());

      return <Cell value={formatted} />;
    },
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.deadline, {
    id: "Deadline",
    header: () => <span>Deadline</span>,
    cell: (info) => {
      const formatted = info.getValue()
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(new Date(info.getValue()))
        : "";
      return <Cell value={formatted} />;
    },
    footer: (info) => info.column.id
  })
];
