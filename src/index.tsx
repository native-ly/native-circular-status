import Icon from 'native-icons'
import React, { useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress'
// import Color from 'color'

// TODO add discriminated union types
interface NativeCircularStatusProps {
  iconPause?: string
  iconPlay?: string
  paused?: boolean
  renderIcon?: (progress: number, paused: boolean) => React.ReactNode // ? rename
  progress: number
  animated?: boolean
  // animationDuration?: number
  color?: string
  // placeholderColor?: string;
  onPause?: () => void
  onPlay?: () => void
  thinking?: boolean
  disabled?: boolean
}

const NativeCircularStatus = ({
  iconPause = 'square',
  iconPlay = 'pause',
  paused,
  renderIcon,
  progress,
  // size/variant // TODO
  animated,
  // animationDuration,
  color = '#fb2c53',
  // placeholderColor,
  onPause,
  onPlay,
  thinking,
  disabled,
}: NativeCircularStatusProps) => {
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
        // TODO center
        // style={{paddingLeft: 1}}
      />
    )
  }, [color, iconPause, iconPlay, paused, progress, renderIcon, thinking])

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.wrapper,
        disabled ? styles.wrapperDisabled : {},
      ])}
    >
      {/* TODO add option show text */}
      <View style={styles.content}>{innerComponent}</View>

      {!thinking && <View style={styles.placeholder} />}

      <Progress.Circle
        animated={animated}
        indeterminate={thinking}
        // indeterminateAnimationDuration={animationDuration}
        borderWidth={!thinking ? 0 : undefined}
        borderColor={color}
        color={color}
        progress={progress}
        // showsText // TODO
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
  wrapperDisabled: {
    opacity: 0.5,
  },
  // TODO create base for content, placeholder
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    borderRadius: 20, // TODO
    borderWidth: 3, // TODO
    borderColor: '#ddd', // TODO
    width: '100%', // TODO
    height: '100%', // TODO
    position: 'absolute',
  },
})

export default NativeCircularStatus
