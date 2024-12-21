import React, { useState } from 'react';
import { FileText, Search, Plus, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export default function InsuranceClaims() {
  const [searchTerm, setSearchTerm] = useState('');

  // This will be replaced with actual data from the API
  const claims = [
    {
      id: 'CLM-001',
      date: '2024-03-15',
      amount: 450.00,
      status: 'pending',
      patient: {
        profiles: {
          first_name: 'James',
          last_name: 'Wilson'
        }
      },
      insurance: {
        provider: 'Blue Cross',
        policy_number: 'BC123456'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Insurance Claims</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            New Claim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Claims</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(45250.00)}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Claims</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(12500.00)}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approval Rate</p>
              <p className="text-2xl font-semibold text-gray-900">92.5%</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Claims</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {claims.map((claim) => (
            <div key={claim.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {claim.patient.profiles.first_name} {claim.patient.profiles.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {claim.insurance.provider} - {claim.insurance.policy_number}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(claim.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    {formatCurrency(claim.amount)}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {claim.status}
                  </span>
                  <div className="mt-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}