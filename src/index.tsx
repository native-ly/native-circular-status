import Icon from 'native-icons'
import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity, StyleSheet, View, ViewProps } from 'react-native'
import * as Progress from 'react-native-progress'
import type { IconProps } from 'react-native-vector-icons/Icon'
// import Color from 'color'

const DEFAULTS = {
  ICON_PAUSE: 'square',
  ICON_PLAY: 'pause',
  COLOR: '#fb2c53',
}

type Variant = 'normal' | 'compact'

// TODO add discriminated union types
interface NativeCircularStatusProps {
  progress: number
  iconPause?: string
  iconPlay?: string
  paused?: boolean
  renderContent?: (progress: number, paused: boolean) => React.ReactNode
  variant?: Variant
  animated?: boolean
  color?: string
  placeholderColor?: string
  onPause?: () => void
  onPlay?: () => void
  thinking?: boolean
  disabled?: boolean
  showText?: boolean
  containerProps?: ViewProps
  contentProps?: ViewProps
  iconProps?: Partial<IconProps>
  placeholderProps?: ViewProps
  progressProps?: Progress.CirclePropTypes
}

const NativeCircularStatus = ({
  progress,
  iconPause = DEFAULTS.ICON_PAUSE,
  iconPlay = DEFAULTS.ICON_PLAY,
  paused = false,
  renderContent,
  variant = 'normal',
  animated = true,
  color = DEFAULTS.COLOR,
  placeholderColor = '#eeeeef',
  onPause,
  onPlay,
  thinking = false,
  disabled = false,
  showText = false,
  containerProps = {},
  contentProps = {},
  iconProps = {},
  placeholderProps = {},
  progressProps = {},
}: NativeCircularStatusProps) => {
  const handlePress = useCallback(() => {
    if (paused) {
      onPlay?.()
    } else {
      onPause?.()
    }
  }, [onPause, onPlay, paused])

  const size = useMemo(() => {
    switch (variant) {
      case 'compact':
        return 12

      case 'normal':
      default:
        return 32
    }
  }, [variant])

  const { style: containerStyle = {}, ...restContainerProps } = containerProps
  const { style: contentStyle = {}, ...restContentProps } = contentProps
  // const { style: iconStyle = {}, ...restIconProps } = iconProps;
  const { style: placeholderStyle = {}, ...restPlaceholderProps } =
    placeholderProps

  const innerComponent = useMemo(() => {
    if (renderContent) {
      return renderContent(progress, !!paused)
    }

    return (
      <Icon
        type="ionicons"
        size={12} // TODO
        color={color}
        name={paused ? iconPlay : iconPause}
        // TODO center
        // style={{paddingLeft: 1}}
        {...iconProps}
      />
    )
  }, [color, iconPause, iconPlay, iconProps, paused, progress, renderContent])

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles({ size }).container,
        disabled ? styles({ size }).containerDisabled : {},
        containerStyle,
      ])}
      {...restContainerProps}
    >
      {(!showText || !thinking) && variant === 'normal' && (
        <View
          style={StyleSheet.flatten([
            styles({ size }).content,
            styles({ size }).absoluteElement,
            contentStyle,
          ])}
          {...restContentProps}
        >
          {innerComponent}
        </View>
      )}

      {!thinking && (
        <View
          style={StyleSheet.flatten([
            styles({ size }).placeholder,
            styles({ size }).absoluteElement,
            placeholderStyle,
          ])}
          {...restPlaceholderProps}
        />
      )}

      <Progress.Circle
        animated={animated}
        indeterminate={thinking && variant === 'normal'}
        borderWidth={!thinking ? 0 : undefined}
        borderColor={color}
        color={color}
        progress={progress}
        size={size}
        showsText={!thinking && showText && variant === 'normal'} // TODO
        {...progressProps}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create(({ placeholderColor = '#eeeeef', size }) => ({
  container: {
    position: 'relative',
    width: size,
    height: size,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    borderRadius: size / 2,
    borderColor: placeholderColor,
    borderWidth: 3,
  },
  absoluteElement: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
}))

export default NativeCircularStatus
