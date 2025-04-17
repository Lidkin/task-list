import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import StartScreen from './StartScreen';

const ScreenContent = () => {
  const [openList, setOpenList] = useState(false);

  return (
    <View className={styles.container}>
      <Pressable className="flex-row items-center" onPress={() => setOpenList((prev) => !prev)}>
        <Text className={styles.title}>{openList ? 'Close' : 'Open'} Tasks List</Text>
      </Pressable>
      <View className={styles.separator} />
      <StartScreen openList={openList} />
    </View>
  );
};

export default ScreenContent;

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-3xl font-bold text-white`,
};
