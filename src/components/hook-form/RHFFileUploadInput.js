import PropTypes from "prop-types";
import { labelWeekday } from "react-day-picker";
import { Controller, useFormContext } from "react-hook-form";

RHFFileUploadInput.propTypes = {
    name: PropTypes.string,
};

export default function RHFFileUploadInput({
    name,
    placeholderIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#64748b"
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" />
        </svg>
    ),
    className = "file-input relative",
    label = "",
    onChange,
    onRemove,
    accept = "*",
    labelPosition = "top",
    ...other
}) {
    // ** Hooks
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    {label && labelPosition === "top" ? (
                        <label>{label}</label>
                    ) : null}
                    <input
                        type="file"
                        name="file-input"
                        id={name}
                        className="file-input__input"
                        onChange={(e) => onChange(e.target.files, name)}
                        accept={accept}
                    />
                    {field?.value ? (
                        <>
                            <button
                                onClick={() => onRemove(name)}
                                className="absolute right-[-8px] top-[20px] border-2 border-red-500/100 p-1 h-6 w-6 flex justify-center items-center rounded-full text-red-400/100"
                            >
                                --
                            </button>
                            <img
                                src={
                                    typeof field.value === "string"
                                        ? field.value
                                        : URL.createObjectURL(field.value)
                                }
                                alt={`${name}-image`}
                                className="rounded-lg"
                            />
                        </>
                    ) : (
                        <label className="file-input__label" htmlFor={name}>
                            {placeholderIcon}
                            {labelPosition === "inside" ? <p>{label}</p> : null}
                        </label>
                    )}
                    <p className="text-red-500">
                        {error ? error?.message : ""}
                    </p>
                </div>
            )}
            {...other}
        />
    );
}
