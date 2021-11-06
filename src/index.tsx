import Icon from 'native-icons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
  COLOR_PRIMARY: '#fb2c53',
  COLOR_SECONDARY: '#efefef',
}

const PROGRESS_WIDTH = 2
const ICON_SIZE = 10

const SIZES = {
  COMPACT: 12,
  NORMAL: 28,
}

type Variant = 'normal' | 'compact'

interface RenderContentParams {
  readonly progress: number
  readonly paused?: boolean
  readonly thinking?: boolean
}

interface NativeCircularStatusProps
  extends RenderContentParams,
    TouchableOpacityProps {
  readonly iconPause?: string
  readonly iconPlay?: string
  readonly iconThinking?: string
  readonly icon?: string
  renderContent?: ({ progress, paused }: RenderContentParams) => React.ReactNode
  readonly variant?: Variant
  readonly animated?: boolean
  readonly strokeRound?: boolean
  readonly colorPrimary?: string
  readonly colorSecondary?: string
  onPause?: (thinking: boolean) => void
  onPlay?: (thinking: boolean) => void
  onStatusChanged?: ({
    paused,
    thinking,
  }: Required<Omit<RenderContentParams, 'progress'>>) => void
  readonly disabled?: boolean
  readonly contentProps?: ViewProps
  readonly iconProps?: Partial<IconProps>
  readonly placeholderProps?: ViewProps
  readonly progressProps?: Progress.CirclePropTypes
}

const NativeCircularStatus = ({
  progress,
  iconPause = DEFAULTS.ICON_PAUSE,
  iconPlay = DEFAULTS.ICON_PLAY,
  iconThinking,
  icon,
  paused,
  renderContent,
  variant = 'normal',
  animated = true,
  strokeRound = true,
  colorPrimary = DEFAULTS.COLOR_PRIMARY,
  colorSecondary = DEFAULTS.COLOR_SECONDARY,
  onPause,
  onPlay,
  onStatusChanged,
  thinking = false,
  disabled,
  contentProps = {},
  iconProps = {},
  progressProps = {},
  ...containerProps
}: NativeCircularStatusProps) => {
  const [isLocalPaused, setIsLocalPaused] = useState(false)

  useEffect(() => {
    if (paused !== undefined) {
      setIsLocalPaused(paused)
    }
  }, [paused])

  const handlePress = useCallback(() => {
    setIsLocalPaused((prevState) => {
      const updatedState = thinking ? prevState : !prevState

      if (prevState) {
        onPlay?.(thinking)
      } else {
        onPause?.(thinking)
      }

      onStatusChanged?.({ paused: updatedState, thinking })

      return updatedState
    })
  }, [onPause, onPlay, onStatusChanged, thinking])

  const size = useMemo(() => {
    switch (variant) {
      case 'compact':
        return SIZES.COMPACT

      case 'normal':
      default:
        return SIZES.NORMAL
    }
  }, [variant])

  const { style: containerStyle = {}, ...containerRest } = containerProps
  const { style: contentStyle = {}, ...contentRest } = contentProps
  const { style: iconStyle = {}, ...iconRest } = iconProps

  const innerComponent = useMemo(() => {
    if (renderContent) {
      return renderContent({ progress, paused: isLocalPaused, thinking })
    }

    if (thinking && !iconThinking && !icon) {
      return null
    }

    if (isLocalPaused && !iconPlay && !icon) {
      return null
    }

    if (!isLocalPaused && !iconPause && !icon) {
      return null
    }

    return (
      <Icon
        type="ionicons"
        size={ICON_SIZE}
        color={colorPrimary}
        name={isLocalPaused ? iconPlay : iconPause}
        style={StyleSheet.flatten([styles.icon, iconStyle])}
        {...iconRest}
      />
    )
  }, [
    renderContent,
    thinking,
    iconThinking,
    icon,
    isLocalPaused,
    iconPlay,
    iconPause,
    colorPrimary,
    iconStyle,
    iconRest,
    progress,
  ])

  const isNormal = useMemo(() => variant === 'normal', [variant])

  const isThinkingEnabled = useMemo(
    () => thinking && isNormal,
    [isNormal, thinking]
  )

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
      {...containerRest}
    >
      {(!thinking || (thinking && iconThinking)) && isNormal && (
        <View
          style={StyleSheet.flatten([
            styles.content,
            styles.absoluteElement,
            contentStyle,
          ])}
          {...contentRest}
        >
          {innerComponent}
        </View>
      )}

      <Progress.Circle
        animated={animated}
        indeterminate={isThinkingEnabled}
        borderWidth={isThinkingEnabled ? PROGRESS_WIDTH : 0}
        borderColor={colorSecondary}
        unfilledColor={isThinkingEnabled ? undefined : colorSecondary}
        color={colorPrimary}
        progress={progress}
        size={size}
        thickness={PROGRESS_WIDTH}
        fill="#00000000" // TODO remove when https://github.com/oblador/react-native-progress/issues/234 is fixed
        strokeCap={strokeRound ? 'round' : 'butt'}
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
  absoluteElement: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // TODO update or remove when https://github.com/oblador/react-native-vector-icons/issues/638#issuecomment-411349336 is fixed
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    lineHeight: ICON_SIZE,
    textAlign: 'center',
  },
})

export default NativeCircularStatus
