import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { tv } from 'tailwind-variants';

import TaskForm from './TaskForm';
import TasksList from './TasksList';
import { Task, useTaskContext } from '../context/TaskContext';

const TasksView = () => {
  const { tasks, setTasks } = useTaskContext();

  const pressable = tv({
    base: 'm-4 w-5/6 rounded border border-blue-400 bg-white px-4 py-4 shadow',
    variants: {
      section: {
        close: '',
        add: 'border-sky-400 shadow shadow-sky-800',
        active: 'border-cyan-400 bg-cyan-50 shadow shadow-cyan-800',
        completed: 'border-teal-400 bg-teal-50 shadow shadow-teal-800',
      },
    },
  });

  const [openSection, setOpenSection] = useState<{ [key: string]: boolean }>({
    add: false,
    active: false,
    completed: false,
  });

  const handleToggle = (section: string) => {
    setOpenSection({ add: false, active: false, completed: false, [section]: true });
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <View className="h-fit w-screen items-center justify-between">
      <View className={pressable({ section: `${openSection.add ? 'add' : 'close'}` })}>
        <Pressable onPress={() => handleToggle('add')}>
          <Text className="text-2xl font-bold">New Task</Text>
        </Pressable>
        {openSection.add && <TaskForm addTask={addTask} />}
      </View>

      <View className={pressable({ section: `${openSection.active ? 'active' : 'close'}` })}>
        <Pressable onPress={() => handleToggle('active')}>
          <Text className="text-2xl font-bold">Active</Text>
        </Pressable>

        {openSection.active && (
          <View className="h-fit">
            <TasksList tasksList={activeTasks} showButton />
          </View>
        )}
      </View>

      <View className={pressable({ section: `${openSection.completed ? 'completed' : 'close'}` })}>
        <Pressable onPress={() => handleToggle('completed')}>
          <Text className="text-2xl font-bold">Completed</Text>
        </Pressable>

        {openSection.completed && (
          <View className="h-fit w-fit">
            <>
              <TasksList tasksList={completedTasks} showButton={false} />
            </>
          </View>
        )}
      </View>
    </View>
  );
};

export default TasksView;
