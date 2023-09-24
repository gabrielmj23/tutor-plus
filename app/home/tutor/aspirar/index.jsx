import React from 'react'
import * as yup from 'yup'
import { TouchableHighlight, Text, TextInput, View, Alert } from 'react-native'
import { router } from 'expo-router'
import { AuthStore } from '../../../../utils/store'
import { aspirarATutoria, getTutoriasParaDar } from '../../../../utils/db'
import { Picker } from '@react-native-picker/picker'

const esquema = yup.object().shape({
  materia: yup.string().trim().required('Materia requerida'),
  dia: yup.string().trim().required('Dia requerido').matches(/(Lunes|Martes|Miercoles|Jueves|Viernes)/, 'Dia invalido'),
  hora: yup.string().trim().required('Hora requerida')
})

export default function Aspirar () {
  const [datos, setDatos] = React.useState({
    materia: '',
    dia: 'Lunes',
    hora: '7:00 am'
  })
  const [materias, setMaterias] = React.useState([])

  React.useEffect(() => {
    getTutoriasParaDar({ uid: AuthStore.getRawState().user?.uid })
      .then(materias => setMaterias(materias))
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
  }, [])

  async function manejarSubmit () {
    try {
      const datosValidados = await esquema.validate(datos)
      await aspirarATutoria({ ...datosValidados, tutor: AuthStore.getRawState().user?.displayName })
      Alert.alert('Exito', 'Su solicitud sera procesada')
      router.replace('/home/tutor')
    } catch (error) {
      console.error(error)
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View className='flex-1 items-center justify-center gap-6'>
      <Text className='text-2xl font-bold'>Aspirar a tutoria</Text>
      <View className='flex flex-col flex-none items-center justify-center w-3/5 gap-4'>
        <Picker
          style={{ width: '100%' }}
          value={datos.materia}
          mode='dropdown'
          onValueChange={(value) => setDatos({ ...datos, materia: value })}
        >
          {materias.map(materia => (
            <Picker.Item key={materia.nombre} label={materia.nombre} value={materia.nombre} />
          ))}
        </Picker>
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={datos.dia}
          onChangeText={(text) => setDatos({ ...datos, dia: text })}
          placeholder='El dia de tu tutoria'
        />
        <TextInput
          className='bg-gray-300 mb-5 p-2 rounded-md w-full'
          value={datos.hora}
          onChangeText={(text) => setDatos({ ...datos, hora: text })}
          placeholder='La hora de tu tutoria'
        />
        <TouchableHighlight
          className='rounded-md p-4 bg-cyan-500 w-full'
          activeOpacity={0.7}
          underlayColor='#EEEEEE'
          onPress={() => manejarSubmit()}
        >
          <Text className='text-center text-md font-semibold'>Hacer solicitud</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}
