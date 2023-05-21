import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import blurBg from '../assets/bg-blur.png'
import Stripes from '../assets/stripes.svg'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_100Thin_Italic,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(
    null,
  ) // quando está entre <> nesse caso quer dizer que pode aceitar um dois dois valores

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
    Roboto_100Thin_Italic,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticate(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }
  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
