import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { AuthStore, appSignOut } from '../../utils/store'
import AdministrarAspirantes from '../../components/AdministrarAspirantes'
import { router } from 'expo-router'

export default function Admin () {
  return (
    <View className='flex-1 items-center justify-center gap-3'>
      <Text style= {{paddingTop: 50}} className='text-2xl p-4'>Bienvenido/a, {AuthStore.getRawState().user?.displayName}</Text>
      <AdministrarAspirantes />
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
