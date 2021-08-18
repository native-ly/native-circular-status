import React from 'react'
import { render } from '@testing-library/react-native'

import NativeCircularStatus from '../src'

// TODO
describe('NativeCircularStatus', () => {
  it('should render component', () => {
    const { toJSON } = render(<NativeCircularStatus progress={0} />)

    expect(toJSON()).toMatchSnapshot()
  })
})
