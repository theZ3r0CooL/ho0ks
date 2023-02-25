import { useEffect, useState } from 'react';

const useRandomItem = ({ selection, interval }: RandomItem.Props) => {

    const [selectionArray, updateSelectionArray] = useState(Array.from(selection));
    if (selectionArray.length < 2) {
        throw new Error('`selection` must contain at least two(2) options.');
    }
    const [randomItem, setRandomItem] = useState(selectionArray[Math.floor(Math.random() * selectionArray.length)]);

    useEffect(() => {
        updateSelectionArray(Array.from(selection));
    }, [selection]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomItem((prevItem: typeof randomItem) => {
                let next = selectionArray[Math.floor(Math.random() * selectionArray.length)];
                while (next === prevItem) {
                    next = selectionArray[Math.floor(Math.random() * selectionArray.length)];
                }
                return next;
            });
        }, interval);

        return () => clearInterval(intervalId);
    }, [selectionArray, interval]);

    return randomItem;
};

export default useRandomItem;
