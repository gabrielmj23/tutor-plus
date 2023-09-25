/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
import { View, Text, Button, Alert, ScrollView, FlatList } from 'react-native'
import { aprobarSolicitud, getAspirantes, rechazarSolicitud } from '../utils/db.js'
import { router } from 'expo-router'

export default function AdministrarAspirantes () {
  const [aspirantes, setAspirantes] = useState([])

  React.useEffect(() => {
    getAspirantes()
      .then(aspirantes => setAspirantes(aspirantes))
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
  }, [])

  async function handleAprobar (aspirante) {
    try {
      await aprobarSolicitud({ uid: aspirante.id })
      Alert.alert('Exito', 'Solicitud aprobada')
      router.replace('/admin')
    } catch (error) {
      Alert.alert('Error', error.message)
      console.error(error)
    }
  }

  async function handleRechazar (aspirante) {
    try {
      await rechazarSolicitud({ uid: aspirante.id })
      Alert.alert('Exito', 'Solicitud rechazada')
      router.replace('/admin')
    } catch (error) {
      Alert.alert('Error', error.message)
      console.error(error)
    }
  }

  return (
    <ScrollView className='flex-1 flex-col gap-2'>
      <Text className='text-xl'>Aprobar o rechazar solicitudes</Text>
      {aspirantes.length === 0
        ? <Text>No hay solicitudes</Text>
        : <View>
          <FlatList
            data={aspirantes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View key={item.id} className='bg-gray-400 flex flex-col gap-2 p-4 rounded-lg'>
                <Text>Nombre: {item.tutor}</Text>
                <Text>Cedula: {item.cedula}</Text>
                <Text>Telefono: {item.telefono}</Text>
                <Text>Correo: {item.email}</Text>
                <Text>Materia: {item.materia}</Text>
                <Text>Dia: {item.dia}</Text>
                <Text>Hora: {item.hora}</Text>
                <View className='flex flex-col gap-3'>
                  <Button
                    title='Aprobar'
                    onPress={() => handleAprobar(item)}
                  />
                  <Button
                    title='Rechazar'
                    color='#ef4444'
                    onPress={() => handleRechazar(item)}
                  />
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </View>}
    </ScrollView>
  )
}
