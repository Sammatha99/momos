import {
  Filter,
  FilterGroup,
  FilterOption,
  LogicOperator,
  OperatorByType,
} from '../types';
import styles from '../styles.module.css';
import globalStyles from '@src/index.module.css';
import clsx from 'clsx';
import FilterCondition from './FilterCondition';

interface FilterBuilderProps<T> {
  filterOptions: FilterOption<T>[];
  filterGroup: FilterGroup;
  depth: number;
  maxDepth: number;
  isRoot?: boolean;
  onChange: (group?: FilterGroup) => void;
}

const FilterBuilder = <T,>({
  filterOptions,
  filterGroup,
  onChange,
  depth,
  maxDepth,
  isRoot = true,
}: FilterBuilderProps<T>) => {
  const updateFilterAt = (index: number, newFilter?: Filter<T>) => {
    const newFilters = [...filterGroup.filters];
    if (!newFilter) {
      const newFilters = filterGroup.filters.filter((_, i) => i !== index);
      onChange({ ...filterGroup, filters: newFilters });
    } else {
      newFilters[index] = newFilter;
      onChange({ ...filterGroup, filters: newFilters });
    }
  };

  const removeFilterAt = (index: number) => {
    const newFilters = filterGroup.filters.filter((_, i) => i !== index);
    onChange({ ...filterGroup, filters: newFilters });
  };

  const addCondition = () => {
    onChange({
      ...filterGroup,
      filters: [
        ...filterGroup.filters,
        {
          property: filterOptions[0].key,
          operator: OperatorByType[filterOptions[0].type][0],
          type: filterOptions[0].type,
          value: undefined,
        },
      ],
    });
  };

  const addGroup = () => {
    if (depth >= maxDepth) return;
    onChange({
      ...filterGroup,
      filters: [...filterGroup.filters, { logic: 'and', filters: [] }],
    });
  };

  const updateLogic = (logic: LogicOperator) => {
    onChange({ ...filterGroup, logic });
  };

  const deleteGroup = () => {
    onChange(isRoot ? { logic: filterGroup.logic, filters: [] } : undefined);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLogic(e.target.value as LogicOperator);
  };

  return (
    <div
      data-testid={`FilterBuilder_${depth}`}
      className={styles.filterGroup}
      style={{
        marginLeft: (depth - 1) * 20,
      }}
    >
      <div className={globalStyles.mb10}>
        <select value={filterGroup.logic} onChange={onChangeSelect}>
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>

        <button className={globalStyles.ml10} onClick={deleteGroup}>
          🗑 Delete Group
        </button>
      </div>
      <div className={clsx([globalStyles.column, globalStyles.gap20])}>
        {filterGroup.filters.map((filter, i) => (
          <div key={i} className={clsx([globalStyles.mb10])}>
            {'logic' in filter ? (
              <FilterBuilder
                filterOptions={filterOptions}
                filterGroup={filter}
                onChange={(updated) => updateFilterAt(i, updated)}
                depth={depth + 1}
                maxDepth={maxDepth}
                isRoot={false}
              />
            ) : (
              <FilterCondition
                filterOptions={filterOptions}
                key={i}
                condition={filter}
                onChange={(f) => updateFilterAt(i, f)}
                removeFilter={() => removeFilterAt(i)}
              />
            )}
          </div>
        ))}
      </div>

      <div className={globalStyles.gap10}>
        <button onClick={addCondition}>+ Add Condition</button>
        {depth < maxDepth && <button onClick={addGroup}>+ Add Group</button>}
      </div>
    </div>
  );
};

export default FilterBuilder;
