import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className='bg-background w-full py-1 flex items-center justify-center font-inter text-[0.7rem] text-activeTab'>
            COPYRIGHT &copy; {year} | ART CORE
        </div>
    )
}

export default Footer