import React, { useState } from 'react';
import { XMarkIcon, PencilSquareIcon, TrashIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { deleteTransaction } from '../services/api';
import ConfirmationModal from './ConfirmationModal';

const TransactionDetailSidebar = ({ transaction, isOpen, onClose, onEdit, onTransactionDeleted }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    if (!isOpen || !transaction) return null;

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTransaction(transaction._id);
            onTransactionDeleted();
            onClose();
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            alert('Failed to delete transaction');
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
        }
    };

    const handleInvoice = () => {
        window.print();
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-end print:hidden">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Sidebar */}
                <div className="relative w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto animate-in slide-in-from-right duration-300">

                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between p-4">
                        <h2 className="text-lg font-semibold text-gray-900">Transaction Details</h2>
                        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">

                        {/* Image Section */}
                        <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-gray-100">
                                {transaction.imageUrl ? (
                                    <img src={transaction.imageUrl} alt={transaction.customerName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-500 font-bold text-3xl">
                                        {transaction.customerName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900">{transaction.customerName}</h3>
                            <p className="text-sm text-gray-500">{transaction.customerId}</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${transaction.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                                transaction.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                {transaction.orderStatus || 'Completed'}
                            </span>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-xs mb-1">Phone Number</p>
                                <p className="font-medium text-gray-900">{transaction.phoneNumber}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-xs mb-1">Date</p>
                                <p className="font-medium text-gray-900">{new Date(transaction.date).toLocaleDateString()}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-xs mb-1">Product</p>
                                <p className="font-medium text-gray-900">{transaction.productName}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-xs mb-1">Amount</p>
                                <p className="font-medium text-gray-900">{transaction.currency === 'USD' ? '$' : transaction.currency === 'EUR' ? '€' : transaction.currency === 'GBP' ? '£' : '₹'}{transaction.totalAmount?.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Order Information</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Product ID:</span>
                                        <span className="text-gray-900">{transaction.productId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Quantity:</span>
                                        <span className="text-gray-900">{transaction.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Region:</span>
                                        <span className="text-gray-900">{transaction.region || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-3 gap-3 pt-4">
                            <button
                                onClick={() => onEdit(transaction)}
                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600 group"
                            >
                                <PencilSquareIcon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium">Edit</span>
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                disabled={isDeleting}
                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-600 group disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <div className="w-6 h-6 mb-1 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <TrashIcon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                )}
                                <span className="text-xs font-medium">Delete</span>
                            </button>
                            <button
                                onClick={handleInvoice}
                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600 group"
                            >
                                <PrinterIcon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium">Invoice</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Transaction"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmText={isDeleting ? "Deleting..." : "Delete"}
                isDangerous={true}
            />
        </>
    );
};

export default TransactionDetailSidebar;
