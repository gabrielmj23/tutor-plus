import React, { useState } from 'react'
import { Text, FlatList, Alert, View } from 'react-native'
import TutoriaItem from './TutoriaItem'
import { getTutoriasDadas } from '../utils/db'
import { AuthStore } from '../utils/store'

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
              <TutoriaItem tutoria={tutoria} />
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
