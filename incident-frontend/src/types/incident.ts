export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'New' | 'Investigating' | 'Resolved' | 'Closed';
export interface Incident {
  id: number;
  incidentNumber: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Investigating' | 'Resolved' | 'Closed';
  location?: string;
  createdAt: string;
  createdBy:string;
  dueDate?: string;
  assignedTo?: string;
  resolutionNotes?: string;
  isEscalated: boolean;
}

export interface PaginatedIncidents {
  incidents: Incident[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
