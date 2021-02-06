import { Autocomplete } from '@react-google-maps/api';
import React, { useCallback } from 'react';
import { ScriptLoaded } from '@pricelabs/components/script-loaded/script-loaded';

import styles from './search-form.module.scss';
import { useSearchResults } from '../hooks';
import { mapCenter } from '@pricelabs/graphql';

/* eslint-disable-next-line */
export interface SearchFormProps {}

export function SearchForm(props: SearchFormProps) {
  let autocomplete;
  const onLoad = useCallback((ac) => {
    autocomplete = ac;
  }, []);

  const onPlaceChanged = useCallback(() => {
    const place = autocomplete.getPlace();
    // set new mapCenter
    mapCenter({
      lat: place?.geometry?.location?.lat(),
      lng: place?.geometry?.location?.lng(),
    });
  }, []);

  return (
    <ScriptLoaded>
      <Autocomplete
        onLoad={onLoad}
        fields={['geometry']}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          className={styles.inputElem}
        />
      </Autocomplete>
    </ScriptLoaded>
  );
}

export default SearchForm;
