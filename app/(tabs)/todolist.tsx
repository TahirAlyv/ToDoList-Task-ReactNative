 
import { useState } from "react";
import { View,Text,StyleSheet, Button,Pressable, Alert, FlatList, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

 
type Task = {
  id: string;
  text: string;
  completed: boolean;
};
export default function ToDoList() {

    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([
      {
        id: '1',
        text: 'Complete project documentation',
        completed: false,
      },
      {
        id: '2',
        text: 'Review pull requests',
        completed: false,
      },
      {
        id: '3',
        text: 'Update project dependencies',
        completed: false,
      },
    ]);
 
 
     const handleSubmit = () => {
    if (task.trim()) {
 
      const newTask: Task = {
        id: Date.now().toString(),
        text: task.trim(),
        completed: false,
      };
      setTasks([newTask, ...tasks]);
      setTask('');
    } else {
      Alert.alert('Error', 'Please enter a task!');
    }
  };


  const toggleCompleted = (id: string) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

 const handleDelete= (id: String) => {
    setTasks(prev => prev.filter(task => task.id !== id));
 }
 
    return(
    <View style={styles.main}> 
     
        <Text style={styles.title}>To Do List</Text>


         <View style={styles.form}>
            <TextInput  value={task} onChangeText={setTask} style={styles.Input}></TextInput>
            <Button title="Add" onPress={handleSubmit} color={'green'} />
         </View>

          <FlatList
             data={tasks}
             renderItem={({ item }) => (
            <View style={styles.rowContainer}> 

                <View style={styles.item}>
                    <Text style={[styles.text, item.completed && styles.completedText]}>
                        {item.text}
                    </Text>
                </View>

            <TouchableOpacity style={styles.icon} onPress={() => toggleCompleted(item.id)}>
              <MaterialCommunityIcons
                name={item.completed ? 'check-circle' : 'check-circle-outline'}
                size={20}
                color="white"
              />
            </TouchableOpacity>

             <TouchableOpacity style={[styles.icon, { backgroundColor: 'red' }]} onPress={()=> handleDelete(item.id)} >
                <MaterialCommunityIcons
                name="delete-circle-outline"
                size={20}
                color="white"
                />
            </TouchableOpacity>
        </View>
        )}
            keyExtractor={(item) => item.id}
        />
        
    </View>

    )
}


const styles=StyleSheet.create({
    

    title:{
        marginTop: 50,
        marginBottom: 30,
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 25
    },

    main: {
        flex: 1,
        backgroundColor: '#16a7c4ff',
        alignItems: 'center',
 
    },
    Input: {
        backgroundColor: 'white',
        color: 'black',
        width:  400,
        height: 40,

    },
    rowContainer:{
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
        marginLeft: 35,
        cursor: 'pointer',
        
    },
    form:{
        flexDirection: 'row',
        gap: 5,
        marginBottom: 50,
    },
    button: {
        width: 60,
        height: 40,
        backgroundColor: '#00fa40',
        color: 'white'
    },
    icon:{
        backgroundColor: 'green',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2
    },
    item: {
        padding:1,
        backgroundColor: 'white',
        width:  400,
        height: 40,
        justifyContent: 'center',
      
    },
    text: {
    fontSize: 16,
  },
  completedText: {
  textDecorationLine: 'line-through',
  color: 'gray',
},
     
})
 