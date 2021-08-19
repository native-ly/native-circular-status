import Icon from 'native-icons'
import React, { useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Progress from 'react-native-progress/Circle'
import Color from 'color'

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
  disabled: boolean
  // onThinking: () => void;
}

const NativeCircularStatus = ({
  iconPause = 'square',
  iconPlay = 'pause',
  paused,
  renderIcon,
  progress,
  // play color -
  // pause color -
  // thinking color -
  // size/variant // TODO
  // TODO controlled/uncontrolled component
  animated,
  animationDuration,
  color = '#fb2c53',
  onPause,
  onPlay,
  thinking,
  disabled,
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

    return (
      <Icon
        type="ionicons"
        size={16} // TODO
        color={color}
        name={paused ? iconPlay : iconPause}
      />
    )
  }, [color, iconPause, iconPlay, paused, progress, renderIcon, thinking])

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.wrapper}
      onPress={handlePress}
    >
      <View style={styles.content}>{innerComponent}</View>

      <View style={styles.placeholder} />

      <Progress
        animated={animated}
        indeterminate={thinking}
        indeterminateAnimationDuration={animationDuration}
        borderWidth={!thinking ? 0 : undefined}
        borderColor={color}
        progress={progress}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: 40, // TODO
    height: 40, // TODO
  },
  placeholder: {
    borderRadius: 20, // TODO
    borderWidth: 3, // TODO
    borderColor: '#f0f', // TODO
    height: 40, // TODO
    width: 40, // TODO
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NativeCircularStatus
