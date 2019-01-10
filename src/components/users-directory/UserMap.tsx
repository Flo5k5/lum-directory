import 'leaflet/dist/leaflet';
import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const ZOOM: number = 13;

interface IUserMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export default class UserMap extends React.Component<IUserMapProps, {}> {
  public render(): JSX.Element {
    const position: [number, number] = [
      this.props.latitude,
      this.props.longitude,
    ];
    return (
      <Map center={position} zoom={ZOOM}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>{this.props.address}</Popup>
        </Marker>
      </Map>
    );
  }
}
