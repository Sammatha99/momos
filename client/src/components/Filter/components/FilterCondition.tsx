import globalStyles from '@src/index.module.css';
import clsx from 'clsx';
import Select, { SingleValue } from 'react-select';
import {
  Condition,
  FilterOption,
  OPERATORS_SINGLE,
  OperatorByType,
  Operators,
} from '../types';
import { useMemo } from 'react';

const FilterCondition = <T,>({
  filterOptions,
  condition,
  onChange,
  removeFilter,
}: {
  filterOptions: FilterOption<T>[];
  condition: Condition<T>;
  onChange: (c: Condition<T>) => void;
  removeFilter: () => void;
}) => {
  const selectedOption = filterOptions.find(
    (option) => option.key === condition.property
  );

  const filterOptionsValues = filterOptions.map((option) => ({
    label: option.key,
    value: option.key,
  }));

  const operatorValues =
    selectedOption && OperatorByType[selectedOption.type]
      ? OperatorByType[selectedOption.type].map((option) => ({
          label: option,
          value: option,
        }))
      : [];

  const values =
    selectedOption && 'values' in selectedOption && selectedOption.values
      ? selectedOption.values.map((value) => ({
          label: `${value}`,
          value: value,
        }))
      : [];

  const selectedValues = useMemo(() => {
    if (selectedOption?.type === 'multi_select') {
      const values = Array.isArray(condition.value)
        ? condition.value
        : condition.value
        ? [condition.value]
        : [];

      return values.map((value) => ({
        value,
        label: `${value}`,
      }));
    }

    if (condition.value != null) {
      return {
        value: condition.value,
        label: `${condition.value}`,
      };
    }

    return undefined;
  }, [filterOptions, condition.property, condition.value]);

  const onChangeProperty = (
    newProperty: SingleValue<{
      value: keyof T | undefined;
      label: keyof T | undefined;
    }>
  ) => {
    if (newProperty?.value) {
      const newSelected = filterOptions.find(
        (option) => option.key === newProperty.value
      );
      newSelected &&
        onChange({
          property: newProperty?.value,
          type: newSelected.type,
          operator: OperatorByType[newSelected.type][0],
          value: undefined,
        });
    }
  };

  const onChangeOperator = (
    newOperator: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    if (newOperator?.value) {
      if (
        (OPERATORS_SINGLE as readonly string[]).includes(newOperator?.value)
      ) {
        onChange({
          ...condition,
          operator: newOperator?.value as Operators,
          value: undefined,
        });
      } else {
        onChange({ ...condition, operator: newOperator?.value as Operators });
      }
    }
  };

  return (
    <div className={clsx([globalStyles.gap10, globalStyles.wrap])}>
      <Select
        inputId="field-select"
        aria-label="Field Select"
        className={clsx([globalStyles.flex1, 'basic-single'])}
        classNamePrefix="select"
        menuPosition="fixed"
        value={{
          value: selectedOption?.key,
          label: selectedOption?.key,
        }}
        onChange={onChangeProperty}
        name="fieldName"
        options={filterOptionsValues}
      />
      <Select
        inputId="operator-select"
        aria-label="Operator Select"
        className={clsx([globalStyles.flex1, 'basic-single'])}
        classNamePrefix="select"
        menuPosition="fixed"
        value={{
          value: condition.operator,
          label: condition.operator,
        }}
        onChange={onChangeOperator}
        name="operator"
        options={operatorValues}
      />
      {(OPERATORS_SINGLE as readonly string[]).includes(
        condition.operator
      ) ? null : 'values' in (selectedOption || {}) ||
        Array.isArray(condition.value) ? (
        <Select
          inputId="values-select"
          aria-label="Values Select"
          className={clsx([globalStyles.flex1, 'basic-single'])}
          classNamePrefix="select"
          menuPosition="fixed"
          isMulti={selectedOption?.type === 'multi_select'}
          value={selectedValues}
          onChange={(newOption) => {
            const newValue = Array.isArray(newOption)
              ? newOption.map((opt) => opt.value)
              : (newOption as { value: any } | null)?.value;

            onChange({
              ...condition,
              value: newValue,
            });
          }}
          name="values"
          options={values}
        />
      ) : (
        <input
          type={selectedOption?.type || 'text'}
          value={condition.value as string}
          onChange={(e) => {
            onChange({
              ...condition,
              value:
                selectedOption?.type === 'number'
                  ? +e.target.value
                  : e.target.value,
            });
          }}
          placeholder="Value"
          className={clsx([globalStyles.flex1, globalStyles.input])}
        />
      )}
      <button onClick={removeFilter}>🗑</button>
    </div>
  );
};

export default FilterCondition;
