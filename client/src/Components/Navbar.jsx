import React, { useContext, useState, useEffect, useRef } from "react";
import logo from '../assets/logo.png';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Navbar() {
    const { isAdmin } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    const openNavbar = () => {
        setIsOpen(true);
    };


    const closeNavbar = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                closeNavbar();
            }
        };

        // Closes the sidebar when a click outside the sidebar is detected
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <div>
                {!isOpen ?
                    <Bars3Icon className="fixed border-2 border-activeTab left-5 top-4 lg:top-5 lg:left-5 z-[60] h-11 w-11 lg:h-12 lg:w-12 p-3 font-bold text-black rounded-full bg-navbar transition duration-150 hover:bg-activeTab hover:text-white cursor-pointer" onClick={openNavbar} />
                    :
                    <XMarkIcon className="fixed left-5 top-4 lg:left-5 lg:top-5 z-[60] h-11 w-11 lg:h-12 lg:w-12 p-3 font-bold text-black rounded-full bg-navbar transition duration-150 hover:bg-activeTab hover:text-white cursor-pointer" onClick={closeNavbar} />
                }
            </div>


            {/* Navbar */}
            <div ref={ref} className={`select-none fixed flex flex-col items-center justify-around h-full w-[16rem] left-0 bottom-0 bg-navbar z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center flex-col justify-center gap-5">
                    <div className="overflow-hidden flex items-center justify-center w-32 h-32 rounded-full">
                        <img src={logo} alt="Logo" className="w-32 h-32 flex items-center justify-center rounded-full" />
                    </div>
                    <div className="flex flex-col items-center justify-center font-bold">
                        <p>ARUNDHATI BERA</p>
                        <p>(ARTIST)</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center font-semibold gap-7">
                    <p>
                        <NavLink to='/' className={({ isActive }) => isActive ? "bg-activeTab text-white p-2 rounded-sm" : "transition duration-150 ease-in-out hover:text-hoverTabs"}>
                            HOME
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to='/about' className={({ isActive }) => isActive ? "bg-activeTab text-white p-2 rounded-sm" : "transition duration-150 ease-in-out hover:text-hoverTabs"}>
                            ABOUT
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to='/artworks' className={({ isActive }) => isActive ? "bg-activeTab text-white p-2 rounded-sm" : "transition duration-150 ease-in-out hover:text-hoverTabs"}>
                            ARTWORKS
                        </NavLink>
                    </p>
                    {isAdmin && (
                        <p>
                            <NavLink to='/add-artworks' className={({ isActive }) => isActive ? "bg-activeTab text-white p-2 rounded-sm" : "transition duration-150 ease-in-out hover:text-hoverTabs"}>
                                ADD ARTWORKS
                            </NavLink>
                        </p>
                    )}
                    {!isAdmin && (
                        <p>
                            <NavLink to='/contact' className={({ isActive }) => isActive ? "bg-activeTab text-white p-2 rounded-sm" : "transition duration-150 ease-in-out hover:text-hoverTabs"}>
                                CONTACT ME
                            </NavLink>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Navbar;