import axios from 'axios';
import { CreateFileAssociationInterface, GetFilesQuery } from 'interfaces/files';

export const createFileAssociation = async (fileAssociation: CreateFileAssociationInterface) => {
  const response = await axios.post('/api/file-associations', fileAssociation);
  return response.data;
};

export const deleteFileAssociation = async (fileId: string) => {
  const response = await axios.delete('/api/file-associations', { data: { fileId } });
  return response.data;
};

export const getFiles = async (query: GetFilesQuery) => {
  const response = await axios.get(`/api/files`, {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};
