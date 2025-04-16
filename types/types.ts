export type Task = {
  title: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  completed?: boolean;
  id?: number;
};
