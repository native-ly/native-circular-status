# [Native Circular Status](https://github.com/native-ly/native-circular-status) (WIP)

[![NPM version](https://flat.badgen.net/npm/v/native-circular-status)](https://www.npmjs.com/package/native-circular-status)
[![NPM downloads](https://flat.badgen.net/npm/dm/native-circular-status)](https://www.npmjs.com/package/native-circular-status)
[![NPM license](https://flat.badgen.net/npm/license/native-circular-status)](https://www.npmjs.com/package/native-circular-status)
[![run in expo snack](https://img.shields.io/badge/Run%20in%20Snack-4630EB?style=flat-square&logo=EXPO&labelColor=FFF&logoColor=000)](https://snack.expo.io/@jbiesiada/native-circular-status)
[![Codecov](https://flat.badgen.net/codecov/c/github/native-ly/native-circular-status)](https://codecov.io/gh/native-ly/native-circular-status)
[![Travis](https://flat.badgen.net/travis/native-ly/native-circular-status)](https://app.travis-ci.com/github/native-ly/native-circular-status)
[![Bundle size](https://flat.badgen.net/packagephobia/install/native-circular-status)](https://packagephobia.com/result?p=native-circular-status)

## About

Progress bar modeled on the animation from Apple Music and App Store on iOS

### Similar Projects

- [react-native-progress](https://github.com/oblador/react-native-progress) by [Joel Arvidsson](https://github.com/oblador)
- [React Native Progress Circle](https://github.com/MrToph/react-native-progress-circle) by [Christoph Michel](https://github.com/MrToph)
- [react-native-circular-progress](https://github.com/bartgryszko/react-native-circular-progress) by [Bart Gryszko](https://github.com/bartgryszko)
- [react-native-circular-progress-indicator](https://github.com/nithinpp69/react-native-circular-progress-indicator) by [nithinpp69](https://github.com/nithinpp69)

## How to Install

First, install the library in your project by npm:

```sh
npm install native-circular-status
```

Or Yarn:

```sh
yarn add native-circular-status
```

## Getting Started

**Connect the library with the project using ES6 import:**

```js
import NativeCircularStatus from 'native-circular-status'
```

## Options

Component extends [TouchableOpacityProps](https://reactnative.dev/docs/touchableopacity#props)

<!-- TODO update -->
<!-- TODO add links to prop types docs -->

| **name**         | **type**                                                                           | **default** | **description** |
| ---------------- | ---------------------------------------------------------------------------------- | ----------- | --------------- |
| progress         | number                                                                             | ` `         |                 |
| iconPause        |                                                                                    | `square`    |                 |
| iconPlay         |                                                                                    | `pause`     |                 |
| paused           | boolean                                                                            | `false`     |                 |
| renderContent    | (progress: number, paused: boolean) => React.ReactNode                             | `undefined` |                 |
| variant          | 'normal' or 'compact'                                                              | `normal`    |                 |
| animated         | boolean                                                                            | `true`      |                 |
| color            | string                                                                             | `#fb2c53`   |                 |
| placeholderColor | string                                                                             | `#eeeeef`   |                 |
| onPause          | () => void                                                                         | `undefined` |                 |
| onPlay           | () => void                                                                         | `undefined` |                 |
| onStatusChanged  | (paused: boolean) => void                                                          | `undefined` |                 |
| thinking         | boolean                                                                            | `false`     |                 |
| contentProps     | [ViewProps](https://reactnative.dev/docs/view#props)                               | `{}`        |                 |
| iconProps        | [IconProps](https://github.com/native-ly/native-icons#icon)                        | `{}`        |                 |
| placeholderProps | [ViewProps](https://reactnative.dev/docs/view#props)                               | `{}`        |                 |
| progressProps    | [CirclePropTypes](https://github.com/oblador/react-native-progress#progresscircle) | `{}`        |                 |

## Example

```jsx
import React, { useState } from 'react'
import NativeCircularStatus from 'native-circular-status'

const App = () => {
  const [paused, setPaused] = useState(false)

  return (
    <NativeCircularStatus
      progress={0.4}
      paused={paused}
      onPlay={() => setPaused(false)}
      onPause={() => setPaused(true)}
    />
  )
}

export default App
```

## License

This project is licensed under the MIT License © 2021-present Jakub Biesiada
