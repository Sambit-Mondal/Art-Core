import React, { useState, useEffect } from 'react';

function FilterableTabs({ onFilter }) {
    const tabs = ['ALL', 'LIPPAN ART', 'WALL HANGING', 'CANVAS', 'BOOKMARKS'];
    const [selectedTab, setSelectedTab] = useState('ALL');

    useEffect(() => {
        onFilter(selectedTab);
    }, [selectedTab, onFilter]);

    return (
        <div className='flex gap-4 mb-6'>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-6 py-2 rounded-sm text-black font-semibold transition duration-150 hover:bg-activeTab hover:text-white ${selectedTab === tab ? 'bg-activeTab text-white' : 'bg-navbar'}`}
                    onClick={() => setSelectedTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default FilterableTabs;