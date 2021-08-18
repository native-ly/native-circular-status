import Icon from 'native-icons'
import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

interface NativeCircularStatusProps {
  iconPause?: string
  iconPlay?: string
  paused?: boolean
  renderIcon?: (progress: number, paused: boolean) => React.ReactNode // ? rename
  progress: number
  animated?: boolean
  animationDuration?: number
  color?: string // ?
  // colorPrimary: string;
  // colorSecondary: string;
  onPause?: () => void
  onPlay?: () => void
  thinking?: boolean
  // disabled: boolean;
  // onThinking: () => void;
}

const NativeCircularStatus = ({
  iconPause = 'square',
  iconPlay = 'pause',
  paused,
  renderIcon,
  progress,
  // size/variant // TODO
  // animated,
  // animationDuration,
  // color,
  onPause,
  onPlay,
  thinking,
}: NativeCircularStatusProps) => {
  // const [status, setStatus] = useState(paused ? 'paused' : 'playing');

  const handlePress = useCallback(() => {
    if (paused) {
      onPlay?.()
    } else {
      onPause?.()
    }
  }, [onPause, onPlay, paused])

  const innerComponent = useMemo(() => {
    if (thinking) {
      return null
    }

    if (renderIcon) {
      return renderIcon(progress, !!paused)
    }

    return <Icon name={paused ? iconPlay : iconPause} />
  }, [iconPause, iconPlay, paused, progress, renderIcon, thinking])

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
