import React, { useState } from 'react'
import { Text, FlatList, Alert, View, TouchableHighlight } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import TutoriaItem from './TutoriaItem'
import { getCarreras, getTutoriasDisponibles, inscribirEnTutoria } from '../utils/db'
import { AuthStore } from '../utils/store'
import { router } from 'expo-router'

const semestres = [
  { label: 'Todos los semestres', value: '' },
  { label: '1er semestre', value: '1' },
  { label: '2do semestre', value: '2' },
  { label: '3er semestre', value: '3' },
  { label: '4to semestre', value: '4' },
  { label: '5to semestre', value: '5' },
  { label: '6to semestre', value: '6' },
  { label: '7mo semestre', value: '7' },
  { label: '8vo semestre', value: '8' }
]

export default function TutoriasDisponibles () {
  const [selectedSemestre, setSelectedSemestre] = useState('')
  const [selectedCarrera, setSelectedCarrera] = useState('')
  const [carreras, setCarreras] = useState([])
  const [tutorias, setTutorias] = useState([])

  React.useEffect(() => {
    getTutoriasDisponibles({ uid: AuthStore.getRawState().user?.uid })
      .then(listaTutorias => setTutorias(listaTutorias))
      .then(() => getCarreras()
        .then(listaCarreras => setCarreras([{ label: 'Todas las carreras', value: '' }, ...listaCarreras]))
      )
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
  }, [])

  let filteredTutorias = tutorias

  if (selectedSemestre) {
    filteredTutorias = filteredTutorias.filter(
      (tutoria) => tutoria.semestre === Number(selectedSemestre)
    )
  }

  if (selectedCarrera) {
    filteredTutorias = filteredTutorias.filter(
      (tutoria) => tutoria.carreras.indexOf(selectedCarrera) !== -1
    )
  }

  return (
    <View className='h-2/3 w-full items-center gap-3 px-4'>
      <Picker
        selectedValue={selectedSemestre}
        onValueChange={setSelectedSemestre}
        style={{ width: '100%' }}
      >
        {semestres.map((semestre) => (
          <Picker.Item
            key={semestre.value}
            label={semestre.label}
            value={semestre.value}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedCarrera}
        onValueChange={setSelectedCarrera}
        style={{ width: '100%' }}
      >
        {carreras.map((carrera) => (
          <Picker.Item
            key={carrera.value}
            label={carrera.label}
            value={carrera.value}
          />
        ))}
      </Picker>
      {filteredTutorias.length > 0
        ? (
          <FlatList
            className='w-3/4'
            data={filteredTutorias}
            ItemSeparatorComponent={() => <Text />}
            renderItem={({ item: tutoria }) => (
              <TutoriaItem tutoria={tutoria}>
                <TouchableHighlight
                  className='rounded-md p-2 my-2 bg-cyan-500 w-2/3'
                  activeOpacity={0.7}
                  underlayColor='#EEEEEE'
                  onPress={() => {
                    inscribirEnTutoria({ userId: AuthStore.getRawState().user?.uid, tutoria })
                      .then(router.replace('/home'))
                      .catch(error => Alert.alert('Error', error.message))
                  }}
                >
                  <Text className='font-semibold text-center'>Inscribirse</Text>
                </TouchableHighlight>
              </TutoriaItem>
            )}
          />
          )
        : (
          <Text
            style={{
              textAlign: 'center',
              marginTop: '50%',
              width: 'auto'
            }}
            className='bg-gray-400 font-semibold p-2 rounded-md text-lg'
          > No hay tutorias disponibles
          </Text>
          )}
      <TouchableHighlight
        className='rounded-md p-2 my-2 bg-lime-500 w-2/3'
        activeOpacity={0.7}
        underlayColor='#EEEEEE'
        onPress={() => router.replace('/home')}
      >
        <Text className='font-semibold text-center text-lg'>Salir</Text>
      </TouchableHighlight>
    </View>
  )
}
