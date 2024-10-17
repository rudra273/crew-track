'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import companyApi, { Company, CompanyFormData } from '@/lib/api/companyApi';

export default function CompanyDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    owner: '',
    company_type: '',
    description: '',
    since: '',
    employee_range: '',
  });

  const employeeRanges = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+"
  ];

  const companyTypes = [
    "Corporation",
    "LLC",
    "Partnership",
    "Sole Proprietorship",
    "Non-Profit",
    "Other"
  ];

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await companyApi.getCompanyById(params.id);
        setCompany(data);
        setFormData({
          name: data.name,
          owner: data.owner,
          company_type: data.company_type,
          description: data.description || '',
          since: data.since || '',
          employee_range: data.employee_range || '',
        });
      } catch (error) {
        console.error('Error fetching company:', error);
        setError('Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedCompany = await companyApi.updateCompany(params.id, formData);
      setCompany(updatedCompany);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating company:', error);
      setError('Failed to update company');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyApi.deleteCompany(params.id);
        router.push('/company');
      } catch (error) {
        console.error('Error deleting company:', error);
        setError('Failed to delete company');
      }
    }
  };

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
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="owner" className="block text-sm font-medium mb-2">Owner Name</label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="company_type" className="block text-sm font-medium mb-2">Company Type</label>
              <select
                id="company_type"
                name="company_type"
                value={formData.company_type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select company type</option>
                {companyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="since" className="block text-sm font-medium mb-2">Founded Date</label>
              <input
                type="date"
                id="since"
                name="since"
                value={formData.since}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="employee_range" className="block text-sm font-medium mb-2">Number of Employees</label>
              <select
                id="employee_range"
                name="employee_range"
                value={formData.employee_range}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select employee range</option>
                {employeeRanges.map(range => (
                  <option key={range} value={range}>{range} employees</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
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

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Company
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete Company
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}