import {
    authState,
    resetNextCurrentOrderIndex,
    setHubData,
    setProductDetails,
    setRouteDirection,
    setUserData,
} from "@/redux/Auth/AuthSlice";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
    CreateShiftService,
    GetAvailabilitiesService,
    GetDashBoardIframe,
    GetDaysForHubManager,
    GetHubManager,
    GetShiftByIdService,
    GetShiftsService,
    UpdateHubManagerService,
    UpdateShiftByIdService,
    UpdateUserService,
} from "@/services/hubManagerServices ";
import {
    AddProductForSupplier,
    GetProductsForSupplier,
    UpdateProductDetailsForSupplier,
} from "@/services/supplierServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import moment from "moment";
import "moment/locale/de";
import { SHIFT_STATUS, SHIFT_TYPE } from "@/constants/keywords";
import useMetaData from "./useMetaData";
import { API_ROUTER } from "@/services/apiRouter";
import { decodeData } from "@/utils/jwt";
import axios from "axios";
import { axiosGet } from "@/services/axiosHelper";

export const useHubData = () => {
    const { hubList, hubData } = useSelector(authState);
    const dispatch = useDispatch();
    const [hubOptions, setHubOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (!hubOptions.length) return;
        const hubInOptions = hubOptions.find(
            (option) => option.value === hubData?.id,
        );
        const selectedHub = hubInOptions
            ? { value: hubData?.id, label: hubData?.name }
            : hubOptions[0];
        setSelectedOption(selectedHub);
        if (!hubInOptions && hubList[0]) {
            dispatch(setHubData(hubList[0]));
        }
    }, [hubData, hubOptions, dispatch, hubList]);

    useEffect(() => {
        if (hubList?.length) {
            const options = hubList.map((hub) => ({
                value: hub.id,
                label: hub?.name,
            }));
            setHubOptions(options);
        }
    }, [hubList]);

    const handleSelectChange = (option) => {
        setSelectedOption(option);
        const selectedHub = hubList.find((hub) => hub.id === option.value);
        if (selectedHub) {
            dispatch(setHubData(selectedHub));
        }
    };
    return { hubOptions, selectedOption, handleSelectChange };
};

export const useProductsListForSupplier = () => {
    const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hubData, categoryList } = useSelector(authState);

    const getData = async () => {
        try {
            setLoading(true);
            let payload = {
                filters: "hub_id$eq" + hubData?.id,
            };
            const { data } = await GetProductsForSupplier(payload);
            const categories = categoryList.map((category) => ({
                ...category,
                subcategories: category.subcategories.map((subcategory) => ({
                    ...subcategory,
                    products: subcategory.products
                        ? [...subcategory.products]
                        : [],
                })),
            }));
            data?.forEach((product) => {
                const category = categories.find(
                    (cat) => cat.id === product.category_id,
                );
                if (category) {
                    const subcategory = category.subcategories.find(
                        (sub) => sub.id === product.subcategory_id,
                    );

                    if (subcategory) {
                        subcategory.products.push(product);
                    }
                }
            });
            setCategoriesWithProducts(categories);
        } catch (error) {
            console.error("getProductsList ~ error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hubData?.id) return;
        getData();
    }, [hubData?.id]);

    return { loading, categoriesWithProducts };
};

