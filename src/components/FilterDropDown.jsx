import React from 'react';
import '../style.css'

function FilterDropdown({ filter, setFilter }) {
    return (
        <div className='tasks-filter'>
            <h1>Tasks</h1>
            <div className="filter-dropdown">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option className='option-hover' value="all">All</option>
                    <option className='option-hover' value="done">Done</option>
                    <option className='option-hover' value="undone">Undone</option>
                </select>
            </div>
        </div>
    );
}

export default FilterDropdown;
