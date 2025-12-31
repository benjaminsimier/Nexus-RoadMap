export enum Status {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  RELEASED = 'RELEASED',
  BACKLOG = 'BACKLOG'
}

export enum Category {
  CORE = 'Core Platform',
  INTEGRATION = 'Integrations',
  UIUX = 'UI/UX',
  SECURITY = 'Security',
  ANALYTICS = 'Analytics'
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  category: Category;
  date?: string; // Target date or release date
  tags: string[];
  progress: number; // 0 to 100
}

export const StatusConfig: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  [Status.BACKLOG]: { 
    label: 'Backlog', 
    color: 'text-slate-600', 
    bg: 'bg-slate-100',
    dot: 'bg-slate-400'
  },
  [Status.PLANNED]: { 
    label: 'Planned', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50',
    dot: 'bg-blue-500'
  },
  [Status.IN_PROGRESS]: { 
    label: 'In Progress', 
    color: 'text-amber-600', 
    bg: 'bg-amber-50',
    dot: 'bg-amber-500'
  },
  [Status.RELEASED]: { 
    label: 'Released', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50',
    dot: 'bg-emerald-500'
  }
};