export const useProductUpdate = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { productDetail, categoryList } = useSelector(authState);
    const [categoryListOptions, setCategoryListOptions] = useState([]);
    const [subCategoryListOptions, setSubCategoryListOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!categoryList.length) return;
        const options = categoryList.map((category) => ({
            value: category.id,
            label: category.name,
        }));
        setCategoryListOptions(options);
    }, [categoryList]);

    const today = new Date();
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t("ProductNameRequired")),
        price_supplier: Yup.number(t("PriceMustBeNumber"))
            .required(t("PriceRequired"))
            .positive(t("PricePositive")),
        quantity: Yup.number(t("QuantityMustBeNumber"))
            .required(t("QuantityRequired"))
            .positive(t("QuantityPositive")),
        unit: Yup.string().required(t("UnitRequired")),
        description: Yup.string().required(t("DescriptionRequired")),
        ingredients: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required(t("IngredientNameRequired")),
                    value: Yup.string().required(t("IngredientShareRequired")),
                }),
            )
            .min(1, t("AtLeastOneIngredient")),
        allergens: Yup.array().of(Yup.string().required(t("AllergenRequired"))),
        storage_type: Yup.string().required(t("StorageTypeRequired")),
        max_daily_quantity: Yup.number(t("MaxDailyQuantityMustBeNumber"))
            .required(t("MaxDailyQuantityRequired"))
            .positive(t("MaxDailyQuantityPositive")),
        category_id: Yup.string().required(t("CategoryRequired")),
        subcategory_id: Yup.string()
            .required(t("SubcategoryRequired"))
            .test(
                "subcategory-validation",
                t("InvalidSubcategory"),
                function (subcategory_id) {
                    const { category_id } = this.parent;
                    if (!category_id || !subcategory_id) return true;
                    const selectedCategory = categoryList.find(
                        (category) => category.id === category_id,
                    );
                    if (!selectedCategory) return false;
                    return selectedCategory.subcategories.some(
                        (subcategory) => subcategory.id === subcategory_id,
                    );
                },
            ),
        is_organic: Yup.boolean(),
        width: Yup.number(t("WidthMustBeNumber"))
            .required(t("WidthRequired"))
            .positive(t("WidthPositive")),
        height: Yup.number(t("HeightMustBeNumber"))
            .required(t("HeightRequired"))
            .positive(t("HeightPositive")),
        depth: Yup.number(t("DepthMustBeNumber"))
            .required(t("DepthRequired"))
            .positive(t("DepthPositive")),
        weight: Yup.number(t("WeightMustBeNumber"))
            .required(t("WeightRequired"))
            .positive(t("WeightPositive")),
        ts_available_start: Yup.date(t("AvailableStartDateMustBeDate"))
            .typeError(t("AvailableStartDateMustBeDate"))
            .required(t("AvailableStartDateRequired"))
            .min(today, t("AvailableStartDateMustBeTodayOrLater")),
        ts_available_end: Yup.date(t("AvailableEndDateMustBeDate"))
            .typeError(t("AvailableEndDateMustBeDate"))
            .required(t("AvailableEndDateRequired"))
            .min(
                Yup.ref("ts_available_start"),
                t("AvailableEndDateMustBeAfterStart"),
            )
            .test(
                "is-after-start",
                t("AvailableEndDateMustBeAfterStart"),
                function (value) {
                    const { ts_available_start } = this.parent;
                    return (
                        !value ||
                        !ts_available_start ||
                        new Date(value) > new Date(ts_available_start)
                    );
                },
            ),
    });
    const {
        control,
        setValue,
        watch,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: productDetail?.title || "",
            price_supplier: productDetail?.price_supplier || "",
            quantity: productDetail?.quantity || "",
            unit: productDetail?.unit?.toUpperCase() || "",
            description: productDetail?.description || "",
            ingredients: productDetail?.ingredients || [
                { name: "", value: "" },
            ],
            allergens: productDetail?.allergens || [""],
            nutrition: productDetail?.nutrition || {
                joules: 0,
                calories: 0,
                fat: 0,
                saturated_fat: 0,
                carbohydrates: 0,
                sugar: 0,
                protein: 0,
                salt: 0,
            },
            storage_type: productDetail?.storage_type?.toUpperCase() || "",
            max_daily_quantity: productDetail?.max_daily_quantity || "",
            category_id: productDetail?.category_id || "",
            subcategory_id: productDetail?.subcategory_id || "",
            is_organic: productDetail?.is_organic || false,
            width: productDetail?.width || "",
            height: productDetail?.height || "",
            depth: productDetail?.depth || "",
            weight: productDetail?.weight || "",
            ts_available_start: productDetail?.ts_available_start || "",
            ts_available_end: productDetail?.ts_available_end || "",
        },
        resolver: yupResolver(validationSchema),
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: "ingredients",
    });

    const {
        fields: allergenFields,
        append: appendAllergen,
        remove: removeAllergen,
    } = useFieldArray({
        control,
        name: "allergens",
    });

    const onSubmit = async (data) => {
        try {
            const formData = {
                ...data,
                deposit: productDetail.deposit,
            };
            setIsSubmitting(true);
            let payload = { id: productDetail.id, data: formData };
            const { data: result } =
                await UpdateProductDetailsForSupplier(payload);
            if (result.id) {
                toast.success(t("ProductUpdatedSuccessfully"));
                dispatch(setProductDetails(result));
                router.push(PATH_DASHBOARD.supplier.products.root);
            } else {
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            toast.error(t("SomethingWentWrong"));
            console.error("onSubmit ~ error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (productDetail?.ts_available_start) {
            setValue(
                "ts_available_start",
                new Date(productDetail.ts_available_start)
                    .toISOString()
                    .substring(0, 10),
            );
        }
        if (productDetail?.ts_available_end) {
            setValue(
                "ts_available_end",
                new Date(productDetail.ts_available_end)
                    .toISOString()
                    .substring(0, 10),
            );
        }
    }, [productDetail, setValue]);

    useEffect(() => {
        const selectedCategoryId = watch("category_id") || "";
        const selectedCategory = categoryList?.find(
            (category) => category.id === selectedCategoryId,
        );
        const subCategoryOptions = selectedCategory?.subcategories.map(
            (subcategory) => ({
                value: subcategory.id,
                label: subcategory.name,
            }),
        );
        setSubCategoryListOptions(subCategoryOptions || []);
    }, [watch("category_id"), categoryList]);

    return {
        control,
        productDetail,
        categoryList,
        categoryListOptions,
        subCategoryListOptions,
        isSubmitting,
        handleSubmit,
        register,
        errors,
        ingredientFields,
        appendIngredient,
        removeIngredient,
        allergenFields,
        appendAllergen,
        removeAllergen,
        onSubmit,
    };
};

