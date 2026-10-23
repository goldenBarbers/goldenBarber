import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function LayoutRoot() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}