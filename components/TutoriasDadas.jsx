import React, { useState } from 'react'
import { Text, FlatList, Alert, View, TouchableHighlight } from 'react-native'
import TutoriaItem from './TutoriaItem'
import { getTutoriasDadas } from '../utils/db'
import { AuthStore } from '../utils/store'
import { router } from 'expo-router'

export default function TutoriasDadas () {
  const [tutorias, setTutorias] = useState([])

  React.useEffect(() => {
    getTutoriasDadas({ nombre: AuthStore.getRawState().user?.displayName })
      .then(tutorias => setTutorias(tutorias))
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
  })

  return (
    <View className='h-1/3 w-full items-center gap-3 px-4'>
      {tutorias.length > 0
        ? (
          <FlatList
            className='w-3/4'
            data={tutorias}
            ItemSeparatorComponent={() => <Text />}
            renderItem={({ item: tutoria }) => (
              <TutoriaItem tutoria={tutoria}>
                <TouchableHighlight
                  className='rounded-md p-2 my-2 bg-cyan-500 w-2/3'
                  activeOpacity={0.7}
                  underlayColor='#EEEEEE'
                  onPress={() => {
                    router.replace(`/tutorias/${tutoria.id}`)
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
          > Parece que no dictas ninguna tutoria
          </Text>
          )}
    </View>
  )
}
