import React from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { getTutoriasInscritas } from '../utils/db'
import { AuthStore } from '../utils/store'
import TutoriaItem from './TutoriaItem'

export default function TutoriasInscritas () {
  const [inscritas, setInscritas] = React.useState([])
  const [cargando, setCargando] = React.useState(true)

  React.useEffect(() => {
    getTutoriasInscritas({ uid: AuthStore.getRawState().user?.uid })
      .then(tutorias => setInscritas(tutorias))
      .catch(error => {
        Alert.alert('Error', error.message)
        console.error(error)
      })
      .finally(() => setCargando(false))
  }, [])

  return (
    <View className='flex flex-col h-1/5 p-4'>
      <Text className='text-xl'>Tus tutorias inscritas</Text>
      {!cargando && inscritas.length === 0
        ? <Text className='text-md'>Parece que no has inscrito alguna tutoria</Text>
        : <FlatList
            data={inscritas}
            ItemSeparatorComponent={() => <Text />}
            keyExtractor={tutoria => tutoria.id}
            renderItem={({ item: tutoria }) => <TutoriaItem tutoria={tutoria} />}
          />}
    </View>
  )
}
