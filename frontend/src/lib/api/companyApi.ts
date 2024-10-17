// // src/lib/api/companyApi.ts
// import apiClient from './apiClient';

// interface Company {
//   id: string;
//   name: string;
//   owner: string;
//   company_type: string;
//   description?: string | null;
//   since?: string | null;
//   employee_range?: string | null;
// }

// interface CompanyFormData {
//   name: string;
//   owner: string;
//   company_type: string;
//   description?: string;
//   since?: string;
//   employee_range?: string;
// }

// const companyApi = {
//   getAllCompanies: async (): Promise<Company[]> => {
//     const response = await apiClient.get('/company/list/');
//     return response.data;
//   },

//   getCompanyById: async (id: string): Promise<Company> => {
//     const response = await apiClient.get(`/company/get/${id}/`);
//     return response.data;
//   },

//   createCompany: async (data: CompanyFormData): Promise<Company> => {
//     const response = await apiClient.post('/company/create/', data);
//     return response.data;
//   },
// };

// export type { Company, CompanyFormData };
// export default companyApi;



import apiClient from './apiClient';

interface Company {
  id: string;
  name: string;
  owner: string;
  company_type: string;
  description?: string | null;
  since?: string | null;
  employee_range?: string | null;
  created_at: string;
  updated_at: string;
}

interface CompanyFormData {
  name: string;
  owner: string;
  company_type: string;
  description?: string;
  since?: string;
  employee_range?: string;
}

const companyApi = {
  getAllCompanies: async (): Promise<Company[]> => {
    const response = await apiClient.get('/company/list/');
    return response.data;
  },

  getCompanyById: async (id: string): Promise<Company> => {
    const response = await apiClient.get(`/company/${id}/`);
    return response.data;
  },

  createCompany: async (data: CompanyFormData): Promise<Company> => {
    const response = await apiClient.post('/company/create/', data);
    return response.data;
  },

  updateCompany: async (id: string, data: Partial<CompanyFormData>): Promise<Company> => {
    const response = await apiClient.put(`/company/${id}/`, data);
    return response.data;
  },

  deleteCompany: async (id: string): Promise<void> => {
    await apiClient.delete(`/company/${id}/`);
  },
};

export type { Company, CompanyFormData };
export default companyApi;
