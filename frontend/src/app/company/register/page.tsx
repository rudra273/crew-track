
// // src/app/company/register/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import companyApi, { CompanyFormData } from '@/lib/api/companyApi';

// export default function RegisterCompany() {
//   const router = useRouter();
//   const [formData, setFormData] = useState<CompanyFormData>({
//     name: '',
//     owner: '',
//     company_type: '',
//     description: '',
//     since: '',
//     employee_range: '',
//   });
//   const [error, setError] = useState('');

//   const employeeRanges = [
//     "1-10",
//     "11-50",
//     "51-200",
//     "201-500",
//     "501-1000",
//     "1000+"
//   ];

//   const companyTypes = [
//     "Corporation",
//     "LLC",
//     "Partnership",
//     "Sole Proprietorship",
//     "Non-Profit",
//     "Other"
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await companyApi.createCompany(formData);
//       router.push('/company');
//     } catch (error: unknown) {
//       console.error('Error creating company:', error);
//       setError('Failed to create company');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8">Register New Company</h1>
      
//       {error && <div className="text-red-500 mb-4">{error}</div>}
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium mb-2">
//             Company Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="owner" className="block text-sm font-medium mb-2">
//             Owner Name
//           </label>
//           <input
//             type="text"
//             id="owner"
//             name="owner"
//             value={formData.owner}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="company_type" className="block text-sm font-medium mb-2">
//             Company Type
//           </label>
//           <select
//             id="company_type"
//             name="company_type"
//             value={formData.company_type}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select company type</option>
//             {companyTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium mb-2">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             rows={4}
//           />
//         </div>

//         <div>
//           <label htmlFor="since" className="block text-sm font-medium mb-2">
//             Founded Date
//           </label>
//           <input
//             type="date"
//             id="since"
//             name="since"
//             value={formData.since}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label htmlFor="employee_range" className="block text-sm font-medium mb-2">
//             Number of Employees
//           </label>
//           <select
//             id="employee_range"
//             name="employee_range"
//             value={formData.employee_range}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select employee range</option>
//             {employeeRanges.map(range => (
//               <option key={range} value={range}>{range} employees</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Register Company
//           </button>
//           <button
//             type="button"
//             onClick={() => router.push('/company')}
//             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import companyApi, { CompanyFormData } from '@/lib/api/companyApi';

export default function RegisterCompany() {
  const router = useRouter();
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    owner: '',
    company_type: '',
    description: '',
    since: '',
    employee_range: '',
  });
  const [error, setError] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await companyApi.createCompany(formData);
      router.push('/company');
    } catch (error) {
      console.error('Error creating company:', error);
      setError('Failed to create company');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Register New Company</h1>
     
      {error && <div className="text-red-500 mb-4">{error}</div>}
     
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Company Name
          </label>
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
          <label htmlFor="owner" className="block text-sm font-medium mb-2">
            Owner Name
          </label>
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
          <label htmlFor="company_type" className="block text-sm font-medium mb-2">
            Company Type
          </label>
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
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
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
          <label htmlFor="since" className="block text-sm font-medium mb-2">
            Founded Date
          </label>
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
          <label htmlFor="employee_range" className="block text-sm font-medium mb-2">
            Number of Employees
          </label>
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
            Register Company
          </button>
          <button
            type="button"
            onClick={() => router.push('/company')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


