import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { Task } from '../context/TaskContext';

type FormProps = {
  addTask: (task: Task) => void;
};

const TaskForm: React.FC<FormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [deadline, setDeadline] = useState(new Date());
  const [error, setError] = useState('');

  const handlePress = () => {
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }

    setError('');
    addTask({ title: title.trim(), priority, deadline: deadline.toLocaleDateString() });
    setDeadline(new Date());
    setTitle('');
    setPriority('low');
  };

  return (
    <>
      <View className="mb-4 items-center justify-center">
        {error ? (
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        ) : (
          <Text style={{ marginBottom: 10 }} />
        )}
        <TextInput
          className="text-md flex w-[75%] items-start justify-center rounded-md border p-2 text-blue-950"
          clearTextOnFocus
          placeholder="Enter Task Title"
          value={title}
          onChangeText={setTitle}
          onChange={() => setError('')}
        />
      </View>
      <View className="items-center justify-center">
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={(evt, selectedDate) => setDeadline(selectedDate!)}
        />
      </View>
      <View className=" items-center justify-center">
        <Picker
          style={{ width: '75%', justifyContent: 'center' }}
          itemStyle={{
            color: `${priority === 'high' ? 'red' : priority === 'low' ? 'green' : '#F2A51A'}`,
            fontSize: 16,
            fontWeight: 'bold',
          }}
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}>
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Low" value="low" />
        </Picker>
      </View>
      <View className="items-center justify-center">
        <Pressable
          className="rounded-xl border border-blue-700 bg-blue-400 p-2"
          onPress={handlePress}>
          <Text className="text-2xl">Add Task</Text>
        </Pressable>
      </View>
    </>
  );
};

export default TaskForm;
