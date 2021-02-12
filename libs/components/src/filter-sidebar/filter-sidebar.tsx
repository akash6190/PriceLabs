import {
  currentFilters,
  showFilters,
  useGetCurrentFiltersQuery,
} from '@pricelabs/graphql';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import styles from './filter-sidebar.module.scss';

/* eslint-disable-next-line */
export interface FilterSidebarProps {}

const FilterSection: React.FC<{ heading: string }> = ({
  heading,
  children,
}) => {
  return (
    <section className="p-3">
      <div className={clsx(styles.title, 'pb-3')}>{heading}</div>
      <div className={styles.filtersBody}>{children}</div>
    </section>
  );
};

const MinMaxRow: React.FC<{
  heading: string;
  value: number;
  onChange: (number) => void;
  minValue?: number;
  maxValue?: number;
}> = ({
  heading,
  value,
  onChange,
  minValue = 0,
  maxValue = Number.POSITIVE_INFINITY,
}) => {
  return (
    <div className={clsx(styles.minMaxRow, 'py-1')}>
      <div className={styles.mmValue}>{value}</div>
      <div className={styles.mmHeading}>{heading}</div>
      <div className={styles.mmActions}>
        <Button
          variant="outline-primary"
          onClick={() => {
            onChange(value - 1);
          }}
          disabled={value <= minValue}
          className={clsx(styles.zeroSize, 'mr-3')}
        >
          -
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            onChange(value + 1);
          }}
          className={styles.zeroSize}
          disabled={value >= maxValue}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const RatingRow = ({ rating }) => (
  <label className="d-flex m-0 align-items-center">
    <input type="checkbox" name="propertyReview" />
    {/* @ts-ignore */}
    <div className="stars px-2" style={{ '--rating': rating }}></div>
    <div>{rating}+ stars</div>
  </label>
);

export function FilterSidebar(props: FilterSidebarProps) {
  const { data: filterData } = useGetCurrentFiltersQuery();
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [maxBedrooms, setMaxBedrooms] = useState<number>(0);
  const [minBathrooms, setMinBathrooms] = useState<number>(0);
  const [maxBathrooms, setMaxBathrooms] = useState<number>(0);
  const [minSleeps, setMinSleeps] = useState<number>(0);
  const [maxSleeps, setMaxSleeps] = useState<number>(0);

  useEffect(() => {
    setMinBedrooms(filterData?.currentFilters?.minBedrooms ?? 0);
    setMaxBedrooms(
      filterData?.currentFilters?.maxBedrooms ??
        filterData?.currentFilters?.minBedrooms ??
        0
    );
    setMinBathrooms(filterData?.currentFilters?.minBathrooms ?? 0);
    setMaxBathrooms(
      filterData?.currentFilters?.maxBathrooms ??
        filterData?.currentFilters?.minBathrooms ??
        0
    );
    setMinSleeps(filterData?.currentFilters?.minSleeps ?? 0);
    setMaxSleeps(
      filterData?.currentFilters?.maxSleeps ??
        filterData?.currentFilters?.minSleeps ??
        0
    );
  }, [filterData]);

  const onApplyFilters = () => {
    currentFilters({
      maxBathrooms,
      minBathrooms,
      maxBedrooms,
      minBedrooms,
      minSleeps,
      maxSleeps,
    });
    showFilters(false);
  };

  const onResetFilters = () => {
    currentFilters(null);
  };

  return (
    <div className={clsx(styles.container, 'p-2')}>
      <Button
        variant="link-secondary"
        className={styles.close}
        onClick={() => {
          showFilters(false);
        }}
      >
        &times;
      </Button>
      <div className={styles.sections}>
        <FilterSection heading="Bedrooms">
          <MinMaxRow
            heading="Min Bedrooms"
            value={minBedrooms}
            maxValue={maxBedrooms}
            onChange={setMinBedrooms}
          />
          <MinMaxRow
            heading="Max Bedrooms"
            value={maxBedrooms}
            minValue={minBedrooms}
            onChange={setMaxBedrooms}
          />
        </FilterSection>
        <FilterSection heading="Bathrooms">
          <MinMaxRow
            heading="Min Bathrooms"
            value={minBathrooms}
            maxValue={maxBathrooms}
            onChange={setMinBathrooms}
          />
          <MinMaxRow
            heading="Max Bathrooms"
            minValue={minBathrooms}
            value={maxBathrooms}
            onChange={setMaxBathrooms}
          />
        </FilterSection>
        <FilterSection heading="Sleeps">
          <MinMaxRow
            heading="Min Sleeps"
            value={minSleeps}
            maxValue={maxSleeps}
            onChange={setMinSleeps}
          />
          <MinMaxRow
            heading="Max Sleeps"
            value={maxSleeps}
            minValue={minSleeps}
            onChange={setMaxSleeps}
          />
        </FilterSection>
        <FilterSection heading="Property Review">
          <RatingRow rating={5} />
          <RatingRow rating={4} />
          <RatingRow rating={0} />
        </FilterSection>
      </div>
      <div className={clsx('p-2', styles.filterActions)}>
        <Button
          onClick={onResetFilters}
          variant="outline-primary"
          className="mr-3"
        >
          Reset
        </Button>
        <Button variant="primary" onClick={onApplyFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
}

export default FilterSidebar;
