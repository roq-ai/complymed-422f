import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  title: string;
  description?: string;
  status: string;
  client_id: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  client_id?: string;
}
