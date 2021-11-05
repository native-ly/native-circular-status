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
  COLOR_PRIMARY: '#fb2c53',
  COLOR_SECONDARY: '#efefef',
}

const PROGRESS_WIDTH = 2
const ICON_SIZE = 10

const SIZES = {
  COMPACT: 12,
  NORMAL: 28,
}

interface RenderContentParams {
  readonly progress: number
  readonly paused?: boolean
  readonly thinking?: boolean
}

interface BaseProps
  extends TouchableOpacityProps,
    Omit<RenderContentParams, 'progress' | 'paused'> {
  readonly animated?: boolean
  readonly strokeRound?: boolean
  readonly colorPrimary?: string
  readonly colorSecondary?: string
  readonly progressProps?: Progress.CirclePropTypes
}

interface NormalProps extends BaseProps, RenderContentParams {
  readonly variant: 'normal'
  readonly iconPause?: string
  readonly iconPlay?: string
  readonly iconThinking?: string
  readonly icon?: string
  renderContent?: ({
    progress,
    paused,
    thinking,
  }: Required<RenderContentParams>) => React.ReactNode
  onPause?: (thinking: boolean) => void
  onPlay?: (thinking: boolean) => void
  onStatusChanged?: ({
    paused,
    thinking,
  }: Required<Omit<RenderContentParams, 'progress'>>) => void
  readonly contentProps?: ViewProps
  readonly iconProps?: Partial<IconProps>
}

interface CompactProps extends BaseProps {
  readonly variant: 'compact'
}

type NativeCircularStatusProps = NormalProps | CompactProps

const NativeCircularStatus = ({
  variant = 'normal',
  animated = true,
  strokeRound = true,
  colorPrimary = DEFAULTS.COLOR_PRIMARY,
  colorSecondary = DEFAULTS.COLOR_SECONDARY,
  thinking = false,
  disabled,
  progressProps = {},
  ...containerProps
}: NativeCircularStatusProps) => {
  const [isLocalPaused, setIsLocalPaused] = useState(false)

  useEffect(() => {
    if ('paused' in containerProps) {
      if (containerProps.paused !== undefined) {
        setIsLocalPaused(containerProps.paused)
      }
    }
  }, [containerProps])

  const handlePress = useCallback(() => {
    setIsLocalPaused((prevState) => {
      const updatedState = thinking ? prevState : !prevState

      if (prevState) {
        if ('onPlay' in containerProps) {
          containerProps.onPlay?.(thinking)
        }
      } else {
        if ('onPause' in containerProps) {
          containerProps.onPause?.(thinking)
        }
      }

      if ('onStatusChanged' in containerProps) {
        containerProps.onStatusChanged?.({ paused: updatedState, thinking })
      }

      return updatedState
    })
  }, [containerProps, thinking])

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
  const { style: contentStyle = {}, ...contentRest } =
    'contentProps' in containerProps ? containerProps.contentProps || {} : {}
  const { style: iconStyle = {}, ...iconRest } =
    'iconProps' in containerProps ? containerProps.iconProps || {} : {}

  const innerComponent = useMemo(() => {
    if ('renderContent' in containerProps && containerProps.renderContent) {
      return containerProps.renderContent({
        progress: containerProps.progress,
        paused: isLocalPaused,
        thinking,
      })
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
    containerProps,
    thinking,
    isLocalPaused,
    colorPrimary,
    iconStyle,
    iconRest,
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
        progress={containerProps.progress}
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
