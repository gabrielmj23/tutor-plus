import React from 'react'
import { Text, View } from 'react-native'
import { AuthStore } from '../../utils/store'

export default function Home () {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Hola {AuthStore.getRawState().user?.displayName}</Text>
    </View>
  )
}
