import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-800">
      <Text className="text-gray-400">TutoPlus</Text>
      <Text className="text-white">Hello World!</Text>
      <StatusBar style="auto" className="text-white" />
    </View>
  );
}