export const useAddProduct = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { productDetail, categoryList, hubData, categorySubCategory } =
        useSelector(authState);
    const [categoryListOptions, setCategoryListOptions] = useState([]);
    const [subCategoryListOptions, setSubCategoryListOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!categoryList.length) return;
        const options = categoryList.map((category) => ({
            value: category.id,
            label: category.name,
        }));
        setCategoryListOptions(options);
    }, [categoryList]);

    const today = new Date();
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t("ProductNameRequired")),
        price_supplier: Yup.number(t("PriceMustBeNumber"))
            .required(t("PriceRequired"))
            .positive(t("PricePositive")),
        quantity: Yup.number(t("QuantityMustBeNumber"))
            .required(t("QuantityRequired"))
            .positive(t("QuantityPositive")),
        unit: Yup.string().required(t("UnitRequired")),
        description: Yup.string().required(t("DescriptionRequired")),
        ingredients: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required(t("IngredientNameRequired")),
                    value: Yup.string().required(t("IngredientShareRequired")),
                }),
            )
            .min(1, t("AtLeastOneIngredient")),
        allergens: Yup.array().of(Yup.string().required(t("AllergenRequired"))),
        storage_type: Yup.string().required(t("StorageTypeRequired")),
        max_daily_quantity: Yup.number(t("MaxDailyQuantityMustBeNumber"))
            .required(t("MaxDailyQuantityRequired"))
            .positive(t("MaxDailyQuantityPositive")),
        category_id: Yup.string().required(t("CategoryRequired")),
        subcategory_id: Yup.string()
            .required(t("SubcategoryRequired"))
            .test(
                "subcategory-validation",
                t("InvalidSubcategory"),
                function (subcategory_id) {
                    const { category_id } = this.parent;
                    if (!category_id || !subcategory_id) return true;
                    const selectedCategory = categoryList.find(
                        (category) => category.id === category_id,
                    );
                    if (!selectedCategory) return false;
                    return selectedCategory.subcategories.some(
                        (subcategory) => subcategory.id === subcategory_id,
                    );
                },
            ),
        is_organic: Yup.boolean(),
        width: Yup.number(t("WidthMustBeNumber"))
            .required(t("WidthRequired"))
            .positive(t("WidthPositive")),
        height: Yup.number(t("HeightMustBeNumber"))
            .required(t("HeightRequired"))
            .positive(t("HeightPositive")),
        depth: Yup.number(t("DepthMustBeNumber"))
            .required(t("DepthRequired"))
            .positive(t("DepthPositive")),
        weight: Yup.number(t("WeightMustBeNumber"))
            .required(t("WeightRequired"))
            .positive(t("WeightPositive")),
        ts_available_start: Yup.date(t("AvailableStartDateMustBeDate"))
            .typeError(t("AvailableStartDateMustBeDate"))
            .required(t("AvailableStartDateRequired"))
            .min(today, t("AvailableStartDateMustBeTodayOrLater")),
        ts_available_end: Yup.date(t("AvailableEndDateMustBeDate"))
            .typeError(t("AvailableEndDateMustBeDate"))
            .required(t("AvailableEndDateRequired"))
            .min(
                Yup.ref("ts_available_start"),
                t("AvailableEndDateMustBeAfterStart"),
            )
            .test(
                "is-after-start",
                t("AvailableEndDateMustBeAfterStart"),
                function (value) {
                    const { ts_available_start } = this.parent;
                    return (
                        !value ||
                        !ts_available_start ||
                        new Date(value) > new Date(ts_available_start)
                    );
                },
            ),
    });

    const {
        control,
        setValue,
        watch,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            price_supplier: 0,
            quantity: 0,
            unit: "",
            description: "",
            ingredients: [{ name: "", value: "" }],
            allergens: [""],
            nutrition: {
                joules: 0,
                calories: 0,
                fat: 0,
                saturated_fat: 0,
                carbohydrates: 0,
                sugar: 0,
                protein: 0,
                salt: 0,
            },
            storage_type: "",
            max_daily_quantity: 0,
            category_id: categorySubCategory.category_id || "",
            subcategory_id: categorySubCategory.subcategory_id || "",
            is_organic: false,
            width: 0,
            height: 0,
            depth: 0,
            weight: 0,
            // ts_available_start: "",
            // ts_available_end: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: "ingredients",
    });

    const {
        fields: allergenFields,
        append: appendAllergen,
        remove: removeAllergen,
    } = useFieldArray({
        control,
        name: "allergens",
    });

    const onSubmit = async (data) => {
        try {
            if (!hubData.id) {
                toast.error("Please select hub");
                return;
            }
            const formData = {
                ...data,
                hub_id: hubData.id,
                deposit: 0,
            };
            setIsSubmitting(true);
            const result = await AddProductForSupplier(formData);
            if (result) {
                toast.success(t("ProductAddedSuccessfully"));
                router.push(PATH_DASHBOARD.supplier.products.root);
            }
        } catch (error) {
            toast.error(t("SomethingWentWrong"));
            console.error("onSubmit ~ error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const selectedCategoryId = watch("category_id") || "";
        if (!selectedCategoryId) return;
        const selectedCategory = categoryList?.find(
            (category) => category.id === selectedCategoryId,
        );
        const subCategoryOptions = selectedCategory?.subcategories.map(
            (subcategory) => ({
                value: subcategory.id,
                label: subcategory.name,
            }),
        );
        setSubCategoryListOptions(subCategoryOptions || []);
    }, [watch("category_id"), categoryList]);

    return {
        control,
        productDetail,
        categoryList,
        categoryListOptions,
        subCategoryListOptions,
        isSubmitting,
        handleSubmit,
        register,
        errors,
        ingredientFields,
        appendIngredient,
        removeIngredient,
        allergenFields,
        appendAllergen,
        removeAllergen,
        onSubmit,
    };
};

