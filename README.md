# ho0ks

<hr style='border-top: 3px solid #bbb;'/>

<div align='center'>

<img src='./assets/ho0ks-animated.svg' alt='Z3r0/' width='100%' height='auto' style='max-width: 20rem'/>
<h3 style='margin: 0;'>A Library of useful React Hooks written in TypeScript.</h3>

[//]: # ([![JavaScript Style Guide]&#40;https://img.shields.io/badge/code_style-standard-brightgreen.svg&#41;]&#40;https://standardjs.com&#41;)

![GitHub package.json version](https://img.shields.io/github/package-json/v/theZ3r0CooL/ho0ks)
[![NPM](https://img.shields.io/npm/v/ho0ks.svg)](https://www.npmjs.com/package/ho0ks)
![GitHub](https://img.shields.io/github/license/theZ3r0CooL/ho0ks)

![GitHub Sponsors](https://img.shields.io/github/sponsors/theZ3r0CooL?logo=GitHub)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/theZ3r0CooL)

</div>

<hr style='border-top: 3px solid #bbb;'/>

## Install

```bash
npm install --save ho0ks
```

## Usage

```tsx
import React, { useEffect } from 'react';

import { useRandomItem, useTrackLimit } from 'ho0ks';

const App = () => {

    // array of numbers from 0 to 9
    const valuesToUse = Array.from(Array(10).keys());
    // initialize the `useRandomItem` hook and first random item is returned
    const randomItem = useRandomItem(valuesToUse, 1000);

    // initialize the `useTrackLimit` hook initialized with first random number
    const { limits, addValue } = useTrackLimit({ initialValues: randomItem });

    // everytime randomItem changes,
    useEffect(() => {
        // add the new value to collection
        addValue(randomItem);
    }, [randomItem, addValue]);

    return (
        <div className='hook-list'>
            <div className='hook-output'>
                <h1>useRandomItem</h1>
                <h2>Random Item: {randomItem}</h2>
                <h3>(changes every second)</h3>
            </div>
            <div className='hook-output'>
                <h1>useTrackLimit</h1>
                <h2>Largest: {limits.top} Smallest: {limits.bottom}</h2>
                <h3>(changes every time a new limit is set)</h3>
            </div>
        </div>
    );
};

export default App;
```

## License

Apache-2.0 © 

## Contributors
>### theZ3r0CooL
>[GitHub](https://github.com/theZ3r0CooL)</br>
>[Portfolio](https://theZ3r0CooL.github.io)
