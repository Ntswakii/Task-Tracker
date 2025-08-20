import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const text = taskText.trim();
    if (!text) {
      Alert.alert('Empty task', 'Type something first');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.check}>{item.done ? '[x]' : '[ ]'}</Text>
      </TouchableOpacity>
      <Text style={[styles.text, item.done && styles.done]}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <View style={styles.row}>
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Enter task"
          style={styles.input}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  addButton: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginLeft: 6,
    borderRadius: 4,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  check: {
    marginRight: 8,
    fontSize: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  delete: {
    color: 'red',
    marginLeft: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
s