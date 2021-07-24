import { Text } from 'react-native'

export const HelloWorld = ({ text = 'Hello from iOS' }) => {
  return <Text>{text}</Text>
}
