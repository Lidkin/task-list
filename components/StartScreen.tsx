import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text, ScrollView } from 'react-native';

import TasksList from './TasksList';

export type Props = {
  openList: boolean;
  setOpenList: (value: boolean) => void;
};

const StartScreen: React.FC<Props> = ({ openList, setOpenList }) => {
  return (
    <View className="h-full w-full border border-green-800" style={styles.container}>
      {!openList ? (
        <View style={styles.listContainer} className="border border-orange-500">
          <Pressable
            className="rounded-xl border border-blue-700 bg-blue-400"
            onPress={() => setOpenList(true)}>
            <Text style={styles.button}>Open List</Text>
          </Pressable>
        </View>
      ) : (
        <TasksList setOpenList={setOpenList} />
      )}
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
  button: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 16,
    color: '#ffffff',
  },
});

export default StartScreen;
