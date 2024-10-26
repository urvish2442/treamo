"use client";
import React, { useEffect } from "react";
import CommonPageBLockHub from "@/components/styles/supplier.style";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { DeleteBinSvgIcon } from "@/assets/svgs";
import { StorageOptions, UnitOptions } from "@/constants/keywords";
import Loader from "@/components/Loader";
import { useAddProduct } from "@/hooks/useFetchHooks";

const AddProductPage = () => {
    const { t } = useTranslation("common");
    const {
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
    } = useAddProduct();

    return (
        <>
            {isSubmitting ? (
                <Loader />
            ) : (
                <CommonPageBLockHub>
                    <div className="common-block-hub">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="product-edit-block">
                                <div className="product-edit-block-inner">
                                    <div className="product-edit-block-inner-border">
                                        <div className="top-block-edit">
                                            <div className="top-block-edit-inner">
                                                <h3>
                                                    <img src="/notifiaction-block.svg" />
                                                    <span>
                                                        {t("ProductName")}
                                                    </span>
                                                </h3>
                                                <input
                                                    type="text"
                                                    {...register("title")}
                                                    placeholder={t(
                                                        "EnterProductName",
                                                    )}
                                                />
                                                {errors.title && (
                                                    <p>
                                                        {errors.title.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="top-block-edit-inner-block">
                                                <h3>
                                                    <span>{t("Price")}</span>
                                                </h3>
                                                <div className="input-chf">
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            "price_supplier",
                                                        )}
                                                        placeholder="00.00"
                                                    />
                                                    {errors.price_supplier && (
                                                        <p>
                                                            {
                                                                errors
                                                                    .price_supplier
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                    <span>CHF</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bottom-edit-block">
                                            <h3>
                                                <img src="/notifiaction-block.svg" />
                                                <span>
                                                    {t(
                                                        "SalePriceAccordingToPartnerAgreement",
                                                    )}
                                                </span>
                                            </h3>
                                            <div className="two-block">
                                                <div className="input-block">
                                                    <label>
                                                        {t("Quantity")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            "quantity",
                                                        )}
                                                        placeholder="1"
                                                    />
                                                    {errors.quantity && (
                                                        <p>
                                                            {
                                                                errors.quantity
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="select-form-block">
                                                    <label>{t("Unit")}</label>
                                                    <Controller
                                                        control={control}
                                                        name="unit"
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={
                                                                    UnitOptions
                                                                }
                                                                classNamePrefix="react-select"
                                                                className="select-block-fetishes"
                                                                value={
                                                                    UnitOptions
                                                                        ? UnitOptions.find(
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
                                                        )}
                                                    />
                                                    {errors.unit && (
                                                        <p>
                                                            {
                                                                errors.unit
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-edit-block-inner-border">
                                        <div className="top-block-edit top-block-edit-inner">
                                            <h2>
                                                <img src="/notifiaction-block.svg" />
                                                <span>
                                                    {t("ProductInformation")}
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="edit-block-input">
                                            <div className="textarea-block">
                                                <textarea
                                                    {...register("description")}
                                                    placeholder={t(
                                                        "Description",
                                                    )}
                                                />
                                                {errors.description && (
                                                    <p>
                                                        {
                                                            errors.description
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="border-label-title-block">
                                                <div className="top-block-edit-title">
                                                    <div className="title-label-block">
                                                        <h3>
                                                            <img src="/notifiaction-block.svg" />
                                                            <span>
                                                                {t(
                                                                    "Ingredients",
                                                                )}
                                                            </span>
                                                        </h3>
                                                        <h3>
                                                            {t("Share")} (%)
                                                        </h3>
                                                    </div>
                                                    {ingredientFields.map(
                                                        (field, index) => (
                                                            <div
                                                                className="input-remove-block"
                                                                key={field.id}
                                                            >
                                                                <div className="input-remove-block-form">
                                                                    <input
                                                                        type="text"
                                                                        {...register(
                                                                            `ingredients.${index}.name`,
                                                                        )}
                                                                        placeholder={t(
                                                                            "EnterIngredientsName",
                                                                        )}
                                                                    />
                                                                    {errors
                                                                        .ingredients?.[
                                                                        index
                                                                    ]?.name && (
                                                                        <p>
                                                                            {
                                                                                errors
                                                                                    .ingredients[
                                                                                    index
                                                                                ]
                                                                                    .name
                                                                                    .message
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="input-remove-block-form">
                                                                    <input
                                                                        type="text"
                                                                        {...register(
                                                                            `ingredients.${index}.value`,
                                                                        )}
                                                                        placeholder={`${t("Share")} (%)`}
                                                                    />
                                                                    {errors
                                                                        .ingredients?.[
                                                                        index
                                                                    ]
                                                                        ?.value && (
                                                                        <p>
                                                                            {
                                                                                errors
                                                                                    .ingredients[
                                                                                    index
                                                                                ]
                                                                                    .value
                                                                                    .message
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="remove-block-delete">
                                                                    <span
                                                                        onClick={() =>
                                                                            removeIngredient(
                                                                                index,
                                                                            )
                                                                        }
                                                                    >
                                                                        <DeleteBinSvgIcon />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                    {/* <div className='top-block-edit-inner'>
                        <h3>
                          <img src='/notifiaction-block.svg' />
                          <span>{t('Ingredients')}</span>
                        </h3>
                        <input type='text' placeholder={t('EnterIngredientsName')}></input>
                      </div>
                      <div className='top-block-edit-inner-block'>
                        <h3>
                          <span>{t('Share')} (%)</span>
                        </h3>
                        <div className='input-chf'>
                          <input type='text' placeholder='00.00'></input>
                        </div>
                      </div> */}
                                                </div>
                                                <div className="add-btn">
                                                    <button
                                                        class="btn-add"
                                                        type="button"
                                                        onClick={() =>
                                                            appendIngredient({
                                                                name: "",
                                                                value: "",
                                                            })
                                                        }
                                                    >
                                                        <img
                                                            alt="img"
                                                            src="/plus-icon.svg"
                                                        />
                                                        <span>{t("Add")}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="border-label-title-block bottom-block">
                                                <div className="top-block-edit-title">
                                                    <div className="title-label-block">
                                                        <h3>
                                                            <img src="/notifiaction-block.svg" />
                                                            <span>
                                                                {t("Allergens")}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    {allergenFields.map(
                                                        (field, index) => (
                                                            <div
                                                                className="input-remove-block"
                                                                key={field.id}
                                                            >
                                                                <div className="input-remove-block-form">
                                                                    <input
                                                                        type="text"
                                                                        {...register(
                                                                            `allergens.${index}`,
                                                                        )}
                                                                        placeholder={t(
                                                                            "EnterAllergen",
                                                                        )}
                                                                    />
                                                                    {errors
                                                                        .allergens?.[
                                                                        index
                                                                    ] && (
                                                                        <p>
                                                                            {
                                                                                errors
                                                                                    .allergens[
                                                                                    index
                                                                                ]
                                                                                    .message
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="remove-block-delete">
                                                                    <span
                                                                        type="button"
                                                                        onClick={() =>
                                                                            removeAllergen(
                                                                                index,
                                                                            )
                                                                        }
                                                                    >
                                                                        <DeleteBinSvgIcon />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                                <div className="add-btn">
                                                    <button
                                                        class="btn-add"
                                                        type="button"
                                                        onClick={() =>
                                                            appendAllergen("")
                                                        }
                                                    >
                                                        <img
                                                            alt="img"
                                                            src="/plus-icon.svg"
                                                        />
                                                        <span>{t("Add")}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="edit-block-table">
                                            <div className="edit-block-table-inner">
                                                <div className="edit-block-table-inner-top">
                                                    <h3>
                                                        {t("NutritionalValues")}
                                                    </h3>
                                                    <div className="edit-block-table-inner-title">
                                                        <h5>
                                                            {t(
                                                                "NutritionalValueName",
                                                            )}
                                                        </h5>
                                                        <h5>Pro 100g</h5>
                                                    </div>
                                                </div>
                                                <div className="edit-block-table-inner-title-main">
                                                    {[
                                                        {
                                                            name: "joules",
                                                            label: "Kilo Joule",
                                                        },
                                                        {
                                                            name: "calories",
                                                            label: "Calories",
                                                        },
                                                        {
                                                            name: "fat",
                                                            label: "Fat",
                                                        },
                                                        {
                                                            name: "saturated_fat",
                                                            label: "Saturated Fat",
                                                        },
                                                        {
                                                            name: "carbohydrates",
                                                            label: "Carbohydrates",
                                                        },
                                                        {
                                                            name: "sugar",
                                                            label: "Sugar",
                                                        },
                                                        {
                                                            name: "protein",
                                                            label: "Protein",
                                                        },
                                                        {
                                                            name: "salt",
                                                            label: "Salt",
                                                        },
                                                    ].map((nutrient) => (
                                                        <div
                                                            key={nutrient.name}
                                                            className="edit-block-table-inner-title-data"
                                                        >
                                                            <div className="edit-block-table-td">
                                                                <div className="edit-block-table-td-inner">
                                                                    <p>
                                                                        {t(
                                                                            `${nutrient.name}`,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="edit-block-table-td">
                                                                <div className="edit-block-table-td-inner">
                                                                    <Controller
                                                                        name={`nutrition.${nutrient.name}`}
                                                                        control={
                                                                            control
                                                                        }
                                                                        render={({
                                                                            field,
                                                                        }) => (
                                                                            <input
                                                                                type="number"
                                                                                step="0.001"
                                                                                {...field}
                                                                                placeholder={t(
                                                                                    "EnterValue",
                                                                                )}
                                                                            />
                                                                        )}
                                                                    />
                                                                    {errors.nutrition &&
                                                                        errors
                                                                            .nutrition[
                                                                            nutrient
                                                                                .name
                                                                        ] && (
                                                                            <p>
                                                                                {
                                                                                    errors
                                                                                        .nutrition[
                                                                                        nutrient
                                                                                            .name
                                                                                    ]
                                                                                        .message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-edit-block-inner-left">
                                    <div className="product-edit-block-inner-left-inner">
                                        <div className="product-edit-input">
                                            <label>{t("Storage")}</label>
                                            <Controller
                                                name="storage_type"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={StorageOptions}
                                                        classNamePrefix="react-select"
                                                        className="select-block-fetishes"
                                                        placeholder={t(
                                                            "SelectStorageType",
                                                        )}
                                                        value={
                                                            StorageOptions
                                                                ? StorageOptions.find(
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
                                                )}
                                            />
                                            {errors.storage_type && (
                                                <p>
                                                    {
                                                        errors.storage_type
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="product-edit-input">
                                            <label>{t("MaxDailyAmount")}</label>
                                            <input
                                                type="text"
                                                {...register(
                                                    "max_daily_quantity",
                                                )}
                                                placeholder={t("Unlimited")}
                                            />
                                            {errors.max_daily_quantity && (
                                                <p>
                                                    {
                                                        errors
                                                            .max_daily_quantity
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="two-block-group">
                                            <div className="two-block-group-left">
                                                <label>{t("Category")}</label>
                                                <Controller
                                                    control={control}
                                                    name="category_id"
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={
                                                                categoryListOptions
                                                            }
                                                            classNamePrefix="react-select"
                                                            className="select-block-fetishes"
                                                            value={
                                                                categoryListOptions
                                                                    ? categoryListOptions.find(
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
                                                            isDisabled={true}
                                                        />
                                                    )}
                                                />
                                                {errors.category_id && (
                                                    <p>
                                                        {
                                                            errors.category_id
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="two-block-group-left">
                                                <label>
                                                    {t("Subcategory")}
                                                </label>
                                                <Controller
                                                    control={control}
                                                    name="subcategory_id"
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={
                                                                subCategoryListOptions
                                                            }
                                                            classNamePrefix="react-select"
                                                            className="select-block-fetishes"
                                                            value={
                                                                subCategoryListOptions
                                                                    ? subCategoryListOptions.find(
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
                                                            isDisabled={true}
                                                        />
                                                    )}
                                                />
                                                {errors.subcategory_id && (
                                                    <p>
                                                        {
                                                            errors
                                                                .subcategory_id
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="checkbox-custom">
                                            <div className="form-group">
                                                <input
                                                    type="checkbox"
                                                    id="rider"
                                                    {...register("is_organic")}
                                                />
                                                <label for="rider">
                                                    {t("OrganicProduct")}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="checkbox-custom-four">
                                            <div className="product-edit-input">
                                                <label>{t("Width")} (mm)</label>
                                                <input
                                                    type="text"
                                                    {...register("width")}
                                                    placeholder="0"
                                                />
                                                {errors.width && (
                                                    <p>
                                                        {errors.width.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="product-edit-input">
                                                <label>
                                                    {t("Height")} (mm)
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("height")}
                                                    placeholder="0"
                                                />
                                                {errors.height && (
                                                    <p>
                                                        {errors.height.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="product-edit-input">
                                                <label>{t("Depth")} (mm)</label>
                                                <input
                                                    type="text"
                                                    {...register("depth")}
                                                    placeholder="0"
                                                />
                                                {errors.depth && (
                                                    <p>
                                                        {errors.depth.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="product-edit-input">
                                                <label>{t("Weight")} (g)</label>
                                                <input
                                                    type="text"
                                                    {...register("weight")}
                                                    placeholder="0"
                                                />
                                                {errors.weight && (
                                                    <p>
                                                        {errors.weight.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="two-block-group">
                                            <div className="two-block-group-left">
                                                <label>
                                                    {t("AvailableFrom")}
                                                </label>
                                                <input
                                                    type="date"
                                                    placeholder="16/07/2024"
                                                    {...register(
                                                        "ts_available_start",
                                                    )}
                                                    // defaultValue={
                                                    //     productDetail?.ts_available_start
                                                    //         ? new Date(
                                                    //               productDetail.ts_available_start
                                                    //           )
                                                    //               .toISOString()
                                                    //               .substring(
                                                    //                   0,
                                                    //                   10
                                                    //               )
                                                    //         : ""
                                                    // }
                                                />
                                                {errors.ts_available_start && (
                                                    <p>
                                                        {
                                                            errors
                                                                .ts_available_start
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="two-block-group-left">
                                                <label>
                                                    {t("AvailableUntil")}
                                                </label>
                                                <input
                                                    type="date"
                                                    placeholder={t(
                                                        "Indefinite",
                                                    )}
                                                    {...register(
                                                        "ts_available_end",
                                                    )}
                                                />
                                                {errors.ts_available_end && (
                                                    <p>
                                                        {
                                                            errors
                                                                .ts_available_end
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    type="submit"
                                    className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded"
                                >
                                    {t("AddProduct")}
                                </button>
                            </div>
                        </form>
                    </div>
                </CommonPageBLockHub>
            )}
        </>
    );
};

export default AddProductPage;
