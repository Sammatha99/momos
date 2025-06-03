import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import globalStyles from "@src/index.module.css";
import { FilterGroup, FilterOption } from "./types";
import { initFilter } from "../SalesCRMTable/type";
import clsx from "clsx";
import FilterBuilder from "./components/FilterBuilder";

interface ModalProps<T> {
  isOpen: boolean;
  filterGroup: FilterGroup;
  FilterOptions: FilterOption<T>[];
  onClose: () => void;
  onSave: (filters: FilterGroup) => void;
}

const Filter = <T,>({
  isOpen,
  filterGroup,
  FilterOptions,
  onClose,
  onSave
}: ModalProps<T>) => {
  const [tempFilters, setTempFilters] =
    React.useState<FilterGroup>(filterGroup);

  React.useEffect(() => {
    setTempFilters(filterGroup);
  }, [filterGroup, isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onChange = (newFilterGroup?: FilterGroup) => {
    if (newFilterGroup) {
      setTempFilters(newFilterGroup);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={styles.closeButton}
        >
          &times;
        </button>
        <FilterBuilder
          filterOptions={FilterOptions}
          filterGroup={tempFilters}
          onChange={onChange}
          depth={1}
          maxDepth={2}
        />
        <div className={clsx([globalStyles.mt20, globalStyles.gap10])}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onSave(tempFilters)}>Apply Filters</button>
          <button onClick={() => onSave(initFilter)}>Clear Filters</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
