import { useEffect } from "react";

const useElementOutsideClick = (ref, callback) => {
    // ** Handlers

    const handleClick = (e) => {
        if (ref.current && !ref.current?.contains(e.target)) {
            callback();
        }
    };

    // ** Effects
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useElementOutsideClick;
