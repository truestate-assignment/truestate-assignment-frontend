import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const StatsCards = ({ transactions = [], stats: providedStats, loading = false }) => {
    let totalUnits, totalAmount, totalDiscount, totalSRs;

    if (providedStats) {
        totalUnits = providedStats.totalUnits;
        totalAmount = providedStats.totalAmount;
        totalDiscount = providedStats.totalDiscount;
        totalSRs = 0; // We might want to add this to the API if needed
    } else {
        // Fallback: Calculate from transactions (Note: this might be only for the current page)
        totalUnits = transactions.reduce((sum, t) => sum + (t.quantity || 0), 0);
        totalAmount = transactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0);
        totalSRs = transactions.length;
        totalDiscount = transactions.reduce((sum, t) => {
            const discount = (t.discount || t.totalAmount * 0.1) || 0;
            return sum + discount;
        }, 0);
    }

    const formatCurrency = (amount) => {
        return `₹${new Intl.NumberFormat('en-IN').format(Math.round(amount || 0))}`;
    };

    const statsData = [
        {
            label: 'Total units sold',
            value: loading ? '...' : totalUnits,
            subtext: null,
            tooltip: 'Total number of units sold'
        },
        {
            label: 'Total Amount',
            value: loading ? '...' : formatCurrency(totalAmount),
            subtext: loading ? '' : (providedStats ? '' : `(${totalSRs} SRs)`),
            tooltip: 'Total revenue'
        },
        {
            label: 'Total Discount',
            value: loading ? '...' : formatCurrency(totalDiscount),
            subtext: loading ? '' : (providedStats ? '' : `(${totalSRs} SRs)`),
            tooltip: 'Total discount given'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statsData.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                        <div className="group relative">
                            <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
                            {/* Tooltip */}
                            <div className="absolute right-0 top-6 w-48 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                                {stat.tooltip}
                                <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        {stat.subtext && (
                            <span className="text-sm text-gray-500 font-normal">{stat.subtext}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
