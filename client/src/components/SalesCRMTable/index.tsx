import { getSalesCRM } from "@src/api";
import globalStyles from "@src/index.module.css";
import { useMutation } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "../Filter";
import { FilterGroup } from "../Filter/types";
import ResizableReOrderableTable from "../ResizableReOrderableTable";
import { columns, initFilter, saleCRMFilter } from "./type";

const SalesCRMTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterGroup, setFilterGroup] = useState<FilterGroup>(initFilter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: salesData = [],
    isPending,
    mutate
  } = useMutation({
    mutationFn: getSalesCRM
  });

  useEffect(() => {
    mutate({ sorts: sorting, filter: filterGroup });
  }, [sorting, filterGroup]);

  return (
    <div>
      <h1>SALES CRM</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className={globalStyles.mb10}
      >
        Open Filter
      </button>
      <Filter
        FilterOptions={saleCRMFilter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filterGroup={filterGroup}
        onSave={(newGroup) => {
          setFilterGroup(newGroup);
          setIsModalOpen(false);
        }}
      />
      <ResizableReOrderableTable
        data={salesData}
        columns={columns}
        sorting={sorting}
        isLoading={isPending}
        onSortingChange={setSorting}
      />
    </div>
  );
};

export default SalesCRMTable;
