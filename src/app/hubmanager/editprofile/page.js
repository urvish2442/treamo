"use client";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import Select from "react-select";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { Controller } from "react-hook-form";
import { useUpdateHubManager } from "@/hooks/useFetchHooks";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD } from "@/routes/paths";

const EditProfile = () => {
    const router = useRouter();
    const {
        isLoading,
        methods,
        options,
        control,
        errors,
        handleSubmit,
        onSubmitForm,
    } = useUpdateHubManager();
    const { t } = useTranslation("common");

    return (
        <>
            <CommonPageBLockHub>
                <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="mt-[20px] mb-[40px]"
                >
                    <div className="">
                        <Header>
                            <div className="header-left">
                                <div className="logo-header padding-diff-block">
                                    <Link
                                        href={
                                            PATH_DASHBOARD.hubManager.dashboard
                                        }
                                        className="back-arrow"
                                    >
                                        <img
                                            alt="arrow"
                                            src="/back-arrrow-header.svg"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="header-right">
                                <div className="header-right-btn">
                                    <button type="submit" disabled={isLoading}>
                                        {t("save_changes")}
                                    </button>
                                </div>
                            </div>
                        </Header>
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="common-block-hub">
                            <div className="edit-profile-block">
                                <div className="edit-profile-block-three">
                                    <div className="edit-profile-block-three-block">
                                        <div className="edit-profile-block-three-block-inner">
                                            <div className="top-edit-profile-block">
                                                <img
                                                    alt="img"
                                                    src="/edit-profile-icon.svg"
                                                />
                                                <h3>{t("person")}</h3>
                                            </div>
                                            <div className="form-block-inner">
                                                <div className="form-block-inner-block">
                                                    <div className="form-block-inner-block-input">
                                                        <div className="input-box">
                                                            <label>
                                                                {t("firstname")}
                                                            </label>
                                                            <RHFTextInput
                                                                name="firstname"
                                                                placeholder={t(
                                                                    "firstname",
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-block-inner-block-input">
                                                        <div className="input-box">
                                                            <label>
                                                                {t("lastname")}
                                                            </label>
                                                            <RHFTextInput
                                                                name="lastname"
                                                                placeholder={t(
                                                                    "lastname",
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="select-form-block">
                                                    <Controller
                                                        control={control}
                                                        name="gender"
                                                        render={({ field }) => (
                                                            <>
                                                                <Select
                                                                    name="gender"
                                                                    options={
                                                                        options
                                                                    }
                                                                    classNamePrefix="react-select"
                                                                    className="select-block-fetishes"
                                                                    value={
                                                                        options
                                                                            ? options.find(
                                                                                  (
                                                                                      option,
                                                                                  ) =>
                                                                                      option.value ===
                                                                                      field.value,
                                                                              )
                                                                            : ""
                                                                    }
                                                                    onChange={(
                                                                        selectedOption,
                                                                    ) =>
                                                                        field.onChange(
                                                                            selectedOption.value,
                                                                        )
                                                                    }
                                                                />
                                                                {errors.gender && (
                                                                    <p className="text-red-500">
                                                                        {
                                                                            errors
                                                                                .gender
                                                                                .message
                                                                        }
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="edit-profile-block-three-block">
                                        <div className="edit-profile-block-three-block-inner">
                                            <div className="top-edit-profile-block">
                                                <img
                                                    alt="img"
                                                    src="/edit-profile-icon-2.svg"
                                                />
                                                <h3>{t("address")}</h3>
                                            </div>
                                            <div className="form-block-inner">
                                                <div className="form-block-inner-block">
                                                    <div className="form-block-inner-block-flex">
                                                        <RHFTextInput
                                                            name="house"
                                                            placeholder={t(
                                                                "house",
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="form-block-inner-block-flex">
                                                        <RHFTextInput
                                                            name="locale"
                                                            placeholder={t(
                                                                "locale",
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-block-inner-block">
                                                    <div className="form-block-inner-block-flex">
                                                        <RHFTextInput
                                                            name="city"
                                                            placeholder={t(
                                                                "city",
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="form-block-inner-block-flex">
                                                        <RHFTextInput
                                                            name="state"
                                                            placeholder={t(
                                                                "state",
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="edit-profile-block-three-block">
                                        <div className="edit-profile-block-three-block-inner">
                                            <div className="top-edit-profile-block">
                                                <img
                                                    alt="img"
                                                    src="/edit-profile-icon-1.svg"
                                                />
                                                <h3>{t("payout")}</h3>
                                            </div>
                                            <div className="form-block-inner">
                                                <div className="form-block-inner-block width-full-block">
                                                    <div className="form-block-inner-block-input">
                                                        <div className="input-box">
                                                            <label>
                                                                {t(
                                                                    "payout_name",
                                                                )}
                                                            </label>
                                                            <RHFTextInput
                                                                name="payout_name"
                                                                placeholder={t(
                                                                    "payout_name",
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-block-inner-block width-full-block">
                                                    <div className="form-block-inner-block-input">
                                                        <div className="input-box">
                                                            <label>
                                                                {t(
                                                                    "payout_iban",
                                                                )}
                                                            </label>
                                                            <RHFTextInput
                                                                name="payout_iban"
                                                                placeholder={t(
                                                                    "payout_iban",
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </FormProvider>
            </CommonPageBLockHub>
        </>
    );
};

export default EditProfile;
