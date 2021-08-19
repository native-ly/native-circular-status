import Icon from 'native-icons'
import React, { useCallback, useMemo } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native'
import * as Progress from 'react-native-progress'
import type { IconProps } from 'react-native-vector-icons/Icon'

const DEFAULTS = {
  ICON_PAUSE: 'square',
  ICON_PLAY: 'pause',
  COLOR: '#fb2c53',
  PLACEHOLDER_COLOR: '#efefef',
}

const PROGRESS_WIDTH = 2

const SIZES = {
  COMPACT: 12,
  NORMAL: 28,
}

type Variant = 'normal' | 'compact'

interface NativeCircularStatusProps extends TouchableOpacityProps {
  readonly progress: number
  readonly iconPause?: string
  readonly iconPlay?: string
  readonly paused?: boolean
  renderContent?: (progress: number, paused: boolean) => React.ReactNode
  readonly variant?: Variant
  readonly animated?: boolean
  readonly color?: string
  readonly placeholderColor?: string
  onPause?: () => void
  onPlay?: () => void
  onStatusChanged?: (paused: boolean) => void
  readonly thinking?: boolean
  readonly contentProps?: ViewProps
  readonly iconProps?: Partial<IconProps>
  readonly placeholderProps?: ViewProps
  readonly progressProps?: Progress.CirclePropTypes
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
  placeholderColor = DEFAULTS.PLACEHOLDER_COLOR,
  onPause,
  onPlay,
  onStatusChanged,
  thinking = false,
  disabled,
  contentProps = {},
  iconProps = {},
  placeholderProps = {},
  progressProps = {},
  ...containerProps
}: NativeCircularStatusProps) => {
  const handlePress = useCallback(() => {
    if (thinking) {
      return
    }

    if (paused) {
      onPlay?.()
    } else {
      onPause?.()
    }

    onStatusChanged?.(!paused)
  }, [onPause, onPlay, onStatusChanged, paused, thinking])

  const size = useMemo(() => {
    switch (variant) {
      case 'compact':
        return SIZES.COMPACT

      case 'normal':
      default:
        return SIZES.NORMAL
    }
  }, [variant])

  const { style: containerStyle = {}, ...restContainerProps } = containerProps
  const { style: contentStyle = {}, ...restContentProps } = contentProps
  const { style: iconStyle = {}, ...restIconProps } = iconProps
  const { style: placeholderStyle = {}, ...restPlaceholderProps } =
    placeholderProps

  const innerComponent = useMemo(() => {
    if (renderContent) {
      return renderContent(progress, !!paused)
    }

    return (
      <Icon
        type="ionicons"
        size={10}
        color={color}
        name={paused ? iconPlay : iconPause}
        style={StyleSheet.flatten([{ paddingLeft: 1 }, iconStyle])}
        {...restIconProps}
      />
    )
  }, [
    color,
    iconPause,
    iconPlay,
    iconStyle,
    paused,
    progress,
    renderContent,
    restIconProps,
  ])

  const isNormal = useMemo(() => variant === 'normal', [variant])

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.container,
        {
          width: size,
          height: size,
        },
        disabled ? styles.containerDisabled : {},
        containerStyle,
      ])}
      {...restContainerProps}
    >
      {/* TODO? refactor */}
      {!thinking && isNormal && (
        <View
          style={StyleSheet.flatten([
            styles.content,
            styles.absoluteElement,
            contentStyle,
          ])}
          {...restContentProps}
        >
          {innerComponent}
        </View>
      )}

      {/* TODO refactor */}
      {!(thinking && isNormal) && (
        <View
          style={StyleSheet.flatten([
            styles.placeholder,
            styles.absoluteElement,
            {
              borderRadius: size / 2,
              borderColor: placeholderColor,
            },
            placeholderStyle,
          ])}
          {...restPlaceholderProps}
        />
      )}

      <Progress.Circle
        animated={animated}
        indeterminate={thinking && isNormal} // TODO refactor
        borderWidth={thinking && isNormal ? PROGRESS_WIDTH : 0} // TODO refactor
        borderColor={placeholderColor}
        color={color}
        progress={progress}
        size={size}
        thickness={PROGRESS_WIDTH}
        {...progressProps}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  containerDisabled: {
    opacity: 0.5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: PROGRESS_WIDTH,
  },
  absoluteElement: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

export default NativeCircularStatus
