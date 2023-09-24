import React from 'react'
import { Text, View } from 'react-native'
import { AuthStore } from '../../utils/store'

export default function Admin () {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Bienvenido/a, {AuthStore.getRawState().user?.displayName}</Text>
    </View>
  )
}
