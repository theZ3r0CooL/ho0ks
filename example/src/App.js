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
