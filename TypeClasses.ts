import {Functor} from "./Functor"
import {Apply} from "./Apply"
import {Applicative } from "./Applicative";

// How a implementation of a Singly Linked List would look like
class List<T> implements Functor<T>{
  constructor(public readonly value: T,
    public readonly pointer: List<T> | undefined) { }

  static of<T>(value: T, pointer: List<T> | undefined): List<T> {
    return new List<T>(value, pointer);
  }

  map<U>(f: (fn: T) => U): List<U> {
    return this.pointer ? List.of<U>(f(this.value), this.pointer.map(f))
      : List.of<U>(f(this.value), List.empty())
  }

  static empty() {
      return undefined
  }
}

class Maybe<T> implements Functor<T>, Apply<T>{
    constructor(public readonly value: T) {}

    static of<T>(value: T) {
        return new Maybe<T>(value)
    }

    map<U>(fn:(f: T) => U): Maybe<U> {
        return Maybe.of<U>(fn (this.value))
    }
    
    apply<U>(functorFunction: Maybe<(f: T) => U>): Maybe<U> {
        return functorFunction.map(f => f (this.value)) 
    }

}

class Tree<T> implements Functor<T> {
    constructor(public readonly value: T, 
                public readonly left: Tree<T> | undefined, 
                public readonly right: Tree<T> | undefined){
    }

    static of<T>(value: T,
                 left: Tree<T> | undefined,
                 right: Tree<T> | undefined
                ): Tree<T> {
        return new Tree<T>(value, left, right)
    }

    map<U>(f: (fn: T) => U): Tree<U> {
        return Tree.of<U>(
                   f (this.value), 
                   this.left  ? this.left.map<U>  (f): Tree.empty(), 
                   this.right ? this.right.map<U> (f): Tree.empty()
               )
    }

    static empty() {
        return undefined;
    }
}

// now we can define fmap for every Functor
// @ts-ignore
const fmap = (fn: (any) => any, functor: Functor<any>) => functor.map(fn)

// or we can even go further and construct a typesafe version of fmap
type FunctorFunction<T, U> = (fn: T) => U
const fmapT = <T, U>(fn: FunctorFunction<T, U>, functor: Functor<T>): Functor<U> => functor.map<U>(fn)

// Now we can go ahead and see the typesafe version in action:
// Try to change <number, string> to <number, number> 
// and see how it throws you an Error on compile Time
const list = List.of(5, List.of(2, List.of(20, undefined)))
const tree = Tree.of(5, 
                     Tree.of(10, 
                             undefined, 
                             Tree.of(
                                 10,
                                 undefined,
                                 undefined
                             )
                            ),
                     undefined
                    )

const resultList = fmapT<number, string>(String, tree)
const resultTree = fmapT<number, string>(String, list)

console.log(resultList)
console.log(resultTree)
console.log(Maybe.of(5).apply(Maybe.of((a: number) => a +5)))
