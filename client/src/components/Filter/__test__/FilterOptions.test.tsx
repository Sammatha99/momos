import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Filter from '../';
import { initFilter, saleCRMFilter } from '@src/components/SalesCRMTable/type';
import userEvent from '@testing-library/user-event';
import { OperatorByType } from '@src/components/Filter/types';

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

test.each(saleCRMFilter)(
  'updates operator options when $field is selected',
  async (props) => {
    userEvent.setup();
    const { key, type } = props;
    render(<MockFilter />);

    //
    const buttonElement = screen.getByRole('button', {
      name: /add condition/i,
    });
    await userEvent.click(buttonElement);

    // Open first select
    const selectFieldElement = screen.getByLabelText(/field select/i); // <- depends on your aria-label
    await userEvent.click(selectFieldElement);

    // Click the desired option
    const optionElement = await screen.findByRole('option', { name: key });
    await userEvent.click(optionElement);

    // Open second select
    const selectOperatorElement = screen.getByLabelText(/operator select/i);
    await userEvent.click(selectOperatorElement);

    const values: string[] = OperatorByType[type]
      ? OperatorByType[type].map((option) => option)
      : [];

    // Check the expected options are in the DOM
    for (const operator of values) {
      expect(
        await screen.findByRole('option', { name: operator })
      ).toBeInTheDocument();
    }
  }
);
