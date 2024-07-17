# R E C O I L - N E X U S

##### <div align="right">by [Luis Antonio Canettoli Ordoñez](http://luisanton.io)</div>

If you have been using **[recoil](https://recoiljs.org/)** for a while, you might have faced that outside React Components it's not possible to get or update values from atoms.

This Typescript implementation will workaround the issue and let you do so.

## Live Example

- [Simple Loader Example](https://codesandbox.io/s/github/luisanton-io/simple-loader-with-nexus)

## Install

**npm**

`npm i recoil-nexus`

**yarn**

`yarn add recoil-nexus`

## Usage

### 1. Add `RecoilNexus` in your `RecoilRoot`

```tsx
import React from "react";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

export default function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />

      {/* ... */}
    </RecoilRoot>
  );
}

export default App;
```

### 2. Use the following methods to get/set values passing your atom as a parameter.

| Method      | Returns                                                   |
| :---------- | :-------------------------------------------------------- |
| `getRecoil` | getter function |
| `getRecoilPromise` | getter function, returns a promise. To be used with asynchronous selectors. |
| `setRecoil` | setter function, pass value to be set or updater function as second parameter |
| `resetRecoil` | pass atom as parameter to reset to default value |

Read current state:
```tsx
const loading = getRecoil(loadingState);
```

Setting the new state like this is not inherently wrong: 
```tsx
setRecoil(loadingState, !loading);
```
However, if the new state depends on the previous one (like in this case), preferably use an
updater function to correctly batch React state updates, as reading and
updating the state at the same time could lead to [unexpected results](https://github.com/luisanton-io/recoil-nexus/issues/33).
```tsx
import { setRecoil } from "recoil-nexus"

export function toggleLoader() {
  setRecoil(loadingState, loading => !loading)
}
```

## Test Setup

### Jest

When testing in [Jest](https://jestjs.io), we need to set `"transformIgnorePatterns": []` in our jest config, otherwise a `SyntaxError: Cannot use import statement outside a module` will cause the tests to fail. This can be acheived one of the following ways, depending on how you are defining your jest config:

```
export default config
```
- in `jest.config.js`
```
"transformIgnorePatterns": []
```

- in the top level of the `package.json`
```
"jest": {
  "transformIgnorePatterns": []
},
```
---

### Credits

Kudos to [VeepCream](https://github.com/VeepCream)'s [recoil-outside](https://github.com/VeepCream/recoil-outside) original idea and Javascript implementation.   
In this Typescript port/enhancement, I decided to remove RxJS and rely on native Recoil promises and loadables only.
