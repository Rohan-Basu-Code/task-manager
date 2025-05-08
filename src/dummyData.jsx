export const dummyData = [
  {
    id: 'proj1',
    name: 'Build Portfolio Website',
    category: 'work',
    tasks: [
      {
        id: 'task1',
        title: 'Design layout',
        dueDate: '2025-05-09T12:00:00Z',
        status: 'todo',
        priority: 'high',
      },
      {
        id: 'task2',
        title: 'Code homepage',
        dueDate: '2025-05-10T14:00:00Z',
        status: 'in-progress',
        priority: 'medium',
      },
    ],
  },
  {
    id: 'proj2',
    name: 'Write Travel Blog',
    category: 'personal',
    tasks: [
      {
        id: 'task3',
        title: 'Sort photos',
        dueDate: '2025-05-08T18:00:00Z', // due soon → should be urgent
        status: 'todo',
        priority: 'high',
      },
      {
        id: 'task4',
        title: 'Draft post',
        dueDate: '2025-05-12T10:00:00Z',
        status: 'todo',
        priority: 'low',
      },
    ],
  },
  {
    id: 'proj3',
    name: 'Sketch New Comic',
    category: 'hobby',
    tasks: [
      {
        id: 'task5',
        title: 'Character design',
        dueDate: '2025-05-15T20:00:00Z',
        status: 'done',
        priority: 'medium',
      },
      {
        id: 'task6',
        title: 'First panel draft',
        dueDate: '2025-05-08T23:00:00Z', // due today → urgent
        status: 'todo',
        priority: 'high',
      },
    ],
  },
];