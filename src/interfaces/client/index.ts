import { AuditReportInterface } from 'interfaces/audit-report';
import { BusinessInterface } from 'interfaces/business';
import { ProgressInterface } from 'interfaces/progress';
import { TaskInterface } from 'interfaces/task';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  audit_report?: AuditReportInterface[];
  business?: BusinessInterface[];
  progress?: ProgressInterface[];
  task?: TaskInterface[];
  user?: UserInterface;
  _count?: {
    audit_report?: number;
    business?: number;
    progress?: number;
    task?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
