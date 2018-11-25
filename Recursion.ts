const compose = (...fn: Function[]) => (x: any) => 
    fn.reduce((g, f) => f (g), x)

const add5: (number) => number  = compose (
    a => a + 2,
    a => a + 3
)

const head = (list: any[]) => list [0]

type Func <T> = (T) => ((T) => any)
type oFunc<T> = (T) => (any)
type BiFunc <T, U> = (T) => (U) => any

const fold = <T> 
    ( fn: Func<T>    )   => 
    ( [x, ...xs]: T[])   => head (xs) ?
        fn (x) (fold (fn) (xs)) :
        x

const map  = <T> 
    ( fn: oFunc<T>   )   => 
    ( [x, ...xs]: T[])   => 
    x ?
        [fn (x), ...map (fn) (xs)] :
        []

const zipWith = <T, U>
    ( fn: BiFunc<T, U>)  =>
    ( [x, ...xs]: T[] )  =>
    ( [y, ...ys]: U[] )  =>
    x && y ?
        [fn (x) (y), ...zipWith (fn) (xs) (ys)] :
        []

const add = 
    ( x: number ) => 
    ( y: number ) => 
    x + y

console.log (
    zipWith <number, string>
    (a => b => a + b)
    ([1, 2, 3, 4])
    (["eins", "zwei", "drei", "vier"])
)

console.log (
    fold <number> 
    (a => b => a + b) 
    ([1, 2, 3, 4])
)

console.log (
    map <number> 
    (a => a / 2)     
    ([1, 2, 3, 4])
)
// Singly Linked list
type Tree <T> = undefined | {value: T, pointer: Tree<T>}
type F = (any) => any
type FMap <T> = (F) => (T) => (T)

const treeMap= <T> 
    (fn: Function) => 
    ({value, pointer} : Tree<T>) =>
    pointer ?
    {
        value: fn (value), 
        pointer: treeMap (fn) (pointer)
    } :
    {
        value: fn (value),
        pointer: undefined
    }

const numTree: Tree<number> = {
    value: 5,
    pointer: {
        value: 2,
        pointer: {
            value: 2, 
            pointer: undefined
        }
    }
}

console.log(treeMap<number> (add5) (numTree))
