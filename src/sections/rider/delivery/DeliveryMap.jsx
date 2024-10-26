"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    InfoWindow,
    Polyline,
} from "@react-google-maps/api";

// ** Map Styles

const containerStyle = {
    height: "100vh",
    width: "100%",
};

const styles = [
    {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

const DISTANCE_THRESHOLD = 0.01,
    ARRIVAL_THRESHOLD = 0.0001;

const offRoadToLocationStyles = {
    strokeColor: "#ECB549",
    strokeOpacity: 1,
    strokeWeight: 2,
    icons: [
        {
            icon: {
                path: window?.google?.maps?.SymbolPath?.CIRCLE || 2.0,
            },
            offset: "0",
            repeat: "10px",
        },
    ],
};

const calculateDistance = (point1, point2) => {
    const dx = point1.lat - point2.lat;
    const dy = point1.lng - point2.lng;
    return Math.sqrt(dx * dx + dy * dy);
};

const DeliveryMap = ({
    riderLocation,
    destinationLocation,
    onRideCompleted,
    setRiderAddress,
    setDestinationAddress,
    destinationAddress,
    riderAddress,
}) => {
    // ** States
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [nearestRoadSource, setNearestRoadSource] = useState(null);
    const [nearestRoadDestination, setNearestRoadDestination] = useState(null);

    // ** Hooks
    const mapRef = useRef(null);
    const riderIcon = useMemo(
        () => ({
            url: "/rider-map-icon.svg",
            scaledSize: new window.google.maps.Size(50, 50),
        }),
        [],
    );

    const destinationIcon = useMemo(
        () => ({
            url: "/destination-map-icon.svg",
            scaledSize: new window.google.maps.Size(50, 50),
        }),
        [],
    );

    const isStartOffRoadVisible = useMemo(() => {
        if (nearestRoadSource && riderLocation)
            return (
                calculateDistance(nearestRoadSource, riderLocation) >
                DISTANCE_THRESHOLD
            );

        return false;
    }, [nearestRoadSource, riderLocation]);

    const isEndOffRoadVisible = useMemo(() => {
        if (nearestRoadDestination && destinationLocation)
            return (
                calculateDistance(nearestRoadDestination, destinationLocation) >
                DISTANCE_THRESHOLD
            );

        return false;
    }, [nearestRoadDestination, destinationLocation]);

    // ** Effects
    useEffect(() => {
        if (
            riderLocation?.lat &&
            riderLocation?.lng &&
            destinationLocation?.lat &&
            destinationLocation?.lng
        ) {
            const directionsService =
                new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: riderLocation,
                    destination: destinationLocation,
                    optimizeWaypoints: true,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                        if (result?.routes?.at(0)?.legs?.at(0)?.start_address) {
                            setRiderAddress(
                                result?.routes?.at(0)?.legs?.at(0)
                                    ?.start_address,
                            );
                            setDestinationAddress(
                                result?.routes?.at(0)?.legs?.at(0)?.end_address,
                            );
                        }
                        const firstStep = result.routes[0].legs[0].steps[0];
                        const lastStep =
                            result.routes[0].legs[0].steps.slice(-1)[0];
                        setNearestRoadSource({
                            lat: firstStep.start_location.lat(),
                            lng: firstStep.start_location.lng(),
                        });
                        setNearestRoadDestination({
                            lat: lastStep.end_location.lat(),
                            lng: lastStep.end_location.lng(),
                        });
                    } else {
                        setDirectionsResponse(null);
                        setRiderAddress("");
                        setDestinationAddress("");
                        setNearestRoadSource(null);
                        setNearestRoadDestination(null);
                        console.error(`Error fetching directions: ${status}`);
                    }
                },
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [riderLocation, destinationLocation]);

    useEffect(() => {
        if (directionsResponse && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            directionsResponse.routes[0].legs[0].steps.forEach((step) => {
                bounds.extend(step.start_location);
                bounds.extend(step.end_location);
            });
            mapRef.current.fitBounds(bounds);
        }
    }, [directionsResponse]);

    useEffect(() => {
        if (directionsResponse) {
            const checkArrival = () => {
                const distanceToDestination = calculateDistance(
                    riderLocation,
                    destinationLocation,
                );

                if (distanceToDestination <= ARRIVAL_THRESHOLD) {
                    onRideCompleted();
                }
            };
            checkArrival();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [riderLocation, directionsResponse, destinationLocation]);

    // ** Handlers
    const onLoad = (map) => (mapRef.current = map);

    // ** Renders
    const renderSourceOffRoad = useMemo(() => {
        return (
            nearestRoadSource &&
            isStartOffRoadVisible && (
                <Polyline
                    path={[nearestRoadSource, riderLocation]}
                    options={{
                        ...offRoadToLocationStyles,
                        icons: [
                            {
                                icon: {
                                    path: window?.google?.maps?.SymbolPath
                                        ?.CIRCLE,
                                },
                                offset: "0",
                                repeat: "10px",
                            },
                        ],
                    }}
                />
            )
        );
    }, [isStartOffRoadVisible, riderLocation, nearestRoadSource]);

    const renderDestinationOffRoad = useMemo(() => {
        return (
            nearestRoadDestination &&
            isEndOffRoadVisible && (
                <Polyline
                    path={[nearestRoadDestination, destinationLocation]}
                    options={{
                        ...offRoadToLocationStyles,
                        icons: [
                            {
                                icon: {
                                    path: window?.google?.maps?.SymbolPath
                                        ?.CIRCLE,
                                },
                                offset: "0",
                                repeat: "10px",
                            },
                        ],
                    }}
                />
            )
        );
    }, [destinationLocation, isEndOffRoadVisible, nearestRoadDestination]);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={riderLocation}
            options={{
                styles,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                colorScheme: "DARK",
            }}
            ref={mapRef}
            onLoad={onLoad}
        >
            {/* Marker for Rider */}
            <Marker
                position={riderLocation}
                icon={riderIcon}
                onClick={() => setActiveMarker("source")}
            />

            {/* Marker for Destination */}
            <Marker
                position={destinationLocation}
                icon={destinationIcon}
                onClick={() => setActiveMarker("destination")}
            />

            {/* Render the Directions on the Map */}
            {directionsResponse && (
                <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                        polylineOptions: {
                            strokeColor: "#ECB549",
                            strokeOpacity: 1,
                            strokeWeight: 6,
                        },
                        suppressMarkers: true,
                    }}
                />
            )}
            {activeMarker === "source" && (
                <InfoWindow
                    position={riderLocation}
                    options={{
                        disableAutoPan: true,
                        headerDisabled: true,
                    }}
                >
                    <div className="rider-location-tooltip-block">
                        <div className="icon-cy">
                            <img src="/cycle-icon.svg" alt="cycle-icon" />
                        </div>
                        <div className="rider-location-text">
                            <p>{riderAddress}</p>
                            <img src="/chevrondown-1@2x.png" alt="arrow-icon" />
                        </div>
                    </div>
                </InfoWindow>
            )}
            {activeMarker === "destination" && (
                <InfoWindow
                    position={destinationLocation}
                    options={{
                        disableAutoPan: true,
                        headerDisabled: true,
                    }}
                >
                    <div className="rider-location-tooltip-block">
                        <div className="rider-location-text">
                            <p>{destinationAddress}</p>
                            <img src="/chevrondown-1@2x.png" alt="arrow-icon" />
                        </div>
                    </div>
                </InfoWindow>
            )}

            {/* {renderSourceOffRoad}
            {renderDestinationOffRoad} */}
        </GoogleMap>
    );
};

export default DeliveryMap;
