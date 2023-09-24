import React from 'react'
import * as yup from 'yup'
import { TouchableHighlight, Text, TextInput, View, Alert } from 'react-native'
import { router } from 'expo-router'
import { appSignIn } from '../../store'

const esquemaAuth = yup.object().shape({
  email: yup.string().trim().email('Email invalido').required('Email requerido'),
  nombre: yup.string().trim().required('Nombre requerido'),
  semestre: yup.number().min(1, 'Numero invalido').max(10, 'Numero invalido').required('Semestre requerido'),
  password: yup.string().trim().min(8, 'La contraseña debe ser de al menos 8 caracteres').required('Contraseña requerida')
})

export default function SignUp () {
  const [email, setEmail] = React.useState('')
  const [nombre, setNombre] = React.useState('')
  const [semestre, setSemestre] = React.useState(1)
  const [password, setPassword] = React.useState('')

  async function manejarSignUp () {
    let usuario = { email, nombre, semestre, password }
    try {
      usuario = await esquemaAuth.validate({ email, nombre, semestre, password })
      if (!usuario.email.endsWith('@est.ucab.edu.ve') && !usuario.email.endsWith('@ucab.edu.ve')) {
        throw new Error('El correo no pertenece a la institución')
      }
      const resUser = await appSignIn(usuario.email, usuario.password)
      if (resUser.user) {
        router.replace('/home')
      } else {
        Alert.alert('Error', resUser.error.message)
      }
    } catch (error) {
      if (error.message.includes('already-in-use')) {
        const resUser = await appSignIn(usuario.email, usuario.password)
        if (resUser.user) {
          router.replace('/home')
        } else {
          Alert.alert('Error', resUser.error.message)
        }
        return
      }
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View className='flex-1 items-center justify-center gap-6'>
      <Text className='text-4xl font-bold'>TutorPlus</Text>
      <View className='flex flex-col flex-none items-center justify-center w-3/5 gap-4'>
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={email}
          onChangeText={setEmail}
          inputMode='email'
          placeholder='Tu correo UCAB'
        />
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={nombre}
          onChangeText={setNombre}
          placeholder='Tu nombre'
        />
        <TextInput
          className='bg-gray-300 p-2 rounded-md w-full'
          value={semestre}
          onChangeText={setSemestre}
          inputMode='numeric'
          placeholder='Tu semestre'
        />
        <TextInput
          className='bg-gray-300 mb-5 p-2 rounded-md w-full'
          value={password}
          onChangeText={setPassword}
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
