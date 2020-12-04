# R E C O I L - N E X U S 
##### <div align="right">by [Luis Antonio Canettoli Ordoñez](http://luisanton.io)</div>
If you have been using **[recoil](https://recoiljs.org/)** for a while, you might have faced it: outside React Components, it's not possible to get or update values from atoms.

This Typescript implementation relying on **[RxJS](https://rxjs-dev.firebaseapp.com/guide/overview)** will workaround this issue and let you do so.

## Live Example

- [Simple Loader Example](https://codesandbox.io/s/quirky-euclid-qnvzw)

## Install

**npm**

`npm i recoil-nexus`

**yarn**

`yarn add recoil-nexus`

## Usage

### 1. Add `RecoilNexus` as children of `RecoilRoot`

```tsx
import React from 'react';
import { RecoilRoot } from "recoil"
import RecoilNexus from 'recoil-nexus'

export default function App() {
  return (
    <RecoilRoot>
      <RecoilNexus/>
      
      {/* ... */}
      
    </RecoilRoot>
  );
};


export default App;
```

### 2. Use hooks to get/set values: keep in mind that the GET value will return a Promise.

<br/>

| Hook | Returns |
| :------------- | :----------- |
| `useRecoilNexus` 	| getter/setter tuple 	|
| `useRecoilNexusValue` 	| getter only, which will return a promise 	|
| `useRecoilNexusSetValue` 	| setter function 	|

<br/>

```tsx
// Loading example
import { loadingState } from '../atoms/loadingState'
import { useRecoilNexus } from 'recoil-nexus'

export default async function toggleLoading() {

  const [getLoading, setLoading] = useRecoilNexus(loadingState) 
  const loading = await getLoading()
 
  setLoading(!loading)
  
}
```

```tsx
//Loader
import React from 'react'
import { useRecoilNexus } from 'recoil-nexus'

export default function Loader() {
  loading = useRecoilValue(loadingState)
  return loading ? <h3>Loading...</h3> : null
}

```

```tsx
//Atom
import { atom } from "recoil";

export const loadingState = atom({
    key: 'LOADING',
    default: false
})
  
```

## ESLint Warning
Despite these hooks are fully functional, they **will trigger ESLint rules**.

```
React Hook "useRecoilNexus" cannot be called at the top level. 
React Hooks must be called in a React function component or a custom React Hook function  

react-hooks/rules-of-hooks
```

```
React Hook "useRecoilNexus" is called in function "toggleLoading" which is 
neither a React function component or a custom React Hook function  

react-hooks/rules-of-hooks
```

### To workaround this you can either:
- import with an alias
```tsx
import { useRecoilNexus as üseRecoilNexus } from 'recoil-nexus'
```
- or disable es-lint rule for the single line:
```tsx
// eslint-disable-next-line react-hooks/rules-of-hooks
```
- or disable the Hooks Rule for the whole file (...not recommended):
```tsx
/* eslint-disable react-hooks/rules-of-hooks */
```
_____________
### Credits

This is a Typescript port + enhancement of [VeepCream](https://github.com/VeepCream)'s [recoil-outside](https://www.npmjs.com/package/recoil-outside).
