"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import LoginMain from "@/components/styles/auth.style";
import { authLinkAction, loginAction } from "@/redux/Auth/action";
import { toast } from "react-toastify";
import { TOAST_ALERTS, USER_ROLES } from "@/constants/keywords";

import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import Loader from "@/components/Loader";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { getUserAction } from "@/redux/Auth/action";
import { getData } from "@/utils/storage";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/Auth/AuthSlice";
import { PATH_DASHBOARD, RIDER_AFTER_LOGIN } from "@/routes/paths";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const { t } = useTranslation("common");

    const defaultValues = useMemo(
        () => ({
            email: "",
        }),
        [],
    );

    const formSchema = useMemo(() => {
        return yup
            .object()
            .shape({
                email: yup
                    .string()
                    .required(t("enterEmail"))
                    .email(t("validEmail"))
                    .trim(t("validEmail")),
            })
            .required()
            .strict(true);
    }, [t]);

    const methods = useForm({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
        setValue,
    } = methods;

    const navigateUser = (roles) => {
        const roleRouteMap = {
            [USER_ROLES.HUB_MANAGER]: PATH_DASHBOARD.hubManager.dashboard,
            [USER_ROLES.SUPPLIER]: PATH_DASHBOARD.supplier.dashboard,
            [USER_ROLES.RIDER]: RIDER_AFTER_LOGIN,
        };
        const route = roleRouteMap[roles];
        if (route) {
            router.push(route);
        }
    };

    const handleError = (error) => {
        toast.error(TOAST_ALERTS.ERROR_MESSAGE);
        console.error("Error", error);
        setIsLoading(false);
    };
    const onSubmitForm = async (formData) => {
        const { email } = formData;
        setIsLoading(true);
        const objParam = {
            email: email,
        };
        try {
            const { payload: res } = await dispatch(loginAction(objParam));
            console.log(res);
            const { data, status, message } = res;
            if (status) {
                authMagicLink(data.message);
            } else {
                setIsLoading(false);
                toast.error(message);
            }
        } catch (error) {
            handleError(error);
            setIsLoading(false);
        }
    };

    const authMagicLink = async (key) => {
        // setIsLoading(true);
        const objParam = {
            link: key,
        };
        try {
            const { payload: res } = await dispatch(authLinkAction(objParam));
            const { data, status, message } = res;
            if (status) {
                setIsLoading(true);
                const { payload: res1 } = await dispatch(getUserAction());
                navigateUser(res1?.data?.roles);
            } else {
                toast.error(message);
            }
        } catch (error) {
            handleError(error);
        }
        //  finally {
        //     setIsLoading(false);
        // }
    };

    useEffect(() => {
        tmpFunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tmpFunc = async () => {
        setIsLoading(true);
        const tokenData = getData("token");
        if (tokenData?.access_token) {
            const { payload: res } = await dispatch(getUserAction());
            navigateUser(res?.data?.roles);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <LoginMain>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="login-main">
                    <div className="login-main-inner">
                        <h1>{t("Login")}</h1>
                        <FormProvider
                            methods={methods}
                            onSubmit={handleSubmit(onSubmitForm)}
                            className="mt-[20px] mb-[40px]"
                        >
                            <div className="form-login">
                                <div className="form-group">
                                    <RHFTextInput
                                        name="email"
                                        placeholder={t("EmailAddress")}
                                    />
                                </div>
                                <div className="btn-form">
                                    <button className="btn button-common">
                                        {t("Login")}
                                    </button>
                                </div>
                                {/* <div className="last-link">
                  <p>
                    {t("DontHaveAccount")}{" "}
                    <Link href="/register">{t("SignUp")}</Link>
                  </p>
                </div> */}
                            </div>
                        </FormProvider>
                    </div>
                </div>
            )}
        </LoginMain>
    );
};

export default LoginPage;
