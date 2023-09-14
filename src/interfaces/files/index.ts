export interface CreateFileAssociationInterface {
  entity: string;
  entityId: string;
  fileId: string;
  oldFileId?: string;
}

export interface GetFilesQuery {
  limit?: number;
  offset?: number;
  entity?: string;
  entityId?: string;
}
