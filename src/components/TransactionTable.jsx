import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

const formatCurrency = (amount, currency = 'INR') => {
  if (amount == null) return '—';
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${symbol} ${new Intl.NumberFormat('en-IN').format(amount)}`;
};

const TransactionTable = ({ transactions, loading, onRowClick }) => {
  const [copiedPhone, setCopiedPhone] = useState(null);

  const handleCopyPhone = (e, phone) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">No records found.</p>
        <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction ID</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer ID</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer name</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Category</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Amount</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer region</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product ID</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee name</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t, index) => (
            <tr
              key={t._id || `${t.customerId}-${t.productId}-${t.date}-${index}`}
              onClick={() => onRowClick && onRowClick(t)}
              className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
              <td className="py-3 px-4 text-sm text-gray-600">{t.transactionId || t._id?.slice(-6) || '—'}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.date ? new Date(t.date).toLocaleDateString('en-GB') : '—'}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.customerId}</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">{t.customerName}</td>
              <td className="py-3 px-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>{t.phoneNumber}</span>
                  <button
                    onClick={(e) => handleCopyPhone(e, t.phoneNumber)}
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    title="Copy phone number"
                  >
                    {copiedPhone === t.phoneNumber ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.gender}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.age ?? '—'}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.category}</td>
              <td className="py-3 px-4 text-sm text-gray-600 text-center">{t.quantity || '—'}</td>
              <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{formatCurrency(t.totalAmount, t.currency)}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.region}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.productId}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{t.employeeName || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;