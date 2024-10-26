import { useMemo, useState } from "react";

const useToggle = (defaultValue = false) => {
    // ** States
    const [value, setValue] = useState(defaultValue);

    // ** Hooks
    const memoizedValues = useMemo(
        () => ({
            value,
            onTrue: () => setValue(true),
            onFalse: () => setValue(false),
            onToggle: () => setValue((prev) => !prev),
        }),
        [value, setValue],
    );

    return memoizedValues;
};

export default useToggle;
