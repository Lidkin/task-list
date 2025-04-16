import React, { useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';

import ActiveTasks from './ActiveTasks';
import CompletedTask from './CompletedTasks';
import TaskForm from './TaskForm';
import { Task } from '../types/types';

type TasksListProps = {
  setOpenList: (value: boolean) => void;
};

const TasksList: React.FC<TasksListProps> = ({ setOpenList }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { title: 'Some task', deadline: '22/05/2025', priority: 'medium', completed: false, id: 1 },
    { title: 'Some second task', deadline: '25/05/2025', priority: 'low', completed: true, id: 2 },
    { title: 'Some 3-d task', deadline: '20/05/2025', priority: 'high', completed: false, id: 3 },
  ]);

  const [openSection, setOpenSection] = useState<{ [key: string]: boolean }>({
    add: false,
    active: false,
    completed: false,
  });

  const handleToggle = (section: string) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <View className="w-screen items-center justify-start overflow-y-auto border border-red-800">
      <View className="mx-4 w-5/6 rounded border border-blue-400 bg-white px-4 py-4 shadow">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">New Task</Text>
          <Button title="x" onPress={() => handleToggle('add')} />
        </View>
        {openSection.add && <TaskForm addTask={addTask} />}
      </View>
      <View className="active-container m-4 w-5/6 rounded border border-blue-400 bg-white px-4 py-4 shadow">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Active</Text>
          <Button title="x" onPress={() => handleToggle('active')} />
        </View>

        {openSection.active && (
          <>
            <View className="flex-row gap-4">
              <Pressable className="items-start justify-center rounded-xl bg-blue-700">
                <Text className="px-2 py-1 text-xl text-white">By Date</Text>
              </Pressable>
              <Pressable className="items-center justify-center rounded-xl bg-blue-700">
                <Text className="px-2 py-1 text-xl text-white">By Priority</Text>
              </Pressable>
            </View>
            <View className="h-fit w-fit">
              <ActiveTasks activeTasks={activeTasks} />
            </View>
          </>
        )}
      </View>
      <View className="active-container m-4 w-5/6 rounded border border-blue-400 bg-white px-4 py-4 shadow">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Completed</Text>
          <Button title="x" onPress={() => handleToggle('completed')} />
        </View>
        <CompletedTask completedTasks={completedTasks} />
      </View>
    </View>
  );
};

export default TasksList;
