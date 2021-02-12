import { useReactiveVar } from '@apollo/client';
import {
  activeListing,
  EHoverTarget,
  useGetActiveListingQuery,
} from '@pricelabs/graphql';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Button, Image } from 'react-bootstrap';

import styles from './search-item.module.scss';

/* eslint-disable-next-line */
export interface SearchItemProps {
  listingId: string;
  imgUrl: string;
  matchPerc: number;
  itemTitle: string;
  bedrooms: number;
  bathrooms: number;
  occupancy: number;
  reviewCount: number;
  rating: number;
}

const ReviewItem: React.FC<{ count: number; rating: number }> = ({
  count,
  rating,
}) => {
  return (
    <div className="d-flex align-items-center">
      {/* @ts-ignore */}
      <div className="stars" style={{ '--rating': rating }}></div>
      <span>({count})</span>
    </div>
  );
};

export const SearchItem: React.FC<SearchItemProps> = ({
  matchPerc,
  itemTitle,
  imgUrl,
  bedrooms,
  bathrooms,
  occupancy,
  reviewCount,
  rating,
  listingId,
}) => {
  const ref = useRef(null);
  const activeEl = useReactiveVar(activeListing);
  const isActive = activeEl.listingId === listingId;

  if (ref && isActive && activeEl.hoverTarget !== EHoverTarget.ON_ITEM) {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div
      ref={ref}
      className={clsx(
        styles.container,
        {
          [styles.active]: isActive,
        },
        'mx-2 p-2'
      )}
      onMouseOver={() => {
        activeListing({
          listingId,
          hoverTarget: EHoverTarget.ON_ITEM,
        });
      }}
    >
      <input type="checkbox" />
      <div className="p-2">
        <div
          style={{ backgroundImage: `url(${imgUrl})` }}
          className={styles.image}
        >
          &nbsp;
        </div>
      </div>

      <div className={clsx(styles.details, 'pl-2')}>
        <div
          className={clsx(styles.matchPerc, {
            [styles.green]: matchPerc >= 70,
            [styles.yellow]: matchPerc < 70,
          })}
        >
          {matchPerc}% Match
        </div>
        <div className={styles.title}>{itemTitle}</div>
        <div className={styles.extra}>
          <span>{bedrooms} br</span>
          <span>{bathrooms} ba</span>
          <span>Sleeps {occupancy}</span>
        </div>
        <div className={styles.reviewContainer}>
          <ReviewItem count={reviewCount} rating={rating} />
          <Button
            variant="link"
            onClick={() => {
              console.log('remove this listing');
            }}
            size="sm"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
