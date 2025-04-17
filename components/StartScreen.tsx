import React from 'react';
import { StyleSheet, View } from 'react-native';

import TasksList from './TasksView';

export type Props = {
  openList: boolean;
};

const StartScreen: React.FC<Props> = ({ openList }) => {
  return (
    <View className="h-full w-full" style={styles.container}>
      {openList && <TasksList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default StartScreen;
