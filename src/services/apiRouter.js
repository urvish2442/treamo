export const API_ROUTER = {
    // LOGIN
    LOGIN_USER: "/auth/login",
    AUTH_TOKEN: "/auth/token",
    AUTH_LINK: "/auth/link",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_LOGOUT_ALL: "/auth/logoutall",

    HUB_LIST: "/hubs",
    GET_HUB_BY_ID: (hubId) => `/hubs/${hubId}`,
    DAYS_LIST: "/days",

    // HUB MANAGERS
    HUBMANAGERS: "/hubmanagers",
    GET_HUBMANAGERS_BY_ID: (id) => `/hubmanagers/${id}`,
    UPDATE_HUB_MANAGER: "/hubmanagers",

    // USERS
    GET_ME: "/users",
    CREATE_USER: "/users",
    UPDATE_USER: "/users",

    // PAYMENTS
    CREATE_PAYMENT: "/payments",
    LIST_PAYMENT_METHODS: "/payments/methods",
    REFUNDS: "/refunds",

    GET_FUNDS: "/funds",
    CHARGE_USER: "/funds",

    SUCCESS_PAYMENT: "/webhook/success",
    CREATE_REFUND: "/webhook/refunded",

    GET_TRANSACTIONS: "/transactions",
    // AUTO TOPUP
    GET_AUTO_TOPUP: "/autotopup",
    CREATE_UPDATE_AUTO_TOPUP: "/autotopup",

    // ADDRESS
    UPDATE_ADDRESS: "/addresses/",
    CREATE_ADDRESS: "/addresses",

    // Municipality
    GET_MUNICIPALITY_ID: "/municipalities/",
    GET_MUNICIPALITY_LIST: "/municipalities",

    // CATEGORY
    READ_CATEGORY: "/categories/",
    LIST_CATEGORIES: "/categories",

    // PRODUCT
    ADD_PRODUCTS: "/products",
    GET_PRODUCTS: "/products",
    LIST_PRODUCTS_ME: "/products/me",
    GET_PRODUCT_BY_ID: (id) => `/products/${id}`,
    UPDATE_PRODUCT_BY_ID: (id) => `/products/${id}`,
    GET_SHIFTS: "/shifts",
    CREATE_SHIFT: "/shifts",
    GET_SHIFT_BY_ID: (id) => `/shifts/${id}`,
    UPDATE_SHIFT_BY_ID: (id) => `/shifts/${id}`,

    // RIDERS
    GET_AVAILABILITIES: "/availabilities",
    CREATE_AVAILABILITIES: "/availabilities",
    DELETE_AVAILABILITY: (availabilityId) =>
        `/availabilities/${availabilityId}`,
    GET_ROUTES: "/routes",

    // ORDERS
    GET_ORDERS: "/orders",
    GET_ORDER_DETAILS: (orderId) => `/orders/${orderId}`,
    UPDATE_ORDER_DETAILS: (orderId) => `/orders/${orderId}`,

    // DATA
    GET_KNOWI_URL: "/knowi",

    // UPDATE_PRODUCT: "/products/",
    // DELETE_PRODUCT: "/products/",

    // ** RIDERS

    GET_RIDER: (riderId) => `/riders/${riderId}`,
    UPDATE_RIDER: `/riders`,
    GET_TODO_TASK: (task) => `/todos/${task}`,
    // ** Upload Files
    UPLOAD_FILE: "/uploads",

    // ** Tasks
    GET_TODOS: (type) => `/todos/${type}`,
};
