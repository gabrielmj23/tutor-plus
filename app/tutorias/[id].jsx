import React, { useState } from 'react'
import { ScrollView, View, Text, Button, Alert } from 'react-native'
import StudentList from '../../components/StudentList.jsx'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getEstudiantesDeTutoria, guardarAsistencia } from '../../utils/db.js'
import { router, useLocalSearchParams } from 'expo-router'

export default function VerTutoria () {
  const [showStudents, setShowStudents] = useState(false)
  const [checkAsistencia, setPasarAsistencia] = useState(false)
  const [asistencia, setAsistencia] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [students, setStudents] = useState([])

  const { id } = useLocalSearchParams()

  React.useEffect(() => {
    getEstudiantesDeTutoria({ uid: id })
      .then(listaEstudiantes => {
        setStudents(listaEstudiantes)
        setAsistencia(Array(listaEstudiantes.length).fill(false))
      })
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
  }, [id])

  const verEstudiantes = () => {
    setShowStudents(!showStudents)
  }

  const pasarAsistencia = () => {
    setPasarAsistencia(!checkAsistencia)
    setShowPicker(!showPicker)
  }

  const handleAsistencia = (index) => {
    const newAsistencia = [...asistencia]
    newAsistencia[index] = !newAsistencia[index]
    setAsistencia(newAsistencia)
  }

  const onChange = (event, selectedDate) => {
    setShowPicker(false)
    if (selectedDate) {
      setSelectedDate(selectedDate)
    }
  }

  const enviarReporte = async () => {
    const asistenciaMap = {}
    students.forEach((student, index) => {
      asistenciaMap[student.nombre] = asistencia[index] ? 'presente' : 'ausente'
    })
    try {
      await guardarAsistencia({ tutoriaId: id, fecha: selectedDate, asistencia: asistenciaMap })
      Alert.alert('Exito', 'Se ha enviado el reporte de asistencia')
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
      console.error(error)
    }
  }

  return (
    <ScrollView className='flex-1 pt-24' contentContainerStyle={{ alignItems: 'center' }}>
      <View>
        <Text className='text-xl'>
          Administrar tutoria
        </Text>
      </View>

      <View className='border solid border-black mx-20 my-10'>
        <Button title='Ver Estudiantes' onPress={verEstudiantes} />
      </View>

      {showStudents && (
        <View style={{ flex: 1, marginHorizontal: 50 }}>
          <StudentList students={students} />
        </View>
      )}

      <View className='border-solid border-black  mx-20 my-10'>
        <Button title='Pasar Asistencia' onPress={pasarAsistencia} />
      </View>
      {checkAsistencia && (
        <View>
          <View style={{ marginLeft: 20 }}>
            {selectedDate && (
              <Text style={{ flexDirection: 'column' }}>Fecha seleccionada: {selectedDate.toLocaleDateString()}</Text>
            )}
            <View className='border solid border-black mx-20 my-3'>
              <Button title='Seleccionar fecha' onPress={() => setShowPicker(true)} />
            </View>

            {showPicker && (
              <DateTimePicker
                mode='date'
                display='calendar'
                value={selectedDate}
                onChange={onChange}
              />
            )}
          </View>

          <View style={{ flex: 1, padding: 5, marginHorizontal: 20, marginVertical: 15, borderWidth: 1, borderColor: 'black' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
              <View style={{ flex: 1 }}>
                <Text>Nombre</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>Asistencia</Text>
              </View>
            </View>

            {students.map((student) => (
              <View key={student.id} style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text>{student.nombre}</Text>
                </View>
                <View style={{ flex: 1, margin: 0 }}>
                  {asistencia[students.indexOf(student)]
                    ? (
                      <Button color='green' title='Presente' onPress={() => handleAsistencia(students.indexOf(student))} />
                      )
                    : (
                      <Button color='orange' title='Ausente' onPress={() => handleAsistencia(students.indexOf(student))} />
                      )}

                </View>
              </View>
            ))}
            <Button title='Enviar reporte' onPress={enviarReporte} />
          </View>
        </View>
      )}
    </ScrollView>
  )
}
