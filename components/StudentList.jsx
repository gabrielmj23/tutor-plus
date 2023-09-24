/* eslint-disable react/prop-types */
import React from 'react'
import { Text, FlatList } from 'react-native'
import StudentItem from './StudentItem.jsx'

export default function StudentList ({ students }) {
  return (
    <FlatList
      data={students}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: student }) => <StudentItem student={student} />}
    />
  )
}
