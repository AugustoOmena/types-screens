import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import { styles } from './styles';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator></RootNavigator>
    </NavigationContainer>
  );
}
