import React from 'react'
import * as yup from 'yup'
import { TouchableHighlight, Text, TextInput, View, Alert } from 'react-native'
import { router } from 'expo-router'
import { appSignIn } from '../../store'

const esquemaAuth = yup.object().shape({
  email: yup.string().trim().email('Email invalido').required('Email requerido'),
  password: yup.string().trim().min(8, 'La contraseña debe ser de al menos 8 caracteres').required('Contraseña requerida')
})

export default function LogIn () {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function manejarLogInEstudiante () {
    try {
      const usuario = await esquemaAuth.validate({ email, password })
      const resUser = await appSignIn(usuario.email, usuario.password)
      if (resUser.user) {
        router.replace('/home')
      } else {
        Alert.alert('Error', resUser.error.message)
      }
    } catch (error) {
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
          onPress={() => manejarLogInEstudiante()}
        >
          <Text className='text-center text-md font-semibold'>Entrar como estudiante</Text>
        </TouchableHighlight>
        <TouchableHighlight className='rounded-md bg-cyan-500 p-4 w-full'>
          <Text className='text-center text-md font-semibold'>Entrar como administrador</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}
