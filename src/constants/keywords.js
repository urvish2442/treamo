import { PATH_DASHBOARD, RIDER_AFTER_LOGIN } from "@/routes/paths";

export const TOAST_ALERTS = {
    LOGIN_SUCCESS: "Login Successfully",
    REGISTER_SUCCESS: "Registered Successfully",
    RESET_PASSWORD: "Verify Otp",
    VERIFIED_SUCCESSFULLY: "Verified Successfully",
    RESET_SUCCESSFULLY: "Password set Successfully. Please Login.",
    ERROR_MESSAGE: "Something went wrong",
};

export const USER_ROLES = {
    SUPPLIER: "supplier",
    HUB_MANAGER: "hubmanager",
    RIDER: "rider",
};

export const TOAST_TYPES = {
    SUCCESS: "success",
    WARN: "warn",
    INFO: "info",
    ERROR: "error",
};

export const UnitOptions = [
    { label: "KG", value: "KG" },
    { label: "G", value: "G" },
    { label: "L", vaLue: "L" },
    { label: "ML", value: "ML" },
    { label: "Stück", value: "PIECE" },
    // { label: "Stück", value: "STUECK" },
];

export const StorageOptions = [
    { label: "DRY", value: "DRY" },
    { label: "FRIDGE", value: "FRIDGE" },
    { label: "FREEZER", value: "FREEZER" },
    { label: "MEAT", value: "MEAT" },
];

export const STORAGE_KEYS = {};

export const SHIFT_STATUS = {
    // REQUESTED: "requested", // requested
    // ACCEPTED: "accepted",
    // NOSHOW: "noshow", //  show in list but disable redirection
    // ACTIVE_BACKUP: "active-backup", // active
    // ACTIVE_IDLE: "active-idle", // active
    // ACTIVE_PICKING: "active-picking", // active
    // ACTIVE_DELIVERING: "active-delivering", // active
    // DECLINED: "declined", //  fileter out
    // CANCELLED: "cancelled", //  fileter out
    // DONE: "done", // complete

    REQUESTED: "REQUESTED",
    ACCEPTED: "ACCEPTED",
    NOSHOW: "NOSHOW",
    ACTIVE_BACKUP: "ACTIVE_BACKUP",
    ACTIVE_IDLE: "ACTIVE_IDLE",
    ACTIVE_PICKING: "ACTIVE_PICKING",
    ACTIVE_DELIVERING: "ACTIVE_DELIVERING",
    DECLINED: "DECLINED",
    CANCELLED: "CANCELLED",
    DONE: "DONE",
};

export const SHIFT_TYPE = {
    BACKUP: "BACKUP",
    FULL: "FULL",
};

export const roleRouteMap = {
    [USER_ROLES.HUB_MANAGER]: PATH_DASHBOARD.hubManager.dashboard,
    [USER_ROLES.SUPPLIER]: PATH_DASHBOARD.supplier.dashboard,
    [USER_ROLES.RIDER]: RIDER_AFTER_LOGIN,
};

export const SHIFT_STATUS_ARRAY = [
    {
        label: "shiftStatus.available",
        value: SHIFT_STATUS.AVAILABLE,
        className: "avilable-layer",
    },
    {
        label: "shiftStatus.declined",
        value: SHIFT_STATUS.DECLINED,
        className: "proven-block",
    },

    {
        label: "shiftStatus.requested",
        value: SHIFT_STATUS.REQUESTED,
        className: "requested-block",
    },
    {
        label: "shiftStatus.shift",
        value: SHIFT_STATUS.ACCEPTED,
        className: "layer-block",
    },
];

export const SHIFT_END_REASONS = ["NOSHOW", "SICK", "ACCIDENT", "CORRECTION"];

export const TODO_TYPES = {
    PRE_DELIVERING: "pre_delivering",
};

export const ORDER_STATUS = {
    ORDERED: "ordered",
    PICKED: "picked",
    REFUNDED: "refunded",
    DELIVERED: "delivered",
};

export const REFUND_REASONS = {
    isDamaged: "damaged",
    isMissing: "missing",
    isLost: "lost",
    other: "other",
};
