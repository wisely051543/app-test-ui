import { useEffect } from 'react'
import Leaflet from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete Leaflet.Icon.Default.prototype._getIconUrl

const { MapContainer } = ReactLeaflet

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

const DynamicMap = ({ children, className, width, height, ...rest }) => {
  useEffect(() => {
    ;(async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
      })
    })()
  }, [])

  if (typeof window === 'undefined') {
    return <p />
  }

  return (
    <MapContainer {...rest} style={{ width: '100%', height: '100%' }}>
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

const Map = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} />
    </div>
  )
}

const IMap = ({ lat, lng }) => {
  const tileLayerUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  return (
    <Map width="800" height="400" center={[lat, lng]} zoom={16}>
      {({ TileLayer, Marker, Popup }) => (
        <>
          <TileLayer
            url={tileLayerUrl}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]} />
        </>
      )}
    </Map>
  )
}

export default IMap
