import PropTypes from "prop-types";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";

RHFSelectInput.propTypes = {
    name: PropTypes.string,
};

export default function RHFSelectInput({
    name,
    disabled = false,
    className = "",
    selectProps = {},
    options = [],
}) {
    // ** Hooks
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Select
                    name={name}
                    options={options}
                    classNamePrefix="react-select"
                    className={`select-block-fetishes ${className}`}
                    value={
                        options?.find(({ value }) => value === field.value) ||
                        ""
                    }
                    onChange={({ value }) => field.onChange(value)}
                    isDisabled={disabled}
                    {...selectProps}
                />
            )}
        />
    );
}
