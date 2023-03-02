namespace RandomItem {

    /** An object holding a collection of items to choose from */
    type Selection<T> = [T, T, ...T[]] | Set<T> & { size: 2 | greater };

    /** The parameters passed to `useRandomItem` */
    interface Props {
        /** The collection of items to choose from */
        selection: Selection;
        /** The amount of time in mS to update the current selection */
        interval: number;
    }

    /** The return value of `useRandomItem` */
    interface Returns {
        /** The current random selection from the provided collection */
        randomItem: T
    }
}

namespace TrackLimit {

    /** An object holding two numbers */
    type Limits = {
        /** The largest value */
        top: number,
        /** The smallest value */
        bottom: number
    };

    /** Callback to add more numbers to the sample */
    type AddValueCallback = (newValue: number) => void;

    /** The parameters passed to `useTrackLimit` */
    interface Props {
        /**
         * The initial sample of number(s)
         * @defaultValue 0
         */
        initialValues?: number | number[] | Set<number>;
    }

    /** The return value of `useTrackLimit` */
    interface Returns {
        /** The most recent largest (`top`) and smallest (`bottom`) numbers to be added */
        limits: Limits;
        /** Callback to add more numbers to the sample */
        addValue: AddValueCallback;
    }
}
