// // src/app/company/page.tsx

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import companyApi, { Company } from '@/lib/api/companyApi';
// import { useAuth } from '@/context/AuthProvider';

// export default function CompanyList() {
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push('/user/login');
//     }
//   }, [user, authLoading, router]);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const data = await companyApi.getAllCompanies();
//         setCompanies(data);
//       } catch (error: unknown) {
//         console.error('Error fetching companies:', error);
//         setError('Failed to fetch companies');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchCompanies();
//     }
//   }, [user]);

//   if (authLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center">{error}</div>;

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Companies</h1>
//         <Link
//           href="/company/register"
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Register New Company
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {companies.map((company) => (
//           <Link
//             href={`/company/${company.id}`}
//             key={company.id}
//             className="border p-6 rounded-lg hover:shadow-lg transition-shadow bg-white"
//           >
//             <h2 className="text-xl font-bold mb-2">{company.name}</h2>
//             <div className="space-y-2 text-sm text-gray-600">
//               <p><span className="font-semibold">Owner:</span> {company.owner}</p>
//               <p><span className="font-semibold">Type:</span> {company.company_type}</p>
//               {company.employee_range && (
//                 <p><span className="font-semibold">Size:</span> {company.employee_range} employees</p>
//               )}
//               {company.since && (
//                 <p><span className="font-semibold">Since:</span> {new Date(company.since).toLocaleDateString()}</p>
//               )}
//               {company.description && (
//                 <p className="text-gray-500 line-clamp-2">{company.description}</p>
//               )}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import companyApi, { Company } from '@/lib/api/companyApi';
import { useAuth } from '@/context/AuthProvider';

// interface Company {
//   id: string;
//   name: string;
//   owner: string;
//   company_type: string;
//   employee_range?: string;
//   since?: string;
//   description?: string;
//   created_at: string;
//   updated_at: string;
// }

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Company[];
}

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/user/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data: PaginatedResponse = await companyApi.getAllCompanies();
        // Extract the results array from the paginated response
        setCompanies(data.results || []);
      } catch (error: unknown) {
        console.error('Error fetching companies:', error);
        setError('Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCompanies();
    }
  }, [user]);

  if (authLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Link
          href="/company/register"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Register New Company
        </Link>
      </div>

      {error && <div className="text-red-500 text-center mb-6">{error}</div>}
      
      {!companies.length && !error ? (
        <div className="text-center text-gray-600">No companies found. Register your first company!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company: Company) => (
            <Link
              href={`/company/${company.id}`}
              key={company.id}
              className="border p-6 rounded-lg hover:shadow-lg transition-shadow bg-white"
            >
              <h2 className="text-xl font-bold mb-2">{company.name}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-semibold">Owner:</span> {company.owner}</p>
                <p><span className="font-semibold">Type:</span> {company.company_type}</p>
                {company.employee_range && (
                  <p><span className="font-semibold">Size:</span> {company.employee_range} employees</p>
                )}
                {company.since && (
                  <p><span className="font-semibold">Since:</span> {new Date(company.since).toLocaleDateString()}</p>
                )}
                {company.description && (
                  <p className="text-gray-500 line-clamp-2">{company.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}