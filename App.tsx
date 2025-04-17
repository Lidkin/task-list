import { Container } from 'components/Container';
import ScreenContent from 'components/ScreenContent';
import { TaskProvider } from 'context/TaskContext';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';

import './global.css';

export default function App() {
  return (
    <TaskProvider>
      <Container>
        <ImageBackground
          source={require('./assets/task list mobile application home page illustration.png')}
          style={{ flex: 1 }}>
          <ScreenContent />
          <StatusBar style="auto" />
        </ImageBackground>
      </Container>
    </TaskProvider>
  );
}
