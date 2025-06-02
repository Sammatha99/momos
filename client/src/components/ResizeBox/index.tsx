import React from 'react';
import styles from './styles.module.css';

type Props = {
  onMouse: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => void;
};

const ResizeBox = (props: Props) => {
  const { onMouse } = props;
  return (
    <div
      onMouseDown={onMouse}
      onTouchStart={onMouse}
      className={styles.container}
    />
  );
};

export default ResizeBox;
