import { MAP_API_KEY } from "../../config";

export const fetchAddressFromCoordinates = (coordinates) =>
    new Promise((resolve) => {
        try {
            fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${MAP_API_KEY}`,
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.results.length > 0) {
                        resolve({
                            status: true,
                            data: data?.results[0].formatted_address,
                        });
                    } else {
                        resolve({
                            status: true,
                            data: "",
                        });
                    }
                })
                .catch((error) => {
                    resolve({
                        status: false,
                        data: "",
                        error: error,
                    });
                });
        } catch (error) {
            resolve({
                status: false,
                data: "",
                error: "Address not found",
            });
        }
    });
