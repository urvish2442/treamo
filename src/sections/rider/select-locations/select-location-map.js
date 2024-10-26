import React, { memo, useMemo } from "react";
import { GoogleMap, Polygon } from "@react-google-maps/api";

import useMapLoader from "@/hooks/useMapLoader";
import { convertArrayToObject } from "@/utils/globalFunctions";
import Loader from "@/components/Loader";

const containerStyle = {
    height: "100vh",
    width: "100%",
};

const options = {
    fillColor: "transparent",
    fillOpacity: 1,
    strokeColor: "#ECB549",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: true,
};

const styles = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#757575" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
    },
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
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }],
    },
];

const SelectLocationMap = ({
    regionOptions = [],
    onSelectRegion,
    selectedRegions,
}) => {
    // ** Hooks
    const { isLoaded, error } = useMapLoader();

    // ** Renders
    const renderAvailableRegions = useMemo(() => {
        if (regionOptions && regionOptions?.length > 0) {
            return regionOptions.map(({ id, area }) => {
                if (area?.type === "Polygon") {
                    const regionCords = convertArrayToObject(
                        area?.coordinates?.at(0) || [],
                        ["lng", "lat"],
                    );
                    const isSelected = selectedRegions.includes(id);
                    return (
                        <Polygon
                            paths={regionCords}
                            options={{
                                ...options,
                                ...(isSelected
                                    ? {
                                          fillColor: "#ECB549",
                                      }
                                    : {}),
                            }}
                            key={id}
                            onClick={() => onSelectRegion(id, isSelected)}
                        />
                    );
                }
            });
        }
    }, [regionOptions, onSelectRegion, selectedRegions]);

    const derivedCenter = useMemo(() => {
        if (regionOptions && regionOptions.length > 0) {
            const cordPoint = regionOptions
                .at(0)
                ?.area?.coordinates?.at(0)
                ?.at(0);
            return { lng: cordPoint.at(0), lat: cordPoint.at(1) };
        }
        return {
            lng: 8.485447000874439,
            lat: 47.21842251948987,
        };
    }, [regionOptions]);

    // ** Return
    if (!isLoaded) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={derivedCenter}
            options={{
                styles,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                colorScheme: "DARK",
            }}
        >
            {/* Regions */}
            {renderAvailableRegions}
        </GoogleMap>
    );
};

export default memo(SelectLocationMap);
