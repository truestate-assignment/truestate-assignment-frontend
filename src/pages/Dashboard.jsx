import React, { useState, useEffect } from 'react';
import StatsCards from '../components/StatsCards';
import { fetchStats } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUnits: 0, totalAmount: 0, totalDiscount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <StatsCards stats={stats} loading={loading} />
            <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">More dashboard widgets coming soon...</p>
            </div>
        </div>
    );
};

export default Dashboard;
