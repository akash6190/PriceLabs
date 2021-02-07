import {
  currentPage,
  useGetCurrentPageQuery,
  useSearchQueryLazyQuery,
} from '@pricelabs/graphql';
import React, { useState } from 'react';
import { useSearchResults } from '../hooks';
import Loading from '@pricelabs/components/loading/loading';

import styles from './search-results.module.scss';
import clsx from 'clsx';
import { propTypes } from 'react-bootstrap/esm/Image';
import SearchItem from '../search-item/search-item';
import { Button } from 'react-bootstrap';

interface TabHeaderProps {
  text: string;
  count: number;
  active: boolean;
  onClick: () => void;
}
const TabHeader: React.FC<TabHeaderProps> = (props) => {
  return (
    <div
      className={clsx({ [styles.active]: props.active })}
      onClick={props.onClick}
    >
      {props.text} ({props.count})
    </div>
  );
};

const calculateBathroomCount = (listing) => {
  if (!listing.bathrooms) {
    return 0;
  }
  const { full, half, toiletOnly } = listing?.bathrooms;
  return full + half + toiletOnly;
};

/* eslint-disable-next-line */
export interface SearchResultsProps {
  className: string;
}

export const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => {
  const { data: pageData } = useGetCurrentPageQuery();
  const { loading, searchData } = useSearchResults();
  const [currentTab, setCurrentTab] = useState(0);
  if (loading) {
    return <Loading />;
  }

  console.log(searchData);

  return (
    <div className={clsx(styles.container, props.className)}>
      <div className={clsx(styles.tabsContainer, 'px-2')}>
        <TabHeader
          active={currentTab === 0}
          onClick={() => setCurrentTab(0)}
          text="Comp Set"
          count={50}
        />
        <TabHeader
          active={currentTab === 1}
          onClick={() => setCurrentTab(1)}
          text="Other Properties"
          count={50}
        />
        <TabHeader
          active={currentTab === 2}
          onClick={() => setCurrentTab(2)}
          text="Hotels"
          count={50}
        />
      </div>
      {/* <div>
        <label>
          <input name="select-all" type="checkbox" />
          Select all properties
        </label>
      </div> */}
      <div className={styles.results}>
        {/* @ts-ignore */}
        {searchData?.results?.listings.map((l) => (
          <SearchItem
            key={l.listingId}
            listingId={l.listingId}
            bedrooms={l.bedrooms}
            bathrooms={calculateBathroomCount(l)}
            occupancy={l.sleeps}
            imgUrl={l.images[0].c9_uri}
            itemTitle={l.headline}
            matchPerc={70}
            rating={l.averageRating}
            reviewCount={l.reviewCount}
          />
        ))}
      </div>
      <div className="d-flex">
        <div>
          {/* @ts-ignore */}
          Viewing {searchData?.results?.fromRecord} -{/* @ts-ignore */}
          {searchData?.results?.toRecord} of {searchData?.results?.resultCount}{' '}
          properties
        </div>
        <div className="d-flex align-items-center">
          {/* Needto change this to us icons if timepersist */}
          <Button
            variant="link"
            onClick={() => {
              currentPage(
                /* @ts-ignore */
                (pageData?.currentPage - 1) % searchData?.results?.pageCount
              );
            }}
          >
            &lt;{' '}
          </Button>
          <input
            min={0}
            /* @ts-ignore */
            max={searchData?.results?.pageCount}
            step={1}
            type="number"
            value={pageData?.currentPage}
            onChange={(e) => {
              currentPage(
                /* @ts-ignore */
                e.currentTarget.value % searchData?.results?.pageCount
              );
            }}
          />
          {/* @ts-ignore */}
          {'/' + searchData?.results?.pageCount}
          <Button
            onClick={() => {
              currentPage(
                /* @ts-ignore */
                (pageData?.currentPage + 1) % searchData?.results?.pageCount
              );
            }}
            variant="link"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
