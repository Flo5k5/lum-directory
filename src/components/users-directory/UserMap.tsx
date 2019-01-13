import * as L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import { Map, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { ILocation } from 'src/interfaces/ILocation';
import styled from 'src/themes/StyledComponents';

/** Fix for data url broken by webpack in leaflet's css.
 * Credits: https://stackoverflow.com/a/51222271
 */
const DefaultIcon: L.Icon<L.IconOptions> = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

/** Zoom level of the map */
const ZOOM: number = 3;

/** Styled component that handle the size of the map. */
const StyledMap: any = styled(Map)`
  width: 100%;
  height: 100%;
  min-width: 150px;
  min-height: 150px;
  margin: 0;
`;

/**
 * Represents the properties object of the UserMap component.
 *
 * @interface IUserMapProps
 */
interface IUserMapProps {
  location: ILocation;
}

/**
 * Renders a map using Leaflet.
 *
 * @export
 * @class UserMap
 * @extends {React.Component<IUserMapProps, {}>}
 */
export const UserMap: React.SFC<IUserMapProps> = (
  props: IUserMapProps
): JSX.Element => {
  const location: ILocation = props.location;
  const position: [number, number] = [
    +location.coordinates.latitude,
    +location.coordinates.longitude,
  ];
  return (
    <StyledMap center={position} zoom={ZOOM}>
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      />
      <Marker position={position}>
        <Tooltip direction={'auto'} permanent={true}>
          {location.street} {location.postcode} <br />
          {location.city}, {location.state}
        </Tooltip>
      </Marker>
    </StyledMap>
  );
};
