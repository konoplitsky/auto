import type { Company } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  { id: '1', inn: 1234567890, name: 'ООО Ромашка', createdAt: new Date('2024-01-15') },
  { id: '2', inn: 9876543210, name: 'АО Василёк', createdAt: new Date('2024-02-20') },
  { id: '3', inn: 5555555555, createdAt: new Date('2024-03-10') },
  { id: '4', inn: 1111111111, name: 'ИП Иванов', createdAt: new Date('2024-01-25') },
  { id: '5', inn: 2222222222, createdAt: new Date('2024-02-05') },
  { id: '6', inn: 3333333333, name: 'ООО Логистика', createdAt: new Date('2024-03-15') }
];
