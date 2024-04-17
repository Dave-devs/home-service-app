import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import {  Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store";

const EXPO_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Commented this out because it was causing an error when i register 
export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
}; 

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'outfit': require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfitM': require('@/assets/fonts/Outfit-Medium.ttf'),
    'outfitSB': require('@/assets/fonts/Outfit-SemiBold.ttf'),
    'outfitB': require('@/assets/fonts/Outfit-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={EXPO_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  
  useEffect(() => {
    if(isLoaded && !isSignedIn) {
      router.navigate('(tabs)')
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)"  options={{headerShown: false}} />
      <Stack.Screen name='(auth)/signup' options={{headerShown: false}} />
      <Stack.Screen name='(auth)/signin' options={{headerShown: false}} />
      <Stack.Screen name='(onboarding)/splash' options={{headerShown: false}} />
      <Stack.Screen name='(onboarding)/onboarding' options={{headerShown: false}} />
      <Stack.Screen name='(auth)/verifycode' options={{headerShown: false}}/>
      <Stack.Screen name='(auth)/completeprofile' options={{headerShown: false}} />
      <Stack.Screen name='(auth)/newpassword' options={{headerShown: false}} />
      <Stack.Screen name= "listing/businessByCategory" options={{ headerShown: false}} />
      <Stack.Screen name= "listing/businessCategoryDetail" options={{ headerShown: false}} />
    </Stack>
  );
}