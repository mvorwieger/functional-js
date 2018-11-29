import {Box} from "./Box"

export interface Functor<T> extends Box<T> {
    map<U>(f: (fn: T) => U): Functor<U>
}


