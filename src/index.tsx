import Icon from 'native-icons'
import { useCallback, useMemo } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

interface NativeCircularStatusProps {
  iconPause?: string
  iconPlay?: string
  paused?: boolean
  renderIcon?: (progress: number, paused: boolean) => React.ReactNode // ? rename
  progress: number
  animated?: boolean
  color?: string // ?
  // colorPrimary: string;
  // colorSecondary: string;
  onPause?: () => void
  onPlay?: () => void
  thinking?: boolean
  // disabled: boolean;
  // onThinking: () => void;
  animationDuration?: number
}

const NativeCircularStatus = ({
  iconPause = 'square',
  iconPlay = 'pause',
  paused,
  renderIcon,
  progress,
  // animated,
  // color,
  onPause,
  onPlay,
  thinking,
  // animationDuration,
}: NativeCircularStatusProps) => {
  // const [status, setStatus] = useState(paused ? 'paused' : 'playing');

  const handlePress = useCallback(() => {
    if (paused) {
      onPlay?.()
    } else {
      onPause?.()
    }
  }, [])

  const innerComponent = useMemo(() => {
    if (thinking) {
      return null
    }

    if (renderIcon) {
      return renderIcon(progress, paused)
    }

    return <Icon name={paused ? iconPlay : iconPause} />
  }, [])

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handlePress}>
      {innerComponent}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
})

export default NativeCircularStatus
