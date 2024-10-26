import { useState, useEffect, useCallback } from "react";

const useGeoLocation = () => {
    // ** States
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });
    const [error, setError] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState("");

    // ** Constants
    const geoOptions = {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 30000,
    };

    // ** Handlers
    const hasLocationChanged = (newPosition, oldPosition) => {
        const latDiff = Math.abs(newPosition.lat - oldPosition.lat);
        const lngDiff = Math.abs(newPosition.lng - oldPosition.lng);
        return latDiff > 0.0001 || lngDiff > 0.0001;
    };

    const onSuccess = useCallback(
        (position) => {
            const newCoordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            if (
                !location.loaded ||
                hasLocationChanged(newCoordinates, location.coordinates)
            ) {
                setLocation({
                    loaded: true,
                    coordinates: newCoordinates,
                });
                setError(null);
            }
        },
        [location],
    );

    const onError = useCallback((error) => {
        setError(error.message);
        if (error.code === 1) {
            setPermissionStatus("denied");
            setError("Please allow location permission");
        }
        setLocation({
            loaded: true,
            coordinates: { lat: "", lng: "" },
        });
    }, []);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser");
            setLocation({
                loaded: true,
                coordinates: { lat: "", lng: "" },
            });
            return;
        }
        let watchId = "";

        navigator.permissions
            .query({ name: "geolocation" })
            .then((res) => {
                setPermissionStatus(res.state);
                if (res.state === "denied") {
                    setError(
                        "Unable to retrieve your location. Please allow location permission",
                    );
                    setLocation({
                        loaded: true,
                        coordinates: { lat: "", lng: "" },
                    });
                }

                if (["prompt", "granted"].includes(res.state)) {
                    if (res.state === "granted") {
                        setError(null);
                    }
                    if (res.state === "prompt") {
                        setLocation({
                            loaded: true,
                            coordinates: { lat: "", lng: "" },
                        });
                    }
                    watchId = navigator.geolocation.watchPosition(
                        onSuccess,
                        onError,
                        geoOptions,
                    );
                }
                res.addEventListener("change", () =>
                    setPermissionStatus(res.state),
                );
            })
            .catch((err) => {
                setPermissionStatus("");
                setError(
                    "Unable to retrieve your location. Please clear cache and try again",
                );
                watchId = "";
            });

        return () => {
            watchId && navigator.geolocation.clearWatch(watchId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSuccess, onError]);

    const requestLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                onSuccess,
                onError,
                geoOptions,
            );
        } else {
            setError("Geolocation is not supported by your browser");
            setLocation({
                loaded: true,
                coordinates: { lat: "", lng: "" },
            });
        }
    };

    return { location, error, permissionStatus, requestLocation };
};

export default useGeoLocation;
