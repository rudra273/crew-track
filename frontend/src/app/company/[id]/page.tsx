// src/app/company/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import companyApi, { Company } from '@/lib/api/companyApi';

export default function CompanyDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await companyApi.getCompanyById(params.id);
        setCompany(data);
      } catch (error: unknown) {
        console.error('Error fetching company:', error);
        setError('Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [params.id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!company) return <div className="text-center">Company not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <button
          onClick={() => router.push('/company')}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to Companies
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">{company.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Company Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Owner:</span> {company.owner}</p>
                <p><span className="font-medium">Type:</span> {company.company_type}</p>
                {company.employee_range && (
                  <p><span className="font-medium">Size:</span> {company.employee_range} employees</p>
                )}
                {company.since && (
                  <p><span className="font-medium">Founded:</span> {new Date(company.since).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{company.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}