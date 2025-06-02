import { Priority } from '@src/components/SalesCRMTable/type';
import React from 'react';
import styles from './styles.module.css';
import globalStyles from '@src/index.module.css';
import clsx from 'clsx';

const PriorityItem = ({ value }: { value: Priority }) => {
  return (
    <span className={clsx([globalStyles.optionSelect, styles[value]])}>
      {value}
    </span>
  );
};

export default PriorityItem;
