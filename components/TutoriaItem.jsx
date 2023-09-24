/* eslint-disable react/prop-types */
import React from 'react'
import { Text, View } from 'react-native'

export default function TutoriaItem ({ tutoria, children }) {
  return (
    <View className='p-4 bg-gray-300 rounded-md'>
      <Text className='font-semibold'>Tutor: {tutoria.tutor}</Text>
      <Text className='font-semibold'>Materia: {tutoria.materia}</Text>
      <Text>Dia: {tutoria.dia}  Hora: {tutoria.hora}</Text>
      <Text>Salon: {tutoria.salon}</Text>
      {children}
    </View>
  )
};
