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
<!-- TODO add more similar projects -->

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

<!-- TODO -->

| **name**         | **type**              | **default** | **description** |
| ---------------- | --------------------- | ----------- | --------------- |
| progress         | number                |             |                 |
| iconPause        |                       |             |                 |
| iconPlay         |                       |             |                 |
| paused           | boolean               | `false`     |                 |
| renderContent    |                       |             |                 |
| variant          | 'normal' or 'compact' | `normal`    |                 |
| animated         | boolean               | `true`      |                 |
| color            | string                | `#fb2c53`   |                 |
| placeholderColor | string                | `#eeeeef`   |                 |
| onPause          |                       |             |                 |
| onPlay           |                       |             |                 |
| onStatusChanged  |                       |             |                 |
| thinking         | boolean               | `false`     |                 |
| contentProps     |                       |             |                 |
| iconProps        |                       |             |                 |
| placeholderProps |                       |             |                 |
| progressProps    |                       |             |                 |

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
