import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {setItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    // Navigate to the main app screen
    navigation.navigate('Home');

    setItem('onboarded', '1');
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{paddingHorizontal: 15}}
        pages={[
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/boost.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Boost Your Productivity',
            subtitle: 'Join our Udemig courses to enhance your skills',
          },
          {
            backgroundColor: '#fef3ce',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/achieve.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Work without Interruption',
            subtitle: 'Complate your tasks smootly with our productivity tips',
          },
          {
            backgroundColor: '#FEEE91',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/work.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Reach Higher Goals',
            subtitle:
              'Utilize our platform to achieve your professional aspirations ',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
