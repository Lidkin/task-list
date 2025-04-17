import React from 'react';
import { View } from 'react-native';

import { Task } from '../context/TaskContext';

type CompletedProps = {
  completedTasks: Task[];
};
const CompletedTasks: React.FC<CompletedProps> = ({ completedTasks }) => {
  return <View></View>;
};

export default CompletedTasks;
