import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from 'react-native';
import {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  AddCircle,
  CloseCircle,
  Edit2,
  TickCircle,
  Trash,
} from 'iconsax-react-native';

const TodoScreen = () => {
  // inputun icindeki deger
  const [todo, setTodo] = useState('');
  // eklenilen todolar => her todoyu bır dızıde tutmak ıcın
  const [todos, setTodos] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newUpdateText, setNewUpdateText] = useState('');

  const saveTodos = async saveTodo => {
    // AsyncStorage'a yazilacak todolar=> storage'a setItem ile ekleme yapariz
    // bizden 2 deger ister
    // 1.deger string key ,
    //2.deger value(string)-
    //objeyi stringe cevirmek icin JSON.stringify methodunu kullaniriz
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
      // alert('Todos saved successfully');
    } catch (error) {
      console.error('Error saving todos', error);
    }
  };

  const loadTodos = async loadTodo => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      // JSON.parse ile stringi objeye donusturuyoruz
      if (storedData) {
        setTodos(JSON.parse(storedData));
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error('Error loading todos', error);
    }
  };

  useEffect(() => {
    //TodoScreen acildiginda asyncStorage'daki todoslari yukluyoruz
    loadTodos();
  }, []);

  // delete butonuna basinca calisacak olan fonk
  const deleteTodo = async id => {
    // console.log('tiklandi ');
    const updatedTodos = todos.filter(todo => todo.id !== id); // filter verilen id ile eslesmeyenlerden yeni bir dizi olusturur dondurur, boylece verilen id otomatikman silinmis diziden cikmis olur
    setTodos(updatedTodos); // state'i guncelle
    saveTodos(updatedTodos); //async storage'i  guncelle
  };

  const updateTodos = id => {
    const editingTodo = todos.find(item => item.id === id);
    if (!editingTodo) return;

    if (Platform.OS === 'ios') {
      Alert.prompt('Edit Todo', 'Update', newUpdateText => {
        if (newUpdateText) {
          const updatedTodos = todos.map(item =>
            item.id === id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updatedTodos);
          saveTodos(updatedTodos);
        }
      });
    } else {
      setEditingTodoId(id);
      setNewUpdateText(editingTodo.text);
      setModalVisible(true);
    }
  };

  const handleSave = () => {
    const updatedTodos = todos.map(item =>
      item.id === editingTodoId ? {...item, text: newUpdateText} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setModalVisible(false);
    setNewUpdateText('');
  };

  //add butonuna basinca calisacak olan fonk
  const addTodo = () => {
    //yeni bir todo objesi olustur ve todos state'ine aktar.
    const updatedTodos = [...todos, {id: uuid.v4(), text: todo}];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTodo('');
  };
  console.log(todos);

  const completeTodo = async id => {
    const completedTodos = todos.map(item =>
      item.id === id ? {...item, comleted: !item.comleted} : item,
    );

    setTodos(completedTodos);
    saveTodos(completedTodos);
  };
  return (
    <LinearGradient colors={['#FFE31A', '#F72C5B']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>To Do List</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            onChangeText={text => setTodo(text)}
            placeholder="Add To Do.."
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addTodo}
            style={[styles.button, styles.addButton]}>
            <AddCircle size="32" color="#FF6600" variant="Outline" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.comleted && styles.completedText,
                ]}>
                {item?.text}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => completeTodo(item?.id)}
                    style={[styles.button, styles.completeButton]}>
                    <Text style={styles.buttonText}>
                      {item.comleted ? (
                        <CloseCircle
                          size="29"
                          color="#555555"
                          variant="Outline"
                        />
                      ) : (
                        <TickCircle
                          size="30"
                          color="#37d67a"
                          variant="Outline"
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>
                      <Edit2 size="29" color="#1F509A" variant="Outline" />
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                      <Trash size="29" color="#FF2929" variant="Outline" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* Android için Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Todo</Text>
              <TextInput
                value={newUpdateText}
                onChangeText={setNewUpdateText}
                style={styles.inputmodal}
              />
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  justifyContent: 'space-between',
                  width: '60%',
                }}>
                <Button
                  style={{padding: 20, backgroundColor: 'red'}}
                  title="Save"
                  onPress={handleSave}
                />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: '#CC2B52',
    fontSize: 15,
  },
  inputmodal: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 15,
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  buttonText: {
    color: '#fff',
  },
  buttonContainer: {},
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  deleteButton: {
    padding: 10,
    // backgroundColor: 'red',
  },
  updateButton: {
    // backgroundColor: 'green',
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // modal arka planı
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    padding: 20,
  },
  completeButton: {
    padding: 10,
    // backgroundColor: 'green',
    marginLeft: 10,
    borderRadius: 5,
  },
  completedText: {
    color: 'gray',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  todoText: {
    color: '#181C14',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
