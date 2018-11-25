interface Functor<T> {
  map<U>(f: (T) => U): Functor<U>
}

// How a implementation of a Singly Linked List would look like
class Tree<T> implements Functor<T> {
  constructor(public readonly value: T,
    public readonly pointer: Tree<T> | undefined) { }

  static of<T>(value: T, pointer: Tree<T> | undefined): Tree<T> {
    return new Tree<T>(value, pointer);
  }

  map<U>(f: (T) => U): Tree<U> {
    return this.pointer ? Tree.of<U>(f(this.value), this.pointer.map(f))
      : Tree.of<U>(f(this.value), undefined)
  }
}

// now we can define fmap for every Functor
const fmap = (fn: (any) => any, functor: Functor<any>) => functor.map(fn)

// we can even go further and construct a typesafe version of fmap

type FunctorFunction<T, U> = (T) => U
const fmapT = <T, U>(fn: FunctorFunction<T, U>, functor: Functor<T>): Functor<U> => functor.map<U>(fn)


// Now we can go ahead and see the typesafe version in action:
const tree = Tree.of(5, Tree.of(2, Tree.of(20, undefined)))
fmapT<number, string>(String, tree)

// And how it would prevent erros:
console.log(fmapT<number, number>(a => a + "test", tree))

