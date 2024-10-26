import { useContext } from "react";

import { MapLoaderContext } from "@/context/map-loader-context";

const useMapLoader = () => useContext(MapLoaderContext);

export default useMapLoader;
