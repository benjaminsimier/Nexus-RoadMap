import { RoadmapItem, Status, Category } from '../types';

export const INITIAL_DATA: RoadmapItem[] = [
  {
    id: '1',
    title: 'Advanced Analytics Dashboard',
    description: 'Real-time insights into user behavior and system performance metrics.',
    status: Status.RELEASED,
    category: Category.ANALYTICS,
    date: '2023-10-15',
    tags: ['Data', 'Charts'],
    progress: 100
  },
  {
    id: '2',
    title: 'Mobile App Beta',
    description: 'First public beta release for iOS and Android devices.',
    status: Status.IN_PROGRESS,
    category: Category.CORE,
    date: 'Q4 2023',
    tags: ['Mobile', 'Beta'],
    progress: 75
  },
  {
    id: '3',
    title: 'Dark Mode Support',
    description: 'System-wide dark mode preference detection and toggle.',
    status: Status.IN_PROGRESS,
    category: Category.UIUX,
    date: 'Q4 2023',
    tags: ['Accessibility', 'Theme'],
    progress: 40
  },
  {
    id: '4',
    title: 'Slack Integration',
    description: 'Get notified about updates directly in your team Slack channel.',
    status: Status.PLANNED,
    category: Category.INTEGRATION,
    date: 'Q1 2024',
    tags: ['Productivity'],
    progress: 0
  },
  {
    id: '5',
    title: 'Two-Factor Authentication',
    description: 'Enhanced security with SMS and Authenticator app support.',
    status: Status.BACKLOG,
    category: Category.SECURITY,
    tags: ['Auth'],
    progress: 0
  },
  {
    id: '6',
    title: 'Custom API Webhooks',
    description: 'Allow users to subscribe to data events via webhooks.',
    status: Status.PLANNED,
    category: Category.CORE,
    date: 'Q1 2024',
    tags: ['API', 'DevTools'],
    progress: 15
  }
];