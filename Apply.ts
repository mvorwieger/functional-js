export interface Apply<T> extends Functor<T> {
    apply<U>(functorFunction: Functor<(f: T) => U>): Apply<U>
}


