import React from 'react'
import { Text, View } from 'react-native'
import TutoriasDisponibles from '../../components/TutoriasDisponibles'

export default function Home () {
  return (
    <View className='flex-1 flex-col items-center justify-center gap-2'>
      <Text className='text-2xl'>Selecciona la tutoria en la que deseas inscribirte</Text>
      <TutoriasDisponibles />
    </View>
  )
}
