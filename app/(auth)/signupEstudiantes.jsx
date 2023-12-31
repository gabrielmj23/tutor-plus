import React from 'react'
import * as yup from 'yup'
import { TouchableHighlight, Text, TextInput, View, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { router } from 'expo-router'
import { appSignUp } from '../../utils/store'
import { getCarreras } from '../../utils/db'

const esquemaAuth = yup.object().shape({
  email: yup.string().trim().email('Email invalido').required('Email requerido'),
  nombre: yup.string().trim().required('Nombre requerido'),
  cedula: yup.string().trim().max(11).required('Cedula requerida'),
  telefono: yup.string().trim().required('Telefono requerido'),
  semestre: yup.number().min(1, 'Numero invalido').max(10, 'Numero invalido').required('Semestre requerido'),
  password: yup.string().trim().min(8, 'La contraseña debe ser de al menos 8 caracteres').required('Contraseña requerida')
})

export default function SignUpEstudiantes () {
  const [datos, setDatos] = React.useState({
    email: '',
    nombre: '',
    cedula: '',
    telefono: '',
    semestre: 1,
    carrera: 'informatica',
    password: ''
  })
  const [carreras, setCarreras] = React.useState([])

  React.useEffect(() => {
    getCarreras()
      .then(listaCarreras => setCarreras(listaCarreras))
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
  }, [])

  async function manejarSignUp () {
    let usuario = { ...datos }
    try {
      usuario = await esquemaAuth.validate(usuario)
      if (!usuario.email.endsWith('@est.ucab.edu.ve')) {
        throw new Error('Correo invalido para estudiante')
      }
      const resUser = await appSignUp(usuario)
      if (resUser.user) {
        router.replace('/home')
      } else {
        Alert.alert('Error', resUser.error.message)
        console.error(resUser.error)
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View className='flex-1 items-center justify-center gap-6'>
      <Text className='text-4xl font-bold'>TutorPlus</Text>
      <View className='flex flex-col flex-none items-center justify-center w-3/5 gap-4'>
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={datos.email}
          onChangeText={(text) => setDatos({ ...datos, email: text })}
          inputMode='email'
          placeholder='Tu correo UCAB'
        />
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={datos.nombre}
          onChangeText={(text) => setDatos({ ...datos, nombre: text })}
          placeholder='Tu nombre'
        />
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={datos.cedula}
          onChangeText={(text) => setDatos({ ...datos, cedula: text })}
          inputMode='numeric'
          placeholder='Tu cedula'
        />
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={datos.telefono}
          onChangeText={(text) => setDatos({ ...datos, telefono: text })}
          inputMode='numeric'
          placeholder='Tu numero de telefono'
        />
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={String(datos.semestre)}
          onChangeText={(text) => setDatos({ ...datos, semestre: Number(text) })}
          inputMode='numeric'
          placeholder='Tu semestre'
        />
        <Picker
          style={{ width: '100%' }}
          selectedValue={datos.carrera}
          mode='dropdown'
          onValueChange={(value) => setDatos({ ...datos, carrera: value })}
        >
          {carreras.map(carrera => (<Picker.Item key={carrera.value} label={carrera.label} value={carrera.value} />))}
        </Picker>
        <TextInput
          className='bg-gray-300 mb-5 p-2 rounded-md w-full'
          value={datos.password}
          onChangeText={(text) => setDatos({ ...datos, password: text })}
          placeholder='Tu contraseña'
          secureTextEntry
        />
        <TouchableHighlight
          className='rounded-md p-4 bg-cyan-500 w-full'
          activeOpacity={0.7}
          underlayColor='#EEEEEE'
          onPress={() => manejarSignUp()}
        >
          <Text className='text-center text-md font-semibold'>Registrarse</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}
