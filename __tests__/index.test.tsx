import React from 'react'
import { Text } from 'react-native'
import { fireEvent, render } from '@testing-library/react-native'

import NativeCircularStatus from '../src'

describe.each([0, 0.4, 1])(
  'NativeCircularStatus with progress %d',
  (progress) => {
    describe.each(['normal', 'compact', undefined] as const)('', (variant) => {
      it('should render component', () => {
        const { toJSON } = render(
          <NativeCircularStatus variant={variant} progress={progress} />
        )

        expect(toJSON()).toMatchSnapshot()
      })

      it('should render component', () => {
        const { toJSON } = render(
          <NativeCircularStatus progress={progress} variant={variant} />
        )

        expect(toJSON()).toMatchSnapshot()
      })

      it('normal thinking', () => {
        const { toJSON } = render(
          <NativeCircularStatus
            progress={progress}
            variant={variant}
            onPause={}
            onPlay={}
            onStatusChanged={}
            thinking
          />
        )

        expect(toJSON()).toMatchSnapshot()
      })

      it('normal disabled', () => {
        const { toJSON } = render(
          <NativeCircularStatus
            progress={progress}
            variant={variant}
            onPause={}
            onPlay={}
            onStatusChanged={}
            disabled
          />
        )

        fireEvent.press()

        expect(toJSON()).toMatchSnapshot()
      })

      it('normal renderContent', () => {
        const { toJSON } = render(
          <NativeCircularStatus
            progress={progress}
            variant={variant}
            renderContent={(progress, paused) => (
              <Text style={{ color: paused ? 'red' : 'green' }}>
                {progress}
              </Text>
            )}
          />
        )

        expect(toJSON()).toMatchSnapshot()
      })

      it.each([
        {
          pause: 'close',
          play: 'play',
        },
        {
          pause: undefined,
          play: 'checkmark',
        },
        {
          pause: 'hand-right',
          play: undefined,
        },
      ])('normal custom iconPause, iconPlay', ({ pause, play }) => {
        const { toJSON } = render(
          <NativeCircularStatus
            progress={progress}
            variant={variant}
            iconPause={pause}
            iconPlay={play}
          />
        )

        expect(toJSON()).toMatchSnapshot()
      })

      // it('compact', () => {
      //   const { toJSON } = render(
      //     <NativeCircularStatus progress={progress} variant="compact" />
      //   )

      //   expect(toJSON()).toMatchSnapshot()
      // })

      // it('compact thinking', () => {
      //   const { toJSON } = render(
      //     <NativeCircularStatus progress={progress} variant="compact" />
      //   )

      //   expect(toJSON()).toMatchSnapshot()
      // })

      // it('compact disabled', () => {
      //   const { toJSON } = render(
      //     <NativeCircularStatus
      //       progress={progress}
      //       variant="compact"
      //       disabled
      //     />
      //   )

      //   expect(toJSON()).toMatchSnapshot()
      // })
    })
  }
)
