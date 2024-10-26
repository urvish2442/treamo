"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/supplier.style";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    authState,
    setCategorySubCategoryDetails,
    setProductDetails,
} from "@/redux/Auth/AuthSlice";
import { useProductsListForSupplier } from "@/hooks/useFetchHooks";
import { CategorySvgIcon } from "@/assets/svgs";
import { PATH_DASHBOARD } from "@/routes/paths";
import ComponentLoader from "@/components/Loader/ComponentLoader";
const ProductList = () => {
    const { hubData, categoryList } = useSelector(authState);
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSubCategory, setSelectedSubCategory] = useState(0);
    const { loading, categoriesWithProducts } = useProductsListForSupplier();

    const handleSelect = (index) => {
        setActiveIndex(index);
        setSelectedSubCategory(0);
    };

    const onEditProduct = (item) => {
        dispatch(setProductDetails(item));
        router.push(`${PATH_DASHBOARD.supplier.products.edit(item?.id)}`);
    };

    const handleAddProduct = () => {
        const payload = {
            category_id: categoryList[activeIndex]?.id,
            subcategory_id:
                categoryList[activeIndex]?.subcategories[selectedSubCategory]
                    ?.id,
        };
        dispatch(setCategorySubCategoryDetails(payload));
        router.push(`${PATH_DASHBOARD.supplier.products.add}`);
    };

    return (
        <>
            {/* {true ? (
                <ComponentLoader />
            ) : ( */}
            <CommonPageBLockHub>
                <div className="common-block-hub">
                    <div className="dasborad-main">
                        <div className="tabs-block">
                            <Tabs
                                selectedIndex={activeIndex}
                                onSelect={handleSelect}
                            >
                                <TabList>
                                    {categoryList?.length > 0 &&
                                        categoryList.map((item, index) => (
                                            <Tab key={index}>
                                                <div className="tabs-block-link">
                                                    <CategorySvgIcon />
                                                    <p>{item?.name || ""}</p>
                                                </div>
                                            </Tab>
                                        ))}
                                </TabList>

                                {categoryList?.length > 0 &&
                                    categoryList?.map((data, index) => (
                                        <TabPanel key={index}>
                                            <div className="tab-panel-block">
                                                <div className="tab-panel-block-inner ">
                                                    <div className="tab-button">
                                                        {categoryList[
                                                            activeIndex
                                                        ]?.subcategories
                                                            ?.length > 0 &&
                                                            categoryList[
                                                                activeIndex
                                                            ]?.subcategories?.map(
                                                                (
                                                                    data,
                                                                    index,
                                                                ) => (
                                                                    <button
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() =>
                                                                            setSelectedSubCategory(
                                                                                index,
                                                                            )
                                                                        }
                                                                        className={
                                                                            selectedSubCategory ===
                                                                            index
                                                                                ? "active-btn"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {
                                                                            data.name
                                                                        }
                                                                    </button>
                                                                ),
                                                            )}
                                                    </div>
                                                    <div className="tab-panel-custom">
                                                        {loading ? (
                                                            <div className="flex justify-center mt-10">
                                                                <ComponentLoader />
                                                            </div>
                                                        ) : (
                                                            <div className="tab-panel-data-block">
                                                                {/* TODO: add redirection to Add-Product page */}
                                                                <div
                                                                    className="tab-panel-data-block-main cursor-pointer"
                                                                    onClick={
                                                                        handleAddProduct
                                                                    }
                                                                >
                                                                    <div className="tab-panel-data-block-inner height-tab-panel">
                                                                        <div className="block-img-tab">
                                                                            <img
                                                                                alt=""
                                                                                src="/addcard.svg"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {categoriesWithProducts?.length >
                                                                    0 &&
                                                                    categoriesWithProducts[
                                                                        activeIndex
                                                                    ]?.subcategories[
                                                                        selectedSubCategory
                                                                    ]?.products?.map(
                                                                        (
                                                                            item,
                                                                            index,
                                                                        ) => (
                                                                            <div
                                                                                className="tab-panel-data-block-main"
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <div className="tab-panel-data-block-inner">
                                                                                    <div className="block-img-tab">
                                                                                        <img
                                                                                            alt=""
                                                                                            src={
                                                                                                item?.images &&
                                                                                                item
                                                                                                    .images
                                                                                                    .length >
                                                                                                    0
                                                                                                    ? item
                                                                                                          .images[0]
                                                                                                    : "/cheeseball.png"
                                                                                            }
                                                                                        />
                                                                                        <div className="plus-icon">
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    onEditProduct(
                                                                                                        item,
                                                                                                    )
                                                                                                }
                                                                                                style={{
                                                                                                    cursor: "pointer",
                                                                                                }}
                                                                                            >
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src="/edit-icon.svg"
                                                                                                />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="block-content">
                                                                                        <div className="block-content-left">
                                                                                            <h3>
                                                                                                {item?.price_supplier ||
                                                                                                    0}
                                                                                            </h3>
                                                                                            <h3>
                                                                                                CHF
                                                                                            </h3>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="bottom-content">
                                                                                        <h3>
                                                                                            {item?.title ||
                                                                                                ""}
                                                                                        </h3>
                                                                                        <p>
                                                                                            {
                                                                                                item?.quantity
                                                                                            }{" "}
                                                                                            {
                                                                                                item?.unit
                                                                                            }
                                                                                            {item?.weight
                                                                                                ? ` (${item?.weight}g)`
                                                                                                : ""}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    ))}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </CommonPageBLockHub>
            {/* )} */}
        </>
    );
};

export default ProductList;
