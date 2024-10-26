"use client";
import { useState } from "react";

const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];
// components/Header.js

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            {/* Left Side: Logo and Location */}
            <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 p-2 rounded-md">
                    <img src="/logo.png" alt="Traemo" className="h-8" />
                </div>
                <button className="bg-yellow-400 text-white flex items-center px-4 py-2 rounded-full shadow-md hover:bg-yellow-500">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z"
                        />
                    </svg>
                    <span>Geben Sie Ihre Lieferadresse ein</span>
                    <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
                <button className="flex items-center px-4 py-2 bg-white border-2 border-gray-300 rounded-full shadow-sm hover:shadow-md">
                    <span className="text-gray-600">Abonnement</span>
                    <div className="ml-2">
                        <input
                            type="checkbox"
                            className="toggle-checkbox hidden"
                            id="toggleSubscription"
                        />
                        <label
                            htmlFor="toggleSubscription"
                            className="toggle-label block w-10 h-6 rounded-full bg-gray-300 cursor-pointer"
                        >
                            <span className="toggle-circle absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-0 duration-300 ease-in-out"></span>
                        </label>
                    </div>
                </button>
            </div>

            {/* Right Side: Cart and User Profile */}
            <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-white border-2 border-gray-300 rounded-full shadow-sm hover:shadow-md">
                    <svg
                        className="w-5 h-5 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13l-1.4 5.6A2 2 0 007.6 21h8.8a2 2 0 001.7-1l3-9H6.4"
                        />
                    </svg>
                    <span className="text-green-600 font-semibold">€23,65</span>
                    <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
                <button className="flex items-center px-4 py-2 bg-white border-2 border-gray-300 rounded-full shadow-sm hover:shadow-md">
                    <span className="text-gray-600">Anwar Raza</span>
                    <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}
