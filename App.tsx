import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Keyboard, Image } from 'react-native';
import { Button, IconButton, Switch } from 'react-native-paper';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function TodoList() {
  const [dataTasks, setDataTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskId, setTaskId] = useState<number>(1);
  const [confirmedTasks, setConfirmedTasks] = useState<{ [key: number]: boolean }>({});
  const [darkMode, setDarkMode] = useState<boolean>(false); // Estado para o dark mode

  const createTask = () => {
    try {
      if ((task.length < 1) || (taskDescription.length < 1)) {
        alert('Preencha todos os campos');
        return; // Retorna sem adicionar uma nova tarefa
      }

      const newTask = {
        id: taskId,
        title: task,
        description: taskDescription,
      };

      setDataTasks(prevTasks => [...prevTasks, newTask]);
      setTask('');
      setTaskDescription('');
      setTaskId(prevId => prevId + 1);
      setConfirmedTasks(prevConfirmedTasks => ({ ...prevConfirmedTasks, [taskId]: false }));
      Keyboard.dismiss();
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const deleteTask = (taskId: number) => {
    setDataTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setConfirmedTasks(prevConfirmedTasks => {
      const updatedConfirmedTasks = { ...prevConfirmedTasks };
      delete updatedConfirmedTasks[taskId];
      return updatedConfirmedTasks;
    });
  };

  const confirmTask = (taskId: number) => {
    setConfirmedTasks(prevConfirmedTasks => ({
      ...prevConfirmedTasks,
      [taskId]: true,
    }));
  };

  const commonStyles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: darkMode ? '#121212' : '#fff',
    },
    container: {
      flex: 1,
      padding: 20,
      margin: 30,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: -20,
    },
    image: {
      width: 150,
      height: 150,
      margin: 0,
    },
    input: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: darkMode ? 'white' : 'black'
    },
    taskItem: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      flex: 1,
      flexDirection: 'row',
      marginTop: 12,
      borderLeftWidth: 20,
      elevation: 3,
      backgroundColor: darkMode ? '#121212' : '#fff',
    },
    taskCard: {
      flex: 1,
    },
    taskCardText: {
      color: darkMode ? 'white' : 'black'
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    delete: {
      padding: 0,
      margin: 0,
    },
    confirm: {
      padding: 0,
      margin: 0,
    },
    confirmedBackground: {
      borderColor: 'green',
    },
    confirmButton: {
      backgroundColor: 'green',
    },
    deleteButton: {
      backgroundColor: 'red',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });


  

  return (
    <View style={ commonStyles.body }>
      <View style={ commonStyles.container }>
        <Switch
          value={ darkMode }
          onValueChange={ () => setDarkMode(!darkMode) }
        />
        <View style={ commonStyles.imageContainer }>
          <Image
            source={ darkMode ? require('../taskzord/assets/logoTaskZord.png') : require('../taskzord/assets/taskzord.png') }
            style={ commonStyles.image }
            accessibilityLabel="Ícone da Magazord"
          />
        </View>
        <TextInput
          style={ commonStyles.input }
          placeholder="Tarefa"
          placeholderTextColor={ darkMode ? '#999' : '#ccc' }
          value={ task }
          onChangeText={ text => setTask(text) }
        />
        <TextInput
          style={ commonStyles.input }
          placeholder="Descrição"
          placeholderTextColor={ darkMode ? '#999' : '#ccc' }
          value={ taskDescription }
          onChangeText={ text => setTaskDescription(text) }
        />
        <Button onPress={ createTask } mode="contained">
          Adicionar
        </Button>

        <FlatList
          data={ dataTasks }
          keyExtractor={ item => item.id.toString() }
          renderItem={ ({ item }) => (
            <View
              style={ [
                commonStyles.taskItem,
                confirmedTasks[item.id] && commonStyles.confirmedBackground,
              ] }
            >
              <View style={ commonStyles.taskCard }>
                <Text style={ commonStyles.taskCardText }>{ item.title }</Text>
                <Text style={ commonStyles.taskCardText }>{ item.description }</Text>
              </View>
              <View style={ commonStyles.buttons }>
                <IconButton
                  style={ commonStyles.confirm }
                  icon="check-circle"
                  onPress={ () => confirmTask(item.id) }
                />
                <IconButton
                  style={ commonStyles.delete }
                  icon="delete"
                  onPress={ () => deleteTask(item.id) }
                />
              </View>
            </View>
          ) }
        />
      </View>
    </View>
  );
}
