import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './src/game/GameProvider';
import { GameScreen } from './src/components/GameScreen';

export default function App() {
  return <GameProvider><StatusBar style="light" /><GameScreen /></GameProvider>;
}
