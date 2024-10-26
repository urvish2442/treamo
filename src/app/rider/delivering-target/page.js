/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
const ShiftCommisioning = () => {
    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <Link href={""}>
                            <img
                                alt="back-arrow"
                                src="/back-arrrow-header.svg"
                            />
                        </Link>
                        <div className="order-btn ml-2">
                            <p>Kundenname</p>
                        </div>
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="delevery-target">
                    <div className="delevery-target-top">
                        <h2>Produkte</h2>
                        <div className="delevery-target-product">
                            <div className="delevery-target-product-box">
                                <div className="delevery-target-img">
                                    <div className="delevery-target-img-inner">
                                        <img src="/cheeseball.png" />
                                    </div>
                                </div>
                                <div className="product-img-text">
                                    <div className="product-img-text-left">
                                        <h3>Käsebrötchen</h3>
                                        <p>12 pieces ( 500g )</p>
                                    </div>
                                    <div className="product-img-text-right">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="delevery-target-product-box">
                                <div className="delevery-target-img">
                                    <div className="delevery-target-img-inner">
                                        <img src="/cheeseball.png" />
                                    </div>
                                </div>
                                <div className="product-img-text">
                                    <div className="product-img-text-left">
                                        <h3>Käsebrötchen</h3>
                                        <p>12 pieces ( 500g )</p>
                                    </div>
                                    <div className="product-img-text-right">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="delevery-target-product-box">
                                <div className="delevery-target-img">
                                    <div className="delevery-target-img-inner">
                                        <img src="/cheeseball.png" />
                                    </div>
                                </div>
                                <div className="product-img-text">
                                    <div className="product-img-text-left">
                                        <h3>Käsebrötchen</h3>
                                        <p>12 pieces ( 500g )</p>
                                    </div>
                                    <div className="product-img-text-right">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="delevery-target-product-box">
                                <div className="delevery-target-img">
                                    <div className="delevery-target-img-inner">
                                        <img src="/cheeseball.png" />
                                    </div>
                                </div>
                                <div className="product-img-text">
                                    <div className="product-img-text-left">
                                        <h3>Käsebrötchen</h3>
                                        <p>12 pieces ( 500g )</p>
                                    </div>
                                    <div className="product-img-text-right">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="delevery-target-product-box">
                                <div className="delevery-target-img">
                                    <div className="delevery-target-img-inner">
                                        <img src="/cheeseball.png" />
                                    </div>
                                </div>
                                <div className="product-img-text">
                                    <div className="product-img-text-left">
                                        <h3>Käsebrötchen</h3>
                                        <p>12 pieces ( 500g )</p>
                                    </div>
                                    <div className="product-img-text-right">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="delevery-two-block">
                        <div className="delevery-two-block-flex">
                            <div className="delevery-two-block-border">
                                <h2> Anweisungen</h2>
                                <p>
                                    Please leave the package at my front door.
                                    If no one answers, kindly place it behind
                                    the potted plant to the left of the
                                    entrance. Thank you!&quot;
                                </p>
                            </div>
                        </div>
                        <div className="delevery-two-block-flex">
                            <div className="delevery-two-block-upload">
                                <div className="file-input ">
                                    <input
                                        type="file"
                                        name="file-input"
                                        className="file-input__input"
                                    />
                                    <label className="file-input__label">
                                        <img src="/upload-img-app.svg" />
                                        <p>Instruction Image</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-bar-target">
                        <div className="error-block">
                            <img src="/error-img.png" />
                            <span>Error</span>
                        </div>
                        <div className="btn-target">
                            <button>Abschließen</button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default ShiftCommisioning;
