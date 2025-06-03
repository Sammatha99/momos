import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

type LoadingSpinnerProps = {
  className?: string;
};

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <div className={clsx([styles.spinner, className])} />;
}
