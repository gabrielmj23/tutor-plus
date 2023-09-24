/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text } from 'react-native'

export default function StudentItem ({ student }) {
  return (
    <View key={student.id} className='rounded-md bg-gray-300 p-4'>
      <Text>Cédula: {student.id}</Text>
      <Text>Nombre: {student.nombre}</Text>
      <Text>Correo: {student.email}</Text>
      <Text>Teléfono: {student.telefono}</Text>
    </View>
  )
}