export const useHubManagerDashBoard = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const getData = async () => {
        try {
            setLoading(true);
            const { data } = await GetDashBoardIframe();
            if (data) {
                setData(data);
            }
        } catch (e) {
            console.error("useHubManagerDashBoard ~ e:", e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return { loading, data };
};

export const useUpdateHubManager = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { userData } = useSelector(authState);
    const [hubManagerData, setHubManagerData] = useState({});

    const options = useMemo(
        () => [
            { value: "male", label: t("Male") },
            { value: "female", label: t("Female") },
            { value: "other", label: t("Other") },
        ],
        [t],
    );

    const defaultValues = useMemo(
        () => ({
            firstname: userData?.firstname || "",
            lastname: userData?.lastname || "",
            gender: userData?.gender || "",
            house: userData?.house || "",
            locale: userData?.locale || "",
            city: userData?.city || "",
            state: userData?.state || "",
            country: userData?.country || "",
            postcode: userData?.postcode || "",
            payout_name: "",
            payout_iban: "",
        }),
        [userData],
    );

    const formSchema = useMemo(
        () =>
            Yup.object({
                house: Yup.string()
                    .required(t("validations.house.required"))
                    .matches(/^[a-zA-Z0-9]+$/, t("validations.house.matches"))
                    .trim(t("validations.house.trim"))
                    .min(1, t("validations.house.min"))
                    .max(10, t("validations.house.max")),
                firstname: Yup.string()
                    .required(t("validations.firstname.required"))
                    .matches(
                        /^[a-zA-Z\s]*$/,
                        t("validations.firstname.matches"),
                    )
                    .trim(t("validations.firstname.trim"))
                    .min(2, t("validations.firstname.min"))
                    .max(50, t("validations.firstname.max")),
                lastname: Yup.string()
                    .required(t("validations.lastname.required"))
                    .matches(/^[a-zA-Z\s]*$/, t("validations.lastname.matches"))
                    .trim(t("validations.lastname.trim"))
                    .min(2, t("validations.lastname.min"))
                    .max(50, t("validations.lastname.max")),
                gender: Yup.string().required(t("validations.gender.required")),
                // .oneOf(
                //     ["male", "female", "other"],
                //     t("validations.gender.oneOf"),
                // ),
                locale: Yup.string()
                    .required(t("validations.locale.required"))
                    .matches(
                        /^[a-zA-Z0-9\s,'-]*$/,
                        t("validations.locale.matches"),
                    )
                    .trim(t("validations.locale.trim"))
                    .min(3, t("validations.locale.min"))
                    .max(50, t("validations.locale.max")),
                city: Yup.string()
                    .required(t("validations.city.required"))
                    .matches(/^[a-zA-Z\s]*$/, t("validations.city.matches"))
                    .trim(t("validations.city.trim"))
                    .min(2, t("validations.city.min"))
                    .max(50, t("validations.city.max")),
                state: Yup.string()
                    .required(t("validations.state.required"))
                    .matches(/^[a-zA-Z\s]*$/, t("validations.state.matches"))
                    .trim(t("validations.state.trim"))
                    .min(2, t("validations.state.min"))
                    .max(50, t("validations.state.max")),
                payout_iban: Yup.string()
                    .required(t("validations.payout_iban.required"))
                    .matches(
                        /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
                        t("validations.payout_iban.matches"),
                    )
                    .trim(t("validations.payout_iban.trim"))
                    .min(15, t("validations.payout_iban.min"))
                    .max(34, t("validations.payout_iban.max")),
                payout_name: Yup.string().required(t("payout_name")),
            })
                .required()
                .strict(true),
        [t],
    );

    const methods = useForm({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = methods;

    useEffect(() => {
        const fetchHubManager = async () => {
            if (!userData.id) return;
            try {
                setIsLoading(true);
                const { data } = await GetHubManager(userData.id);
                setHubManagerData(data);
                setValue("payout_name", data?.payout_name || "");
                setValue("payout_iban", data?.payout_iban || "");
            } catch (error) {
                console.error("Error fetching hub manager:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHubManager();
    }, [setValue]);

    const firstnameValue = watch("firstname");
    useEffect(() => {
        const payoutNameValue = watch("payout_name");
        if (!payoutNameValue && firstnameValue) {
            setValue("payout_name", firstnameValue);
        }
    }, [firstnameValue, setValue, watch]);

    const onSubmitForm = async (formData) => {
        try {
            setIsLoading(true);
            const userPayload = {
                ...formData,
                street: userData?.street,
                country: userData?.country,
                postcode: userData?.postcode,
            };

            delete userPayload.payout_name;
            delete userPayload.payout_iban;

            const { data: updatedUserData } =
                await UpdateUserService(userPayload);
            if (updatedUserData) {
                dispatch(setUserData(updatedUserData));
            }

            const isHubManagerDataChanged =
                formData.payout_name !== hubManagerData.payout_name ||
                formData.payout_iban !== hubManagerData.payout_iban;

            let updatedHubManagerData;
            if (isHubManagerDataChanged) {
                const hubManagerPayload = {
                    contact_email: hubManagerData.contact_email,
                    contact_phone: hubManagerData.contact_phone,
                    payout_name: formData.payout_name,
                    payout_iban: formData.payout_iban,
                };
                const { data: updatedData } =
                    await UpdateHubManagerService(hubManagerPayload);
                updatedHubManagerData = updatedData;
                if (updatedHubManagerData) {
                    setHubManagerData(updatedHubManagerData);
                }
            }

            if (updatedUserData || updatedHubManagerData) {
                toast.success(t("ProfileUpdatedSuccessfully"));
                router.push(PATH_DASHBOARD.hubManager.dashboard);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(t("SomethingWentWrong"));
            console.error("Error on form submit:", error);
        }
    };

    return {
        isLoading,
        methods,
        options,
        control,
        errors,
        handleSubmit,
        onSubmitForm,
    };
};

export const useDaysForHubManager = () => {
    const [sortedDays, setSortedDays] = useState({
        closed: [],
        weekend: [],
        open: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const { hubData } = useSelector(authState);
    const [lng, lat] = hubData?.location?.coordinates || [];

    const getDays = async () => {
        if (!lat || !lng) return;
        setIsLoading(true);
        const currentDate = new Date();
        const ts_start = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
        )
            .toISOString()
            .slice(0, 10);
        const ts_end = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 3,
            1,
        )
            .toISOString()
            .slice(0, 10);

        const payload = { lat, lng, ts_start, ts_end };

        try {
            const { data } = await GetDaysForHubManager(payload);
            const closedDays = [];
            const weekendDays = [];
            const openDays = [];

            data?.forEach(({ date, is_holiday, is_weekend, is_open }) => {
                const parsedDate = new Date(date);
                if (is_holiday) {
                    closedDays.push(parsedDate);
                } else if (is_weekend) {
                    weekendDays.push(parsedDate);
                } else if (is_open) {
                    openDays.push(parsedDate);
                }
            });

            setSortedDays({
                closed: closedDays,
                weekend: weekendDays,
                open: openDays,
            });
        } catch (error) {
            console.error("Error fetching days:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDays();
    }, [lat, lng]);

    return { sortedDays, isLoading };
};

export const useShifts = () => {
    const { date = new Date().toISOString().split("T")[0], hubData } =
        useSelector(authState);
    const [shifts, setShifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getShifts = async () => {
        if (!hubData?.id) return;
        let payload = {
            hub_id: hubData?.id,
            filters: `ts_start_planned$gt${date}T00:00:00Z and ts_start_planned$lt${date}T23:59:59Z`,
        };

        try {
            setIsLoading(true);
            const { data } = await GetShiftsService(payload);

            const filteredShifts = data.filter((shift) => {
                return ![
                    SHIFT_STATUS.DECLINED,
                    SHIFT_STATUS.CANCELLED,
                ].includes(shift.status);
            });
            const rider = [];
            const springer = [];
            filteredShifts.map((shift) => {
                if (shift.type === SHIFT_TYPE.FULL) {
                    rider.push(shift);
                } else {
                    springer.push(shift);
                }
            });
            setShifts({ rider, springer });
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getShifts();
    }, [hubData?.id]);

    return { shifts, isLoading };
};

export const useAvailabilities = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { date = new Date().toISOString().split("T")[0], hubData } =
        useSelector(authState);
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const [availabilities, setAvailabilities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAvailability, setSelectedAvailability] = useState("");
    const prefered_type =
        type === "springer" ? SHIFT_TYPE.BACKUP : SHIFT_TYPE.FULL;

    const getAvailabilities = async () => {
        if (!hubData?.id) return;
        let payload = {
            filters: `hub_id$eq${hubData?.id} and date$eq${date} and prefered_type$eq${prefered_type}`,
        };
        try {
            setIsLoading(true);
            const { data } = await GetAvailabilitiesService(payload);
            setAvailabilities(data);
        } catch (error) {
            console.error("Error fetching availabilities:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createShift = async () => {
        if (!hubData?.id || !selectedAvailability) return;
        setIsLoading(true);

        try {
            const payload = {
                hub_id: hubData?.id,
                availability_id: selectedAvailability,
                type: prefered_type,
            };
            const { data, status } = await CreateShiftService(payload);
            if (status) {
                toast.success(t("ShiftCreatedSuccessfully"));
                router.push(PATH_DASHBOARD.hubManager.shifts);
            } else {
                setIsLoading(false);
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(t("SomethingWentWrong"));
            console.error("Error creating shift:", error);
        }
    };

    useEffect(() => {
        getAvailabilities();
    }, [hubData?.id]);

    return {
        availabilities,
        isLoading,
        selectedAvailability,
        setSelectedAvailability,
        createShift,
    };
};

export const useDateButtonData = ({ shiftDate = "" } = {}) => {
    const { i18n } = useTranslation("common");
    moment.locale(i18n.language || "de");

    const { date = new Date().toISOString().split("T")[0], hubData } =
        useSelector(authState);
    const DATE = shiftDate || date;

    const formatDate = (date) => {
        return moment(date).format("dddd, DD.MM.YYYY");
    };

    const timeParser = (timeInMinutes = 0) => {
        const hours = Math.floor((timeInMinutes || 0) / 60);
        return hours;
    };

    const parsedTime = useMemo(() => {
        return hubData.start_time_normal
            ? timeParser(hubData.start_time_normal)
            : 0;
    }, [hubData.start_time_normal]);
    const formattedDate = formatDate(DATE);
    return { formattedDate, parsedTime, DATE };
};

export const useShiftData = () => {
    const router = useRouter();
    const { shift_id: shiftId } = useParams();
    const [shiftData, setShiftData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState("");
    const { t } = useTranslation();

    const getShifts = async () => {
        if (!shiftId) return;
        try {
            setIsLoading(true);
            const { data } = await GetShiftByIdService(shiftId);
            if (data) {
                setShiftData(data);
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateShiftStatus = async (status, additionalData = {}) => {
        if (!shiftData?.id) return;
        setIsLoading(true);
        const payload = {
            id: shiftData.id,
            data: { status, ...additionalData },
        };

        try {
            const { data, status } = await UpdateShiftByIdService(payload);
            if (status) {
                setShiftData(data);
                router.push(PATH_DASHBOARD.hubManager.shifts);
                toast.success(t("ShiftUpdatedSuccessfully"));
            } else {
                setIsLoading(false);
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error updating shifts:", error);
        }
    };

    const handleEndShift = () => {
        if (!reason) return;
        const ts_end = new Date().toISOString();
        updateShiftStatus(undefined, { ts_end, cancellation_reason: reason });
    };

    const handelNoShow = () => updateShiftStatus(SHIFT_STATUS.NOSHOW);

    const handleCancelShift = () => updateShiftStatus(SHIFT_STATUS.CANCELLED);

    useEffect(() => {
        getShifts();
    }, [shiftId]);

    return {
        shiftData,
        isLoading,
        reason,
        setReason,
        handleEndShift,
        handelNoShow,
        handleCancelShift,
    };
};

export const useRiderIdleScreenData = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const dispatch = useDispatch();
    const router = useRouter();
    const [routes, setRoutes] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(false);
    const { t } = useTranslation();

    const fetchRoutes = async () => {
        try {
            const index = 7; // TODO: change route index here to 0

            setRoutesLoading(true);
            let payload = {
                offset: 0,
                limit: 10,
            };
            const { data, status } = await axiosGet(
                API_ROUTER.GET_ROUTES,
                payload,
            );
            if (status) {
                if (!data || data.length === 0) {
                    toast.error(t("NoRoutesFound"));
                    router.push(PATH_DASHBOARD.rider.dashboard);
                }
                setRoutes(data);
                const directions =
                    Array.isArray(data) && data.length > 0
                        ? data[index]?.directions
                        : routes?.directions || [];
                if (directions) {
                    const updatedDirections = directions?.map((direction) => ({
                        ...direction,
                        isPicked: false,
                        isDelivered: false,
                        orderDetails: null,
                        isChecked: false,
                        isSolveLater: false,
                    }));
                    dispatch(
                        setRouteDirection({ directions, updatedDirections }),
                    );
                }
            } else {
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
        } finally {
            setTimeout(() => {
                setRoutesLoading(false);
            }, 300);
        }
    };

    useEffect(() => {
        router.replace(PATH_DASHBOARD.rider.shiftCommissioning);
        if (type && decodeData(type) == "noFetch") return;
        fetchRoutes();
    }, []);

    return { routes, routesLoading };
};
