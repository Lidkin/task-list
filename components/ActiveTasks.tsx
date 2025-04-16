import React from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { tv } from 'tailwind-variants';

import { Task } from '../types/types';

type ActiveProps = {
  activeTasks: Task[];
};

const ActiveTasks: React.FC<ActiveProps> = ({ activeTasks }) => {
  return (
    <FlatList
      data={activeTasks}
      renderItem={({ item }) => <TaskCard task={item} />}
      keyExtractor={(item) => item.id?.toString()!}
    />
  );
};

export default ActiveTasks;

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const taskCardVar = tv({
    base: 'border rounded-xl bg-white p-2 mx-1 my-4 justify-between',
    variants: {
      color: {
        high: 'bg-red-200 shadow-red-100 border-red-400',
        low: 'bg-green-200 shadow-green-100 border-green-400',
        medium: 'bg-yellow-200 shadow-yellow-100 border-yellow-400',
      },
    },
  });

  const button = tv({
    base: 'items-center justify-center rounded-xl p-1 m-1',
    variants: {
      color: {
        delete: 'bg-red-600',
        complete: 'bg-green-600',
      },
    },
  });

  return (
    <View className={taskCardVar({ color: `${task.priority}` })}>
      <View className="flex-row justify-between gap-1 ">
        <View className="basis-2/3 flex-col justify-around">
          <Text className="text-wrap text-3xl font-medium">{task.title}</Text>
          <Text>
            Due <Text className="text-lg font-semibold">{task.deadline}</Text>
          </Text>
          <Text>
            Priority <Text className="font-extrabold">{task.priority.toUpperCase()}</Text>
          </Text>
        </View>
        <View className="basis-1/3 flex-col justify-center">
          <Pressable className={button({ color: 'complete' })}>
            <Text className=" text-md px-1 font-bold text-white">Complete</Text>
          </Pressable>
          <Pressable className={button({ color: 'delete' })}>
            <Text className=" text-md px-1 font-bold text-white">Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
