exports.to = promise => promise.then( x => [ null, x ] ).catch( e => [ e ] );

// const to = <T>(promise: Promise<T>): Promise<[null | Error, T | undefined]> =>
//   promise
//     .then((res) => [null, res] as [null, T])
//     .catch((e) => [e, undefined] as [Error, undefined]);
