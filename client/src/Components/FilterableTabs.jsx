import React, { useState, useEffect } from 'react';

function FilterableTabs({ onFilter }) {
    const tabs = ['ALL', 'LIPPAN ART', 'WALL HANGING', 'CANVAS', 'BOOKMARKS', 'DIGITAL'];
    const [selectedTab, setSelectedTab] = useState('ALL');

    useEffect(() => {
        onFilter(selectedTab);
    }, [selectedTab, onFilter]);

    return (
        <div className='flex w-full flex-wrap items-center justify-center gap-4 mb-6'>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-3 py-2 lg:(px-6 py-2) rounded-sm font-semibold transition duration-150 hover:bg-activeTab hover:text-white ${selectedTab === tab ? 'bg-activeTab text-white' : 'bg-navbar text-black'}`}
                    onClick={() => setSelectedTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default FilterableTabs;