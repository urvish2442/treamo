import React, { createContext, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { MAP_API_KEY } from "../../config";

// Context
export const MapLoaderContext = createContext();

const MapLoaderProvider = ({ children }) => {
    // ** Hooks
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: MAP_API_KEY,
        libraries: ["places"],
    });

    // ** Context State
    const memoizedValues = useMemo(
        () => ({
            isLoaded,
            error: loadError?.message ?? false,
        }),
        [isLoaded, loadError],
    );

    return (
        <MapLoaderContext.Provider value={memoizedValues}>
            {children}
        </MapLoaderContext.Provider>
    );
};

export default MapLoaderProvider;
