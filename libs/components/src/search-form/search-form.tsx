import { Autocomplete } from '@react-google-maps/api';
import React, { useCallback } from 'react';
import { ScriptLoaded } from '@pricelabs/components/script-loaded/script-loaded';

import styles from './search-form.module.scss';
import { useSearchResults } from '../hooks';
import {
  currentPage,
  mapCenter,
  queryString,
  showFilters,
} from '@pricelabs/graphql';
import { Button } from 'react-bootstrap';
import clsx from 'clsx';

// TODO:: Currently only reading the alphanumeric words
const getQueryFromAddress = (addr: string) => {
  return addr
    .match(/[A-Za-z0-9]\w+/g)
    .map((a) => a.toLocaleLowerCase())
    .join('-');
};

/* eslint-disable-next-line */
export interface SearchFormProps {}

export function SearchForm(props: SearchFormProps) {
  let autocomplete;
  const onLoad = useCallback((ac) => {
    autocomplete = ac;
  }, []);

  const onPlaceChanged = useCallback(() => {
    const place = autocomplete.getPlace();
    // set Query string
    currentPage(1);
    queryString(getQueryFromAddress(place.formatted_address));
    // set new mapCenter
    mapCenter({
      lat: place?.geometry?.location?.lat(),
      lng: place?.geometry?.location?.lng(),
    });
  }, []);

  return (
    <div className={clsx(styles.container, 'p-2')}>
      <ScriptLoaded>
        <Autocomplete
          className={clsx(styles.autoCompleteInput, 'pr-2')}
          onLoad={onLoad}
          fields={['geometry', 'formatted_address', 'address_component']}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            className={styles.inputElem}
          />
        </Autocomplete>
      </ScriptLoaded>
      <Button className={styles.button} onClick={() => showFilters(true)}>
        Filters
      </Button>
    </div>
  );
}

export default SearchForm;
