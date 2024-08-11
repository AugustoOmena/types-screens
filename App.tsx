import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import { styles } from './src/views/styles';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator></RootNavigator>
    </NavigationContainer>
  );
}
