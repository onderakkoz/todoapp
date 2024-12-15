import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {removeItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.push('Onboarding');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          style={{flex: 1}}
          source={require('../assets/animations/confetti.json')}
          autoPlay
          loop
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Todo')}
        style={styles.addTaskButton}>
        <LinearGradient
          style={styles.addTaskButtonlottie}
          colors={['#605678', '#605678']}>
          <Text style={styles.addTaskText}>New Task, Who's In?</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <LinearGradient
          style={styles.resetButtonLottie}
          colors={['#898121', '#898121']}>
          <Text style={styles.addTaskText}>Reset</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fef3c7',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  addTaskButton: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 1,
  },
  addTaskButtonlottie: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 2,
  },
  addTaskText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  resetButton: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 1,
    marginTop: 30,
  },
  resetButtonLottie: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 2,
  },
});
