import { StatusBar } from 'expo-status-bar';
import { Provider } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import SatckNavigator from './routes';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SatckNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
