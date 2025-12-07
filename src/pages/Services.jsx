import React, { useState } from 'react';
import StatsCards from '../components/StatsCards';
import FilterPanel from '../components/FilterPanel';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionDetailSidebar from '../components/TransactionDetailSidebar';
import useTransactions from '../hooks/useTransactions';
import { MagnifyingGlassIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

const Services = () => {
    const {
        transactions,
        loading,
        error,
        totalPages,
        currentPage,
        setCurrentPage,
        filters,
        updateFilter,
        resetFilters,
        refreshTransactions
    } = useTransactions();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleSearch = (e) => {
        updateFilter('search', e.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        updateFilter('search', '');
        setCurrentPage(1);
    };

    const handleEditTransaction = (transaction) => {
        setEditingTransaction(transaction);
        setSelectedTransaction(null);
        setIsAddModalOpen(true);
    };

    const handleModalClose = () => {
        setIsAddModalOpen(false);
        setEditingTransaction(null);
    };

    return (
        <div className="space-y-6">
            {/* Header for Services Page */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 flex-1 max-w-2xl">
                    <div className="relative w-full max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all outline-none"
                            value={filters.search || ''}
                            onChange={handleSearch}
                        />
                        {filters.search && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Transaction
                </button>
            </div>

            <StatsCards transactions={transactions} />
            <FilterPanel filters={filters} setFilters={updateFilter} resetFilters={resetFilters} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {error ? (
                    <div className="p-8 text-center text-red-500 bg-red-50">
                        <p className="font-medium">Error loading transactions</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                ) : (
                    <>
                        <TransactionTable
                            transactions={transactions}
                            loading={loading}
                            onRowClick={setSelectedTransaction}
                        />
                        {!loading && transactions.length > 0 && (
                            <div className="border-t border-gray-100 bg-gray-50/50 p-4">
                                <Pagination
                                    page={currentPage}
                                    totalPages={totalPages}
                                    setPage={setCurrentPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            <AddTransactionModal
                isOpen={isAddModalOpen}
                onClose={handleModalClose}
                onTransactionAdded={refreshTransactions}
                initialData={editingTransaction}
            />

            <TransactionDetailSidebar
                transaction={selectedTransaction}
                isOpen={!!selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
                onEdit={handleEditTransaction}
                onTransactionDeleted={refreshTransactions}
            />
        </div>
    );
};

export default Services;
