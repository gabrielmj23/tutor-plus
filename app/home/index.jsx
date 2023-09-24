import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { AuthStore, appSignOut } from '../../utils/store'
import TutoriasInscritas from '../../components/TutoriasInscritas'
import { router } from 'expo-router'

export default function Home () {
  return (
    <View className='flex-1 flex-col items-center justify-center gap-2'>
      <Text className='text-2xl'>Bienvenido/a, {AuthStore.getRawState().user?.displayName}</Text>
      <TutoriasInscritas />
      <TouchableHighlight
        className='rounded-md p-4 bg-cyan-500 w-2/3'
        activeOpacity={0.7}
        underlayColor='#EEEEEE'
        onPress={() => router.replace('/inscribir')}
      >
        <Text className='text-center text-md font-semibold'>Inscribirse en otra tutoria</Text>
      </TouchableHighlight>
      <TouchableHighlight
        className='rounded-md p-4 bg-purple-400 w-2/3'
        activeOpacity={0.7}
        underlayColor='#EEEEEE'
        onPress={() => router.replace('/home/tutor')}
      >
        <Text className='text-center text-md font-semibold'>Ver tus tutorias</Text>
      </TouchableHighlight>
      <TouchableHighlight
        className='rounded-md p-4 bg-red-400 w-2/3'
        activeOpacity={0.7}
        underlayColor='#EEEEEE'
        onPress={() => {
          appSignOut()
          router.replace('/')
        }}
      >
        <Text className='text-center text-md font-semibold'>Salir</Text>
      </TouchableHighlight>
    </View>
  )
}
