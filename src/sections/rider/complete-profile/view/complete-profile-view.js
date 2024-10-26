"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import LoginMain from "@/components/styles/ryderAuth.style";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
    FormProvider,
    RHFFileUploadInput,
    RHFTextInput,
} from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { authState, setUserData } from "@/redux/Auth/AuthSlice";
import { axiosPatch, uploadFile } from "@/services/axiosHelper";
import useToaster from "@/hooks/useToaster";
import { TOAST_TYPES } from "@/constants/keywords";
import { updateUserAction } from "@/redux/Auth/action";
import { API_ROUTER } from "@/services/apiRouter";
import { useRouter } from "next/navigation";

const CompleteProfileView = () => {
    // ** Hooks
    const { t } = useTranslation("common");
    const { userData } = useSelector(authState);
    const { toaster } = useToaster();
    const dispatch = useDispatch();
    const { push } = useRouter();

    const isInternalUser = useMemo(
        () => !userData?.riderDetail?.rider_provider_id,
        [userData],
    );

    // ** RFH Configuration
    const defaultValues = useMemo(
        () => ({
            ...(isInternalUser
                ? {
                      house: userData?.house || "",
                      locale: userData?.locale || "",
                      city: userData?.city || "",
                      postcode: userData?.postcode || "",
                      state: userData?.state || "",
                      country: userData?.country || "",
                      tax_id: userData?.riderDetail?.tax_id || "",
                      payout_name: userData?.riderDetail?.payout_name || "",
                      payout_iban: userData?.riderDetail?.payout_iban || "",
                  }
                : {}),
            picture_driving_license:
                userData?.riderDetail?.picture_driving_license || "",
            picture_id: userData?.riderDetail?.picture_id || "",
        }),
        [userData, isInternalUser],
    );

    const formSchema = useMemo(
        () =>
            yup
                .object()
                .shape({
                    ...(isInternalUser
                        ? {
                              house: yup
                                  .string()
                                  .required(t("validations.house.required"))
                                  .matches(
                                      /^[a-zA-Z0-9]+$/,
                                      t("validations.house.matches"),
                                  )
                                  .trim(t("validations.house.trim"))
                                  .min(1, t("validations.house.min"))
                                  .max(10, t("validations.house.max")),
                              locale: yup
                                  .string()
                                  .required(t("validations.locale.required"))
                                  .matches(
                                      /^[a-zA-Z0-9\s,'-]*$/,
                                      t("validations.locale.matches"),
                                  )
                                  .trim(t("validations.locale.trim"))
                                  .min(3, t("validations.locale.min"))
                                  .max(50, t("validations.locale.max")),
                              city: yup
                                  .string()
                                  .required(t("validations.city.required"))
                                  .matches(
                                      /^[a-zA-Z\s]*$/,
                                      t("validations.city.matches"),
                                  )
                                  .trim(t("validations.city.trim"))
                                  .min(2, t("validations.city.min"))
                                  .max(50, t("validations.city.max")),
                              postcode: yup
                                  .string()
                                  .required(t("validations.postcode.required"))
                                  .matches(
                                      /^[a-zA-Z0-9\s]*$/,
                                      t("validations.postcode.matches"),
                                  )
                                  .trim(t("validations.postcode.trim"))
                                  .min(3, t("validations.postcode.min"))
                                  .max(10, t("validations.postcode.max")),
                              state: yup
                                  .string()
                                  .required(t("validations.state.required"))
                                  .matches(
                                      /^[a-zA-Z\s]*$/,
                                      t("validations.state.matches"),
                                  )
                                  .trim(t("validations.state.trim"))
                                  .min(2, t("validations.state.min"))
                                  .max(50, t("validations.state.max")),
                              country: yup
                                  .string()
                                  .required(t("validations.country.required"))
                                  .matches(
                                      /^[a-zA-Z\s]*$/,
                                      t("validations.country.matches"),
                                  )
                                  .trim(t("validations.country.trim"))
                                  .min(2, t("validations.country.min"))
                                  .max(56, t("validations.country.max")),
                              tax_id: yup
                                  .string()
                                  .required(t("validations.tax_id.required"))
                                  .matches(
                                      /^[a-zA-Z0-9-]*$/,
                                      t("validations.tax_id.matches"),
                                  )
                                  .trim(t("validations.tax_id.trim"))
                                  .min(5, t("validations.tax_id.min"))
                                  .max(30, t("validations.tax_id.max")),
                              payout_name: yup
                                  .string()
                                  .required(
                                      t("validations.payout_name.required"),
                                  )
                                  .matches(
                                      /^[a-zA-Z\s]*$/,
                                      t("validations.payout_name.matches"),
                                  )
                                  .trim(t("validations.payout_name.trim"))
                                  .min(2, t("validations.payout_name.min"))
                                  .max(100, t("validations.payout_name.max")),
                              payout_iban: yup
                                  .string()
                                  .required(
                                      t("validations.payout_iban.required"),
                                  )
                                  .matches(
                                      /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
                                      t("validations.payout_iban.matches"),
                                  )
                                  .trim(t("validations.payout_iban.trim"))
                                  .min(15, t("validations.payout_iban.min"))
                                  .max(34, t("validations.payout_iban.max")),
                          }
                        : {}),

                    picture_driving_license: yup
                        .mixed()
                        .test(
                            "isExist",
                            t("validations.picture_driving_license.isExist"),
                            (value) => value,
                        )
                        .test(
                            "fileSize",
                            t("validations.picture_driving_license.fileSize"),
                            (value) =>
                                value
                                    ? typeof value !== "string"
                                        ? value.size <= 5 * 1024 * 1024
                                        : true
                                    : false,
                        )
                        .test(
                            "fileType",
                            t("validations.picture_driving_license.fileType"),
                            (value) =>
                                value
                                    ? typeof value !== "string"
                                        ? [
                                              "image/jpeg",
                                              "image/png",
                                              "image/jpg",
                                          ].includes(value?.type)
                                        : true
                                    : false,
                        ),
                    picture_id: yup
                        .mixed()
                        .test(
                            "isExist",
                            t("validations.picture_id.isExist"),
                            (value) => value,
                        )
                        .test(
                            "fileSize",
                            t("validations.picture_id.fileSize"),
                            (value) =>
                                value
                                    ? typeof value !== "string"
                                        ? value.size <= 5 * 1024 * 1024
                                        : true
                                    : false,
                        )
                        .test(
                            "fileType",
                            t("validations.picture_id.fileType"),
                            (value) =>
                                value
                                    ? typeof value !== "string"
                                        ? [
                                              "image/jpeg",
                                              "image/png",
                                              "image/jpg",
                                          ].includes(value?.type)
                                        : true
                                    : false,
                        ),
                })
                .required()
                .strict(true),
        [isInternalUser, t],
    );

    const methods = useForm({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    // ** Constants
    const {
        handleSubmit,
        formState: { isSubmitting, isDirty },
        setValue,
        reset,
    } = methods;

    // ** Effects
    useEffect(() => {
        if (userData) handleSetRiderFormData(userData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    // ** Helpers
    const handleSetRiderFormData = (userData) => {
        reset({
            ...(isInternalUser
                ? {
                      house: userData?.house || "",
                      locale: userData?.locale || "",
                      city: userData?.city || "",
                      postcode: userData?.postcode || "",
                      state: userData?.state || "",
                      country: userData?.country || "",
                      tax_id: userData?.riderDetail?.tax_id || "",
                      payout_name: userData?.riderDetail?.payout_name || "",
                      payout_iban: userData?.riderDetail?.payout_iban || "",
                  }
                : {}),
            picture_driving_license:
                userData?.riderDetail?.picture_driving_license || "",
            picture_id: userData?.riderDetail?.picture_id || "",
        });
    };

    // ** Handlers
    const onSubmitForm = useCallback(
        async (formData) => {
            try {
                const userPayLoad = {};
                const riderPayLoad = {};

                if (formData.house !== userData?.house)
                    userPayLoad.house = formData.house;
                if (formData.locale !== userData?.locale)
                    userPayLoad.locale = formData.locale;
                if (formData.city !== userData?.city)
                    userPayLoad.city = formData.city;
                if (formData.postcode !== userData?.postcode)
                    userPayLoad.postcode = formData.postcode;
                if (formData.state !== userData?.state)
                    userPayLoad.state = formData.state;
                if (formData.country !== userData?.country)
                    userPayLoad.country = formData.country;
                if (formData.tax_id !== userData?.riderDetail?.tax_id)
                    riderPayLoad.tax_id = formData.tax_id;
                if (formData.payout_name !== userData?.riderDetail?.payout_name)
                    riderPayLoad.payout_name = formData.payout_name;
                if (formData.payout_iban !== userData?.riderDetail?.payout_iban)
                    riderPayLoad.payout_iban = formData.payout_iban;

                if (
                    formData.picture_driving_license !==
                    userData?.riderDetail?.picture_driving_license
                ) {
                    const licenseImageUrlRes = await uploadFile(
                        formData.picture_driving_license,
                    );
                    if (licenseImageUrlRes.status) {
                        riderPayLoad.picture_driving_license =
                            licenseImageUrlRes.url;
                    } else {
                        return toaster(
                            t("generalErrorText"),
                            TOAST_TYPES.ERROR,
                        );
                    }
                }

                if (formData.picture_id !== userData?.riderDetail?.picture_id) {
                    const pictureImageUrlRes = await uploadFile(
                        formData.picture_id,
                    );
                    if (pictureImageUrlRes.status) {
                        riderPayLoad.picture_id = pictureImageUrlRes.url;
                    } else {
                        return toaster(
                            t("generalErrorText"),
                            TOAST_TYPES.ERROR,
                        );
                    }
                }
                let isUserDetailsUpdated = false,
                    isRiderProfileUpdated = false;

                if (isInternalUser && Object.keys(userPayLoad).length > 0) {
                    const userUpdateRes = await dispatch(
                        updateUserAction(userPayLoad),
                    );
                    if (userUpdateRes?.payload?.data) {
                        isUserDetailsUpdated = true;
                        dispatch(
                            setUserData({
                                ...userData,
                                ...userUpdateRes?.payload?.data,
                            }),
                        );
                    }
                }

                if (Object.keys(riderPayLoad).length > 0) {
                    const riderProfileRes = await axiosPatch(
                        API_ROUTER.UPDATE_RIDER,
                        {
                            ...riderPayLoad,
                        },
                    );

                    if (riderProfileRes?.status) {
                        isRiderProfileUpdated = true;
                        await dispatch(
                            setUserData({
                                ...userData,
                                ...userPayLoad,
                                riderDetail: { ...riderProfileRes?.data },
                            }),
                        );
                    }
                }
                if (isUserDetailsUpdated || isRiderProfileUpdated) {
                    toaster(
                        t("ProfileUpdatedSuccessfully"),
                        TOAST_TYPES.SUCCESS,
                    );
                    push(PATH_DASHBOARD.rider.profile);
                }
            } catch (error) {
                toaster(t("generalErrorText"), TOAST_TYPES.ERROR);
            }
        },
        [userData, toaster, dispatch, t, isInternalUser, push],
    );

    const onChangeFile = useCallback(
        (files, name) => {
            const clonedData = files[0];
            setValue(
                name,
                Object.assign(clonedData, {
                    preview: URL.createObjectURL(clonedData),
                }),
                { shouldValidate: true, shouldDirty: true },
            );
        },
        [setValue],
    );

    const onRemoveFile = useCallback(
        (name) =>
            setValue(name, "", { shouldValidate: true, shouldDirty: true }),
        [setValue],
    );

    return (
        <LoginMain>
            <div className="login-main">
                <div className="login-main-inner">
                    <div className="link-bank-btn">
                        <Link href={PATH_DASHBOARD.rider.selectLocations}>
                            <img
                                alt="back-arrow"
                                src="/back-arrrow-header.svg"
                            />
                        </Link>
                    </div>
                    <h1>{t("addRiderDetails")}</h1>
                    <FormProvider
                        methods={methods}
                        onSubmit={handleSubmit(onSubmitForm)}
                    >
                        <div className="form-login">
                            {isInternalUser ? (
                                <>
                                    <div className="two-from-group">
                                        <div className="form-group">
                                            <label>{t("house")}</label>
                                            <RHFTextInput
                                                name="house"
                                                placeholder={t("house")}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>{t("locale")}</label>
                                            <RHFTextInput
                                                name="locale"
                                                placeholder={t("locale")}
                                            />
                                        </div>
                                    </div>
                                    <div className="two-from-group">
                                        <div className="form-group">
                                            <label>{t("city")}</label>
                                            <RHFTextInput
                                                name="city"
                                                placeholder={t("city")}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>{t("postal_code")}</label>
                                            <RHFTextInput
                                                name="postcode"
                                                placeholder={t("postal_code")}
                                            />
                                        </div>
                                    </div>
                                    <div className="two-from-group">
                                        <div className="form-group">
                                            <label>{t("state")}</label>
                                            <RHFTextInput
                                                name="state"
                                                placeholder={t("state")}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>{t("country")}</label>
                                            <RHFTextInput
                                                name="country"
                                                placeholder={t("country")}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>{t("taxId")}</label>
                                        <RHFTextInput
                                            name="tax_id"
                                            placeholder={t("taxId")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t("payout_name")}</label>
                                        <RHFTextInput
                                            name="payout_name"
                                            placeholder={t("payout_name")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t("payout_iban")}</label>
                                        <RHFTextInput
                                            name="payout_iban"
                                            placeholder={t("payout_iban")}
                                        />
                                    </div>
                                </>
                            ) : null}

                            <RHFFileUploadInput
                                name="picture_driving_license"
                                label={t("license")}
                                onChange={onChangeFile}
                                onRemove={onRemoveFile}
                                accept=".jpg,.jpeg,.png"
                            />
                            <RHFFileUploadInput
                                name="picture_id"
                                label={t("pictureId")}
                                onChange={onChangeFile}
                                onRemove={onRemoveFile}
                                accept=".jpg,.jpeg,.png"
                            />

                            <div className="btn-form">
                                <button
                                    className="btn button-common"
                                    type="submit"
                                    disabled={isSubmitting || !isDirty}
                                >
                                    {isSubmitting
                                        ? t("saving")
                                        : t("addDetails")}
                                </button>
                            </div>
                        </div>
                    </FormProvider>
                </div>
            </div>
        </LoginMain>
    );
};

export default CompleteProfileView;
