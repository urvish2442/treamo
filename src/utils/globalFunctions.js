export const convertArrayToObject = (array, objectKeys) => {
    if (!array.length) return [];
    return array.map((subArray) => {
        const obj = {};
        subArray.forEach((item, index) => {
            obj[objectKeys[index]] = item;
        });
        return obj;
    });
};

export const isDateInArray = (date, arrays) =>
    arrays.some((array) => array.includes(date));

export const getAddressFromObj = (address) => {
    const parts = [];

    if (address.house) parts.push(address.house);
    if (address.street) parts.push(address.street);
    if (address.postcode) parts.push(address.postcode);
    if (address.city) parts.push(address.city);
    if (address.country) parts.push(address.country);

    return parts.join(", ");
};

export const truncateString = (
    text,
    startLength = 5,
    endLength = 4,
    ellipsis = "...",
) => {
    if (!text) return "";
    if (text.length <= startLength + endLength) {
        return text;
    }
    const start = text.slice(0, startLength);
    const end = text.slice(-endLength);
    return `${start}${ellipsis}${end}`;
};
