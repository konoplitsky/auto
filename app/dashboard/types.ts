export type UserRole = 'employee' | 'participant';

export type User = {
  id: string;
  login: number;
  password: string;
  role: UserRole;
};

export type Company = {
  id: string;
  inn: number;
  name?: string;
  createdAt: Date;
};

export type Snipment = {
  id: string;
  companyId: Company['id'];
  tons: string;
  mark1: string;
  mark2: string;
  date: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};
