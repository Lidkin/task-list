import { Task } from 'context/TaskContext';
import React, { useState } from 'react';
import { FlatList, useWindowDimensions, View, Pressable, Text } from 'react-native';

import TaskCard from './TaskCard';

type TasksProps = {
  tasksList: Task[];
  showButton: boolean;
};

const TasksList: React.FC<TasksProps> = ({ tasksList, showButton }) => {
  const { height } = useWindowDimensions();
  const [sortType, setSortType] = useState(''); // priority
  const [sortDirection, setSortDirection] = useState('asc'); //desc

  const sortTasks = (type: string) => {
    setSortType(type);
    if (type === 'date') {
      tasksList.sort((a, b) =>
        sortDirection === 'asc'
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      );
    } else {
      const prioritys = ['low', 'medium', 'high'];
      tasksList.sort((a, b) =>
        sortDirection === 'asc'
          ? prioritys.indexOf(a.priority) - prioritys.indexOf(b.priority)
          : prioritys.indexOf(b.priority) - prioritys.indexOf(a.priority)
      );
    }
  };

  return (
    <View className="h-fit" style={{ height: (height * 4) / 9 }}>
      {showButton && (
        <>
          <View className="flex-row gap-4 pt-2">
            <Pressable
              className="items-start justify-center rounded-xl bg-blue-700"
              onPress={() => sortTasks('date')}
              onPressOut={() =>
                setSortDirection((prev) => (prev = prev === 'asc' ? 'desc' : 'asc'))
              }>
              <Text className="px-2 py-1 text-xl text-white">
                By Date {`${sortType === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}`}
              </Text>
            </Pressable>
            <Pressable
              className="items-center justify-center rounded-xl bg-blue-700"
              onPress={() => sortTasks('priority')}
              onPressOut={() =>
                setSortDirection((prev) => (prev = prev === 'asc' ? 'desc' : 'asc'))
              }>
              <Text className="px-2 py-1 text-xl text-white">
                By Priority{' '}
                {`${sortType === 'priority' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}`}
              </Text>
            </Pressable>
          </View>
        </>
      )}
      <FlatList
        data={tasksList}
        renderItem={({ item }) => <TaskCard task={item} showButton={showButton} />}
        keyExtractor={(item) => item.id?.toString()!}
      />
    </View>
  );
};

export default TasksList;
