import React, { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { updateTransaction } from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/transactions';

const COUNTRY_CODES = [
    { code: '+91', country: 'IN' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+81', country: 'JP' },
];

const CURRENCIES = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
];

const AddTransactionModal = ({ isOpen, onClose, onTransactionAdded, initialData = null }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        productId: `PROD-${Math.floor(Math.random() * 10000)}`,
        productName: '',
        quantity: 1,
        totalAmount: '',
        date: new Date().toISOString().split('T')[0],
        imageUrl: '',
        countryCode: '+91',
        currency: 'INR'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            // Parse phone number to separate code and number if possible
            let phone = initialData.phoneNumber || '';
            let code = '+91';

            // Simple check for country code
            const foundCode = COUNTRY_CODES.find(c => phone.startsWith(c.code));
            if (foundCode) {
                code = foundCode.code;
                phone = phone.replace(code, '').trim();
            }

            setFormData({
                customerName: initialData.customerName || '',
                phoneNumber: phone,
                productId: initialData.productId || '',
                productName: initialData.productName || '',
                quantity: initialData.quantity || 1,
                totalAmount: initialData.totalAmount || '',
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                imageUrl: initialData.imageUrl || '',
                countryCode: code,
                currency: initialData.currency || 'INR'
            });
        } else {
            // Reset for new transaction
            setFormData({
                customerName: '',
                phoneNumber: '',
                productId: `PROD-${Math.floor(Math.random() * 10000)}`,
                productName: '',
                quantity: 1,
                totalAmount: '',
                date: new Date().toISOString().split('T')[0],
                imageUrl: '',
                countryCode: '+91',
                currency: 'INR'
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone number validation: only numbers
        if (name === 'phoneNumber') {
            if (!/^\d*$/.test(value)) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                phoneNumber: `${formData.countryCode} ${formData.phoneNumber}`,
                finalAmount: formData.totalAmount,
                orderStatus: 'Pending'
            };

            if (initialData) {
                await updateTransaction(initialData._id, payload);
            } else {
                // Add defaults for new
                payload.customerId = `CUST-${Math.floor(Math.random() * 10000)}`;
                await axios.post(API_URL, payload);
            }

            onTransactionAdded();
            onClose();
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Failed to save transaction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">{initialData ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">

                    {/* Image Upload */}
                    <div className="flex justify-center">
                        <div className="relative group cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed transition-colors ${formData.imageUrl ? 'border-primary-500' : 'border-gray-300 group-hover:border-primary-400'}`}>
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <PhotoIcon className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-500">Upload Photo</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
                            <input required name="customerName" value={formData.customerName} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="John Doe" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex gap-2">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                                >
                                    {COUNTRY_CODES.map(c => (
                                        <option key={c.code} value={c.code}>{c.code} ({c.country})</option>
                                    ))}
                                </select>
                                <input
                                    required
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    maxLength={10}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="1234567890"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                                <input required name="productName" value={formData.productName} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Widget X" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Amount</label>
                                <div className="flex gap-2">
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-20 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <input
                                        required
                                        type="number"
                                        name="totalAmount"
                                        value={formData.totalAmount}
                                        onChange={handleChange}
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (initialData ? 'Update Transaction' : 'Create Transaction')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
