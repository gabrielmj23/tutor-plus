import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { router } from 'expo-router'
import TutoriasDadas from '../../../components/TutoriasDadas'
import { AuthStore } from '../../../utils/store'

export default function HomeTutor () {
  return (
    <View className='flex-1 flex-col items-center justify-center gap-2'>
      <Text className='text-2xl p-4'>Tutorias que dictas</Text>
      <TutoriasDadas />
      <TouchableHighlight
        className='rounded-md p-4 bg-cyan-500 w-2/3'
        activeOpacity={0.7}
        underlayColor='#EEEEEE'
        onPress={() => router.replace('/home/tutor/aspirar')}
      >
        <Text className='text-center text-md font-semibold'>Aspirar a tutor</Text>
      </TouchableHighlight>
      <TouchableHighlight
        className='rounded-md p-4 bg-lime-500 w-2/3'
        activeOpacity={0.7}
        underlayColor='#EEEEEE'
        onPress={() => {
          if (AuthStore.getRawState().roles.admin) {
            router.replace('/admin')
          } else {
            router.replace('/home')
          }
        }}
      >
        <Text className='text-center text-md font-semibold'>Salir</Text>
      </TouchableHighlight>
    </View>
  )
}
