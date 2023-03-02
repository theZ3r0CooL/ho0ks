import { useCallback, useState } from 'react';

const useTrackLimit = ({ initialValues }: TrackLimit.Props): TrackLimit.Returns => {

    /** converts the {@link initialValues} to the {@link TrackLimit.Limits | limits} object used for tracking */
    const initialLimits = (): TrackLimit.Limits => {
        // if undefined return 0 for both limits
        if (!initialValues) return { top: 0, bottom: 0 };
        // if single number return it for both limits
        if (typeof initialValues === 'number') return { top: initialValues, bottom: initialValues };
        // if Array or Set make a new Array
        const input = Array.from(initialValues);
        // then return its max and min as top and bottom limits respectively
        return { top: Math.max.apply(null, input), bottom: Math.min.apply(null, input) };
    };

    const [limits, setLimits] = useState(initialLimits);

    const addValue: TrackLimit.AddValueCallback = useCallback((newValue) => {
        setLimits((prevLimits) => {
            return  {
                top: (newValue > prevLimits.top) ? newValue : prevLimits.top,
                bottom: (newValue < prevLimits.bottom) ? newValue : prevLimits.bottom
            };
        });
    }, [setLimits]);

    return { limits, addValue };
};

export default useTrackLimit;
