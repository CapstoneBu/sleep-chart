import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';  // 추가
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import HomeScreen from './Screen/HomeScreen';
import Routine from './Screen/Routine';
import Sleep from './Screen/Sleep';
import {useAppSave } from './Screen/AppSave'

//화면 넘기기 위해 스택 쌓는 곳 

const App = () => {
  const Stack = createNativeStackNavigator();
  const [headerText, setHeaderText] = useState('홈화면');

  return (
    <NavigationContainer>  {/* NavigationContainer 추가 */}
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home'>
          {(props) => <HomeScreen {...props} headerText={headerText} setHeaderText={setHeaderText} />}
        </Stack.Screen>

        <Stack.Screen name="Routine">
          {(props) => <Routine {...props} headerText={headerText} setHeaderText={setHeaderText} />}
        </Stack.Screen>

        <Stack.Screen name="Sleep">
          {(props) => <Sleep {...props} headerText={headerText} setHeaderText={setHeaderText} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
