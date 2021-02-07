import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import {
  activeListing,
  EHoverTarget,
  useGetMapCenterQuery,
} from '@pricelabs/graphql';

import styles from './map-view.module.scss';
import { ScriptLoaded } from '@pricelabs/components/script-loaded/script-loaded';
import { useSearchResults } from '@pricelabs/components/hooks';
import Loading from '../loading/loading';
import { useReactiveVar } from '@apollo/client';

/* eslint-disable-next-line */
export interface MapViewProps {
  className?: string;
}

const calculateBathroomCount = (listing) => {
  if (!listing?.bathroom) {
    return 0;
  }
  const { full, half, toiletOnly } = listing?.bathroom;
  return full + half + toiletOnly;
};

const MarkerWithInfo = ({ listing }) => {
  const activeEl = useReactiveVar(activeListing);
  let info = null;
  if (
    activeEl.listingId === listing.listingId &&
    activeEl.hoverTarget !== EHoverTarget.NONE
  ) {
    info = (
      <InfoWindow
        position={{
          lat: listing.geoCode.latitude,
          lng: listing.geoCode.longitude,
        }}
      >
        <div className={styles.infoView}>
          <div className="pr-2">
            <div
              style={{ backgroundImage: `url(${listing.images[0].c9_uri})` }}
              className={styles.image}
            >
              &nbsp;
            </div>
          </div>
          <div className="pl-2">
            <h6>{listing.headline}</h6>
            <div className={styles.extra}>
              <span>{listing.bedrooms} br</span>
              <span>{calculateBathroomCount(listing.bathrooms)} ba</span>
              <span>Sleeps {listing.sleeps}</span>
            </div>
          </div>
        </div>
      </InfoWindow>
    );
  }

  return (
    <Marker
      position={{
        lat: listing.geoCode.latitude,
        lng: listing.geoCode.longitude,
      }}
      onClick={() =>
        activeListing({
          listingId: listing.listingId,
          hoverTarget: EHoverTarget.ON_MAP,
        })
      }
    >
      {info}
    </Marker>
  );
};

export const MapView: React.FC<MapViewProps> = (props: MapViewProps) => {
  const { loading, searchData } = useSearchResults();
  const { data } = useGetMapCenterQuery();

  return (
    <ScriptLoaded>
      <GoogleMap
        mapContainerClassName={props.className}
        zoom={7}
        options={{
          disableDefaultUI: true,
        }}
        center={data?.mapCenter}
      >
        {searchData?.results?.listings.map((l) => (
          <MarkerWithInfo key={l.listingId} listing={l} />
        ))}
      </GoogleMap>
    </ScriptLoaded>
  );
};

export default MapView;
