import {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '../screens/OnboardingScreen';
import {getItem} from '../utils/asyncStorage';
const Stack = createNativeStackNavigator();

const Router = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');

    if (onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Router;
