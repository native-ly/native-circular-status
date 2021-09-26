import React from 'react'
import { render } from '@testing-library/react-native'

import NativeCircularStatus from '../src'

describe('NativeCircularStatus', () => {
  it('should render component', () => {
    const { toJSON } = render(<NativeCircularStatus progress={0} />)

    expect(toJSON()).toMatchSnapshot()
  })

  it.todo('normal thinking')
  it.todo('normal disabled')
  it.todo('normal uncontrolled')
  it.todo('normal renderContent')
  it.todo('normal custom iconPause, iconPlay')
  it.todo('compact')
  it.todo('compact thinking')
  it.todo('compact disabled')
  it.todo('compact uncontrolled')
})
