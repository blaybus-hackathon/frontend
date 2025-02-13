import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Navigation() {
    const location = useLocation()
    const [theme, setTheme] = useState("light")
    const [menuOpen, setMenuOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        // 초기 테마 설정
        const savedTheme = localStorage.getItem("theme") || "light"
        setTheme(savedTheme)
        document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }, []);

    if (!isClient) {
        return null;
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const toggleDarkMode = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-16 px-8 bg-gray-800 dark:bg-gray-900">
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
                    응애
                </Link>
            </div>

            <button
                className="block text-white md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <nav
                className={`absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-gray-800 dark:bg-gray-900 md:flex md:items-center ${menuOpen ? 'block' : 'hidden'}`}
            >
                <ul className="flex flex-col md:flex-row md:space-x-3">
                    <li>
                        <Link
                            to="/live"
                            className={`block px-4 py-2 text-white hover:bg-gray-700 rounded ${location.pathname === '/live' ? 'bg-gray-700' : ''}`}
                        >
                            라이브 테마관
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about-us"
                            className={`block px-4 py-2 text-white hover:bg-gray-700 rounded ${location.pathname === '/about-us' ? 'bg-gray-700' : ''}`}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={toggleDarkMode}
                            className="bg-gray-200 rounded-full dark:bg-gray-700 transform translate-y-[2px]"
                            aria-label="Toggle dark mode"
                        >
                            {theme === "dark" ? (
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.8061 20C26.8061 23.7589 23.7589 26.8061 20 26.8061C16.2411 26.8061 13.1938 23.7589 13.1938 20C13.1938 16.2411 16.2411 13.1938 20 13.1938C23.7589 13.1938 26.8061 16.2411 26.8061 20Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M31.5 20L30.2679 20M8.5 20L9.73214 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M28.1318 28.1319L27.2606 27.2606M11.8684 11.8684L12.7396 12.7397" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M20 31.5L20 30.2679M20 8.5L20 9.73214" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M11.8682 28.1317L12.7394 27.2605M28.1316 11.8683L27.2604 12.7395" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10.5C18.7402 11.7598 18.0325 13.4684 18.0325 15.25C18.0325 17.0316 18.7402 18.7402 20 20C21.2598 21.2598 22.9684 21.9675 24.75 21.9675C26.5316 21.9675 28.2402 21.2598 29.5 20C29.5 21.8789 28.9428 23.7156 27.899 25.2779C26.8551 26.8402 25.3714 28.0578 23.6355 28.7769C21.8996 29.4959 19.9895 29.684 18.1466 29.3175C16.3038 28.9509 14.6111 28.0461 13.2825 26.7175C11.9539 25.3889 11.0491 23.6962 10.6825 21.8534C10.316 20.0105 10.5041 18.1004 11.2231 16.3645C11.9422 14.6286 13.1598 13.1449 14.7221 12.101C16.2844 11.0572 18.1211 10.5 20 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
} 