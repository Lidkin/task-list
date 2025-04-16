import { useState } from 'react';
import { Text, View, SafeAreaView, Button } from 'react-native';

import StartScreen from './StartScreen';

const ScreenContent = () => {
  const [openList, setOpenList] = useState(false);

  return (
    <>
      <SafeAreaView className={styles.safeContainer}>
        <View className={styles.container}>
          <View className="flex-row items-center">
            <Text className={styles.title}>Tasks List</Text>
            {openList && <Button title="x" onPress={() => setOpenList(false)} />}
          </View>
          <View className={styles.separator} />
          <StartScreen openList={openList} setOpenList={setOpenList} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScreenContent;

const styles = {
  safeContainer: 'flex flex-1 m-6',
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-2xl font-bold text-blue-500`,
};
