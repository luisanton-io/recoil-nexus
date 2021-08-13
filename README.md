# R E C O I L - N E X U S

##### <div align="right">by [Luis Antonio Canettoli Ordoñez](http://luisanton.io)</div>

#### Working with Recoil up to version 0.1.3

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
| `getRecoil` | getter function, returns a promise                        |
| `setRecoil` | setter function, pass value to be set as second parameter |

```tsx
// Loading example
import { loadingState } from "../atoms/loadingState";
import { getRecoil, setRecoil } from "recoil-nexus";

export default async function toggleLoading() {
  const loading = await getRecoil(loadingState);
  setRecoil(loadingState, !loading);
}
```

```tsx
//Loader
import React from "react";
import { useRecoilValue } from "recoil";

export default function Loader() {
  loading = useRecoilValue(loadingState);
  return loading ? <h3>Loading...</h3> : null;
}
```

```tsx
//Atom
import { atom } from "recoil";

export const loadingState = atom({
  key: "LOADING",
  default: false,
});
```

---

### Credits

Original credits to [VeepCream](https://github.com/VeepCream)'s [recoil-outside](https://www.npmjs.com/package/recoil-outside) Javascript implementation.
In this Typescript package, I decided to remove RxJS and rely on promises only.
