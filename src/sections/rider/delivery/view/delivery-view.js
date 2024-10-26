"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import CommonBlock from "@/components/styles/ryder.style";
import useMapLoader from "@/hooks/useMapLoader";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD } from "@/routes/paths";
import useGeoLocation from "@/hooks/useGeoLocation";
import DeliveryMap from "../DeliveryMap";

const DeliveryView = () => {
    // ** States
    const [isRideCompleted, setIsRideCompleted] = useState(false);
    const [destinationLocation, setDestinationLocation] = useState({
        lat: 21.2562416,
        lng: 69.9596417,
    });
    const [riderAddress, setRiderAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    // ** Hooks
    const { isLoaded, error } = useMapLoader();
    const { push } = useRouter();
    const latRef = useRef();
    const lngRef = useRef();

    const {
        location: { coordinates, loaded },
        error: locationPermissionError,
        requestLocation,
        permissionStatus,
    } = useGeoLocation();

    const isMapConfigLoading = useMemo(
        () => !isLoaded || !loaded,
        [isLoaded, loaded],
    );

    // ** Handlers
    const onRideCompleted = useCallback(() => setIsRideCompleted(true), []);

    const onSetLatLng = () => {
        if (latRef.current?.value && lngRef.current?.value) {
            setDestinationLocation({
                lat: Number(latRef.current.value),
                lng: Number(lngRef.current.value),
            });
        }
    };

    if (error)
        return (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );

    if (locationPermissionError)
        return (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                <p className="text-red-500 font-medium">
                    {locationPermissionError}
                </p>
                {permissionStatus === "denied" && (
                    <div className="btn-target">
                        <button
                            onClick={requestLocation}
                            className="px-4 py-2 mt-4"
                        >
                            REQUEST LOCATION
                        </button>
                    </div>
                )}
            </div>
        );

    if (isMapConfigLoading) return <Loader />;

    return (
        <CommonBlock>
            <div className="map-block-location">
                {isRideCompleted ? (
                    <div>Ride Completed</div>
                ) : (
                    coordinates?.lat &&
                    coordinates?.lng && (
                        <div className="map-block-location-map">
                            <DeliveryMap
                                riderLocation={coordinates}
                                destinationLocation={destinationLocation}
                                onRideCompleted={onRideCompleted}
                                setRiderAddress={setRiderAddress}
                                setDestinationAddress={setDestinationAddress}
                                riderAddress={riderAddress}
                                destinationAddress={destinationAddress}
                            />
                        </div>
                    )
                )}
                <div className="map-block-location-bottom">
                
                    <input
                        name="lat"
                        placeholder="Latitude"
                        className="border-lg p-2 m-1"
                        ref={latRef}
                    />
                    <input
                        name="lng"
                        placeholder="Longitude"
                        className="border-lg p-2 m-1"
                        ref={lngRef}
                    />
                    <button
                        className="bg-amber-300 ml-2 border-amber-600"
                        onClick={onSetLatLng}
                    >
                        SET LATLONG
                    </button>
                    <div className="bottom-bar-target-top">
                        <p>Bestellung: abc123</p>
                        <div className="bottom-bar-block">
                            <img src="/map-pin.svg" alt="map-logo" />
                            <h4>{destinationAddress}</h4>
                        </div>
                    </div>
                    <div className="bottom-bar-target">
                        <div
                            className="error-block"
                            onClick={() => push(PATH_DASHBOARD.rider.errors)}
                        >
                            <img src="/error-img.png" alt="error-logo" />
                            <span>Error</span>
                        </div>
                        <div className="btn-target">
                            <button disabled={!isRideCompleted}>
                                Abschließen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default DeliveryView;
