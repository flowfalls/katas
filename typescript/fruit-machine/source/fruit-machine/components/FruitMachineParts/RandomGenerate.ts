enum Options {
	A = "🍒",
	B = "🍑",
	C = "🥝",
	D = "🍋",
	E = "🍎"
}

function randomEnum<T>(anEnum: T): T[keyof T] {
	const enumValues = (Object.values(anEnum as Object) as unknown) as T[keyof T][];
	const randomIndex = Math.floor(Math.random() * enumValues.length);

	return enumValues[randomIndex]!;
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
& { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

export type Game = FixedLengthArray<[string, string, string, string]>;
export {Options, randomEnum}
