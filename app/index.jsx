import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function Index () {
  return (
    <View className='flex-1 flex-col gap-4 items-center justify-center'>
      <Text className='text-4xl font-bold'>TutorPlus</Text>
      <View className='flex flex-col w-3/5 gap-4'>
        <Link className='text-lg text-center bg-cyan-500 p-2 rounded-lg' href='/(auth)/login'>
          Iniciar sesion
        </Link>
        <Link className='text-lg text-center bg-cyan-500 p-2 rounded-lg' href='/(auth)/signup'>
          Registrarse
        </Link>
      </View>
    </View>
  )
}
