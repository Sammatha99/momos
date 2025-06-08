import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SalesCRMTable from '../';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MockSalesCRMTable = () => (
  <QueryClientProvider client={new QueryClient()}>
    <SalesCRMTable />
  </QueryClientProvider>
);

test('renders open filter button', () => {
  render(<MockSalesCRMTable />);
  const buttonElement = screen.getByText(/Open Filter/i);
  expect(buttonElement).toBeInTheDocument();
});

test('open filter', () => {
  render(<MockSalesCRMTable />);
  const buttonElement = screen.getByRole('button', { name: /Open Filter/i });
  fireEvent.click(buttonElement);
  const filterModalElement = screen.getByRole('dialog');
  expect(filterModalElement).toBeInTheDocument();
});
