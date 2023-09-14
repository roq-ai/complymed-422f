import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface ProgressInterface {
  id?: string;
  task_completed: number;
  task_total: number;
  client_id: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface ProgressGetQueryInterface extends GetQueryInterface {
  id?: string;
  client_id?: string;
}
