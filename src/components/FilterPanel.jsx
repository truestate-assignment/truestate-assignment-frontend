import React, { useState } from 'react';
import { ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Dropdown pill with chevron
const PillDropdown = ({ label, name, value = [], options = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (opt) => {
    const next = value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt];
    onChange(name, next);
  };

  const hasSelection = value.length > 0;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-white border rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition-all duration-200 ${hasSelection ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
      >
        <span className={hasSelection ? 'text-primary-700 font-medium' : 'text-gray-700'}>
          {label}
          {hasSelection && ` (${value.length})`}
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${hasSelection ? 'text-primary-600' : 'text-gray-500'
          }`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20 min-w-[180px]">
            {options.map(opt => (
              <label key={opt} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer text-sm transition-colors">
                <input
                  type="checkbox"
                  checked={value.includes(opt)}
                  onChange={() => toggle(opt)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Age Range Dropdown
const AgeRangeDropdown = ({ value = { min: 18, max: 65 }, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleApply = () => {
    onChange('ageRange', localValue);
    setIsOpen(false);
  };

  const hasSelection = value.min !== 18 || value.max !== 65;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-white border rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition-all duration-200 ${hasSelection ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
      >
        <span className={hasSelection ? 'text-primary-700 font-medium' : 'text-gray-700'}>
          Age Range {hasSelection && `(${value.min}-${value.max})`}
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${hasSelection ? 'text-primary-600' : 'text-gray-500'
          }`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 w-64">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 font-medium">Min Age: {localValue.min}</label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={localValue.min}
                  onChange={(e) => setLocalValue({ ...localValue, min: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Max Age: {localValue.max}</label>
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={localValue.max}
                  onChange={(e) => setLocalValue({ ...localValue, max: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              <button
                onClick={handleApply}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Date Range Dropdown
const DateRangeDropdown = ({ value = { start: '', end: '' }, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleApply = () => {
    onChange('dateRange', localValue);
    setIsOpen(false);
  };

  const hasSelection = value.start || value.end;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-white border rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition-all duration-200 ${hasSelection ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
      >
        <span className={hasSelection ? 'text-primary-700 font-medium' : 'text-gray-700'}>
          Date {hasSelection && `(${value.start} - ${value.end})`}
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${hasSelection ? 'text-primary-600' : 'text-gray-500'
          }`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 w-72 max-w-[90vw] sm:max-w-xs">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 font-medium">Start Date</label>
                <input
                  type="date"
                  value={localValue.start}
                  onChange={(e) => setLocalValue({ ...localValue, start: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">End Date</label>
                <input
                  type="date"
                  value={localValue.end}
                  onChange={(e) => setLocalValue({ ...localValue, end: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button
                onClick={handleApply}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Sort Dropdown
const SortDropdown = ({ value = 'name-asc', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'name-asc', label: 'Customer Name (A-Z)' },
    { value: 'name-desc', label: 'Customer Name (Z-A)' },
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'amount-desc', label: 'Amount (High to Low)' },
    { value: 'amount-asc', label: 'Amount (Low to High)' },
  ];

  const selectedLabel = sortOptions.find(opt => opt.value === value)?.label || 'Sort by';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-50 transition-all duration-200"
      >
        <span className="text-gray-700">Sort by: {selectedLabel}</span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20 min-w-[220px]">
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange('sort', opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${value === opt.value
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const FilterPanel = ({ filters, setFilters }) => {
  const onChange = (name, val) => setFilters({ ...filters, [name]: val });

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return value.min !== 18 || value.max !== 65;
    return false;
  });

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {/* Reset Icon */}
        <button
          onClick={() => setFilters({})}
          className={`p-2 rounded-full transition-all duration-200 ${hasActiveFilters
            ? 'text-primary-600 hover:bg-primary-50'
            : 'text-gray-400 hover:bg-gray-100'
            }`}
          title="Reset Filters"
        >
          <ArrowPathIcon className="w-5 h-5" />
        </button>

        <PillDropdown
          label="Customer Region"
          name="region"
          value={filters.region || []}
          options={["North", "South", "East", "West", "Central"]}
          onChange={onChange}
        />

        <PillDropdown
          label="Gender"
          name="gender"
          value={filters.gender || []}
          options={["Male", "Female"]}
          onChange={onChange}
        />

        <AgeRangeDropdown
          value={filters.ageRange || { min: 18, max: 65 }}
          onChange={onChange}
        />

        <PillDropdown
          label="Product Category"
          name="category"
          value={filters.category || []}
          options={["Clothing", "Electronics", "Home", "Beauty"]}
          onChange={onChange}
        />

        <PillDropdown
          label="Tags"
          name="tags"
          value={filters.tags || []}
          options={["New", "Sale", "Popular"]}
          onChange={onChange}
        />

        <PillDropdown
          label="Payment Method"
          name="paymentMethod"
          value={filters.paymentMethod || []}
          options={["Card", "UPI", "Cash"]}
          onChange={onChange}
        />

        {/* Date - placeholder for now */}
        <DateRangeDropdown
          value={filters.dateRange || { start: '', end: '' }}
          onChange={onChange}
        />

        <SortDropdown
          value={filters.sort || 'name-asc'}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
