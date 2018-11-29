import {Apply} from "./Apply"

export interface Applicative<T> extends Apply<T> {
    // TODO: of / pure should be static methods 
    // but there is no way atm for static methods in interfaces
    of(a: T): Applicative<T>
}
