import { Priority, Status } from '@src/components/SalesCRMTable/type';
import StatusItem from '@src/components/StatusItem';
import styles from './styles.module.css';
import globalStyles from '@src/index.module.css';
import { isEnumValue } from '@src/utils';
import PriorityItem from '@src/components/PriorityItem';

type Props<T> = {
  value: T | T[];
};

export default function Cell<T>(props: Props<T>) {
  const values = Array.isArray(props.value) ? props.value : [props.value];
  return (
    <div className={styles.container}>
      {values.map((value, index) => {
        if (typeof value === 'boolean') {
          return (
            <input
              key={index}
              type="checkbox"
              checked={value}
              readOnly
              className={globalStyles.selfCenter}
            />
          );
        }

        // Check if value is a Status enum
        if (isEnumValue(Status, value)) {
          return <StatusItem value={value} key={index} />;
        }

        // Check if value is a Priority enum
        if (isEnumValue(Priority, value)) {
          return <PriorityItem value={value} key={index} />;
        }

        if (typeof value === 'string' || typeof value === 'number') {
          return <span key={index}>{value}</span>;
        }
        return '';
      })}
    </div>
  );
}
