import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Filter from '../';
import { initFilter, saleCRMFilter } from '@src/components/SalesCRMTable/type';
import userEvent from '@testing-library/user-event';

const MockFilter = ({ maxDepth = 2 }: { maxDepth?: number }) => (
  <Filter
    isOpen={true}
    filterGroup={initFilter}
    FilterOptions={saleCRMFilter}
    maxDepth={maxDepth}
    onClose={() => {}}
    onSave={() => {}}
  />
);

const testMaxDepth = async (maxDepth: number) => {
  userEvent.setup();
  render(<MockFilter maxDepth={maxDepth} />);
  for (let depth = 1; depth < maxDepth; depth++) {
    const addGroupButtons = screen.getAllByRole('button', {
      name: /Add Group/i,
    });
    await userEvent.click(addGroupButtons[0]);
  }
  const finalFilterBuilder = screen.getByTestId(`FilterBuilder_${maxDepth}`);
  const addGroupButton = within(finalFilterBuilder).queryByText(/Add Group/i);
  expect(addGroupButton).not.toBeInTheDocument();
};

test('render maxdepth is 2', () => {
  testMaxDepth(2);
});

test('render maxdepth is 3', () => {
  testMaxDepth(3);
});
