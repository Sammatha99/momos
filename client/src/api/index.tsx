// src/api.ts
import axios from 'axios';
import { SaleCRM, SalesCRMColumns } from '../components/SalesCRMTable/type';
import { SortingState } from '@tanstack/react-table';
import { QueryFunction } from '@tanstack/react-query';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getSalesCRM: QueryFunction<
  SaleCRM[],
  (string | SortingState)[]
> = async (props) => {
  // return new Promise((resolve, rejects) => {
  //   setTimeout(async () => {
  //     const res = await api.get('/test');
  //     resolve(res.data.data as SaleCRM[]);
  //   }, 3000);
  // });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, sorting] = props.queryKey;
  const sorts =
    sorting.length && Array.isArray(sorting)
      ? sorting.map((sort) => ({
          property: SalesCRMColumns[sort.id as keyof typeof SalesCRMColumns],
          direction: sort.desc ? 'descending' : 'ascending',
        }))
      : undefined;
  const res = await api.get('/test', {
    params: {
      sorts,
    },
  });
  return res.data.data as SaleCRM[];
};

export default api;
