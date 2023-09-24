/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function AspiranteItem ({ student }) {
  console.log(student)
  return (
    <View key={student.id}>
      <Text>{student.id}</Text>
      <Text>{student.name}</Text>
      <Text>{student.email}</Text>
      <Text>{student.phone}</Text>
    </View>
  )
}
