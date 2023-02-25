namespace RandomItem {
    type Selection<T> = [T, T, ...T[]] | Set<T> & { size: 2 | greater };

    interface Props {
        selection: Selection;
        interval: number;
    }
}
