import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className='absolute bottom-1 pl-52 flex items-center justify-center font-inter text-sm text-activeTab'>
            COPYRIGHT &copy; {year} | ART CORE
        </div>
  )
}

export default Footer