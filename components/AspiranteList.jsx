import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import students from '../app/administrar-tutoria/data/StudentsExample.js'
import StudentItem from './AspiranteItem.jsx'

export default function AspiranteList () {
  return (
    <FlatList
      data={students}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: student }) => <StudentItem student={student} />}
    />
  )
}
