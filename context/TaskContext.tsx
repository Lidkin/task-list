import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useState, createContext, useContext, useEffect } from 'react';

export type Task = {
  title: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  completed?: boolean;
  id?: number;
};

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type Props = {
  children: ReactNode;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
};

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const saveTasks = async (tasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    } catch (e) {
      console.error('Error Saving tasks: ', e);
    }
  };

  const loadTasks = async (): Promise<Task[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error loading tasks:', e);
      return [];
    }
  };

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};
