import axios from 'axios';
import queryString from 'query-string';
import { AuditReportInterface, AuditReportGetQueryInterface } from 'interfaces/audit-report';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAuditReports = async (
  query?: AuditReportGetQueryInterface,
): Promise<PaginatedInterface<AuditReportInterface>> => {
  const response = await axios.get('/api/audit-reports', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAuditReport = async (auditReport: AuditReportInterface) => {
  const response = await axios.post('/api/audit-reports', auditReport);
  return response.data;
};

export const updateAuditReportById = async (id: string, auditReport: AuditReportInterface) => {
  const response = await axios.put(`/api/audit-reports/${id}`, auditReport);
  return response.data;
};

export const getAuditReportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/audit-reports/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAuditReportById = async (id: string) => {
  const response = await axios.delete(`/api/audit-reports/${id}`);
  return response.data;
};
