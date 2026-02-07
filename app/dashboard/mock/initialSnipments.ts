import type { Snipment } from '../types';

export const INITIAL_SNIPMENTS: Snipment[] = [
  {
    id: '1',
    companyId: '1',
    tons: '15.5',
    mark1: 'А',
    mark2: 'Б-70',
    date: new Date('2024-03-01'),
    createdBy: 'Иванов И.И.',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '2',
    companyId: '1',
    tons: '22.0',
    mark1: 'Б',
    mark2: 'В-60',
    date: new Date('2024-03-05'),
    createdBy: 'Петров П.П.',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: '3',
    companyId: '1',
    tons: '8.3',
    mark1: 'А',
    mark2: 'Б-70',
    date: new Date('2024-03-10'),
    createdBy: 'Сидоров С.С.',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: '4',
    companyId: '2',
    tons: '30.0',
    mark1: 'В',
    mark2: 'А-65',
    date: new Date('2024-03-02'),
    createdBy: 'Козлов К.К.',
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-02')
  },
  {
    id: '5',
    companyId: '2',
    tons: '12.7',
    mark1: 'Б',
    mark2: 'В-60',
    date: new Date('2024-03-08'),
    createdBy: 'Иванов И.И.',
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-03-08')
  }
];
