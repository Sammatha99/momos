// src/api.ts
import axios from "axios";
import { SaleCRM, SalesCRMColumns } from "../components/SalesCRMTable/type";
import { SortingState } from "@tanstack/react-table";
import { MutationFunction } from "@tanstack/react-query";
import { FilterGroup } from "@src/components/Filter/types";
import { formatNotionFilter } from "@src/utils";

const api = axios.create({
  baseURL: "http://localhost:8000"
});

export const getSalesCRM: MutationFunction<
  SaleCRM[],
  { sorts?: SortingState; filter?: FilterGroup }
> = async (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sorts: sortsProps, filter: filterProps } = props;
  const sorts =
    sortsProps?.length && Array.isArray(sortsProps)
      ? sortsProps.map((sort) => ({
          property: SalesCRMColumns[sort.id as keyof typeof SalesCRMColumns],
          direction: sort.desc ? "descending" : "ascending"
        }))
      : undefined;
  const filter = filterProps
    ? formatNotionFilter(filterProps, SalesCRMColumns)
    : undefined;
  const res = await api.post("/", {
    sorts,
    filter
  });
  return res.data.data as SaleCRM[];
};

export default api;
