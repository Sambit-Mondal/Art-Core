import React from "react";
import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div className="fixed flex flex-col items-center justify-around h-full w-1/5 left-0 bottom-0 bg-navbar">
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

                <p><NavLink to='/' className={({isActive}) => {
                    return isActive ? "bg-activeTab text-white p-2 rounded" : ""
                }}>HOME</NavLink></p>

                <p><NavLink to='/about' className={({isActive}) => {
                    return isActive ? "bg-activeTab text-white p-2 rounded" : ""
                }}>ABOUT</NavLink></p>

                <p><NavLink to='/artworks' className={({isActive}) => {
                    return isActive ? "bg-activeTab text-white p-2 rounded" : ""
                }}>ARTWORKS</NavLink></p>
                
                <p><NavLink to='/contact' className={({isActive}) => {
                    return isActive ? "bg-activeTab text-white p-2 rounded" : ""
                }}>CONTACT ME</NavLink></p>
            </div>
        </div>
    );
}

export default Navbar;