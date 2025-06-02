import { useQuery } from '@tanstack/react-query';
import ResizableReOrderableTable from '../ResizableReOrderableTable';
import { columns } from './type';
import { getSalesCRM } from '@src/api';
import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

const SalesCRMTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    data: salesData = [],
    isLoading,
    isFetching,
    // error,
  } = useQuery({
    queryKey: ['getSalesCRM', sorting],
    queryFn: getSalesCRM,
    placeholderData: (previousData) => previousData,
  });

  return (
    <div>
      <h1>SALES CRM</h1>
      <ResizableReOrderableTable
        data={salesData}
        columns={columns}
        sorting={sorting}
        isLoading={isLoading || isFetching}
        onSortingChange={setSorting}
      />
    </div>
  );
};

export default SalesCRMTable;
