import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ ubicacion, zoom }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBJMwJ_1KdlLq9nRW6_mb8_42GPjdZlw-8',
        libraries: ['places']
    });

    const [map, setMap] = useState(null);
    const [placesService, setPlacesService] = useState(null);

    const [barrios, setBarrios] = useState({
        belgrano: { lat: -34.5621, lng: -58.4567 },
        almagro: { lat: -34.6037, lng: -58.4208 },
        balvanera: { lat: -34.6091, lng: -58.4059 },
        once: { lat: -34.6049, lng: -58.4051 },
        parquePatricios: { lat: -34.6374, lng: -58.4002 },
        barracas: { lat: -34.6496, lng: -58.3869 },
        caballito: { lat: -34.6209, lng: -58.4429 },
        villaCrespo: { lat: -34.5984, lng: -58.4465 },
        constitucion: { lat: -34.6209, lng: -58.3861 },
        abasto: { lat: -34.6037, lng: -58.4208 },
        recoleta: { lat: -34.5895, lng: -58.3974 },
        microcentro: { lat: -34.6037, lng: -58.3816 },
        montserrat: { lat: -34.6158, lng: -58.3829 },
        sanNicolas: { lat: -34.6037, lng: -58.3804 }
    });



    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    useEffect(() => {
        if (isLoaded && !loadError && map) {
            const placesService = new google.maps.places.PlacesService(map);

            const clearMarkers = () => {
                if (map && map.markers) {
                    map.markers.forEach(marker => {
                        marker.setMap(null);
                    });
                    map.markers = [];
                }
            };

            placesService.nearbySearch(
                {
                    location: barrios[ubicacion],
                    radius: 150,
                    type: 'hair_care'
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        clearMarkers();
                        console.log('Estos son los results', results[0].name)
                        results.forEach(result => {
                            const marker = new google.maps.Marker({
                                position: result.geometry.location,
                                map: map,
                                label: {
                                    text: result.name,
                                    color: 'black',
                                    fontSize: '8px',
                                    fontWeight: 'bold'
                                }
                            });
                            if (!map.markers) map.markers = [];
                            map.markers.push(marker);
                        });
                    }
                }
            );
        }
    }, [barrios, isLoaded, loadError, map, ubicacion]);

    const handleLoad = loadedMap => {
        setMap(loadedMap);
        loadedMap.markers = []; // Inicializar un array para almacenar los marcadores en la instancia del mapa
    };



    if (loadError) {
        return <div>Error al cargar el mapa</div>;
    }

    console.log('Esto es map', map)

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={barrios[ubicacion]}
                    zoom={16}
                    onLoad={handleLoad}
                >
                    <Marker position={barrios[ubicacion]} />
                </GoogleMap>
            )}
        </div>
    );
};

export default Map;
