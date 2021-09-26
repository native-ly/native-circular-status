# [Native Circular Status](https://github.com/native-ly/native-circular-status)

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

| Name                 | Type                                                                                                                                                       | Default     | Description                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| **progress**         | number                                                                                                                                                     | ` `         | Progress value                                                   |
| **iconPause**        | [Ionicon icon name](https://ionic.io/ionicons) or [icon name for other selected icon type](https://github.com/native-ly/native-icons#available-icon-types) | `square`    | Icon visible when paused status is `true`                        |
| **iconPlay**         | [Ionicon icon name](https://ionic.io/ionicons) or [icon name for other selected icon type](https://github.com/native-ly/native-icons#available-icon-types) | `pause`     | Icon visible when paused status is `false`                       |
| **paused**           | boolean                                                                                                                                                    | `false`     | Prop to play/pause progress action                               |
| **renderContent**    | ({ progress, paused }) => React.ReactNode                                                                                                                  | `undefined` | Custom content renderer                                          |
| **variant**          | 'normal' or 'compact'                                                                                                                                      | `normal`    | Prop to define progress variant - [`normal`](#), [`compact`](#)  |
| **animated**         | boolean                                                                                                                                                    | `true`      | Prop to enable/disable animation                                 |
| **color**            | string                                                                                                                                                     | `#fb2c53`   | Color for the progress element                                   |
| **placeholderColor** | string                                                                                                                                                     | `#eeeeef`   | Color for the placeholder element                                |
| **onPause**          | () => void                                                                                                                                                 | `undefined` | Callback when status changed from play to pause                  |
| **onPlay**           | () => void                                                                                                                                                 | `undefined` | Callback when status changed from pause to play                  |
| **onStatusChanged**  | (paused: boolean) => void                                                                                                                                  | `undefined` | Callback when status changed from play to pause or pause to play |
| **thinking**         | boolean                                                                                                                                                    | `false`     | Prop to enable/disable thinking (loading) animation              |
| **contentProps**     | [ViewProps](https://reactnative.dev/docs/view#props)                                                                                                       | `{}`        | Props for the content element                                    |
| **iconProps**        | [IconProps](https://github.com/native-ly/native-icons#icon)                                                                                                | `{}`        | Props for the icon element                                       |
| **placeholderProps** | [ViewProps](https://reactnative.dev/docs/view#props)                                                                                                       | `{}`        | Props for the placeholder element                                |
| **progressProps**    | [CirclePropTypes](https://github.com/oblador/react-native-progress#progresscircle)                                                                         | `{}`        | Props for the progress element                                   |

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
