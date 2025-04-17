import { useTaskContext, Task } from 'context/TaskContext';
import { View, Text, Pressable } from 'react-native';
import { tv } from 'tailwind-variants';

type CardProps = {
  task: Task;
  showButton: boolean;
};

const TaskCard: React.FC<CardProps> = ({ task, showButton }) => {
  const { setTasks } = useTaskContext();

  const taskCardVar = tv({
    base: 'mx-1 my-4 justify-between rounded-xl border bg-white p-2',
    variants: {
      color: {
        high: 'border-red-400 bg-red-200 shadow-red-100',
        low: 'border-green-400 bg-green-200 shadow-green-100',
        medium: 'border-yellow-400 bg-yellow-200 shadow-yellow-100',
      },
    },
  });

  const button = tv({
    base: 'm-1 items-center justify-center rounded-xl p-1',
    variants: {
      color: {
        delete: 'bg-red-600',
        complete: 'bg-green-600',
      },
    },
  });

  const handlePress = (id: number, name: string) => {
    setTasks((prev) => {
      if (name === 'complete') {
        return prev.map((task) => (task.id === id ? { ...task, completed: true } : task));
      } else if (name === 'delete') {
        return prev.filter((task) => task.id !== id);
      }
      return prev;
    });
  };

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
          {showButton && (
            <Pressable
              className={button({ color: 'complete' })}
              onPress={() => handlePress(task.id!, 'complete')}>
              <Text className=" text-md px-1 font-bold text-white">Complete</Text>
            </Pressable>
          )}
          <Pressable
            className={button({ color: 'delete' })}
            onPress={() => handlePress(task.id!, 'delete')}>
            <Text className=" text-md px-1 font-bold text-white">Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
