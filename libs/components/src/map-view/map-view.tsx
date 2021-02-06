import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useGetMapCenterQuery } from '@pricelabs/graphql';

import './map-view.module.scss';
import { ScriptLoaded } from '@pricelabs/components/script-loaded/script-loaded';
import { useSearchResults } from '@pricelabs/components/hooks';
import Loading from '../loading/loading';

/* eslint-disable-next-line */
export interface MapViewProps {
  className?: string;
}

export const MapView: React.FC<MapViewProps> = (props: MapViewProps) => {
  const { loading, searchData } = useSearchResults();
  const { data } = useGetMapCenterQuery();
  return (
    <ScriptLoaded>
      <GoogleMap
        mapContainerClassName={props.className}
        zoom={7}
        center={data?.mapCenter}
      >
        <Loading />
      </GoogleMap>
    </ScriptLoaded>
  );
};

export default MapView;
