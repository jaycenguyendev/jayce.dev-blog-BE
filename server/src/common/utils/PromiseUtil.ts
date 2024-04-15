export class PromiseUtils {
  static settle<T extends unknown[] | []>(promises: T): Promise<{ [P in keyof T]: Awaited<T[P]> }> {
    return Promise.all(
      promises.map((p) =>
        Promise.resolve(p).then(
          (v) => ({
            state: 'fulfilled',
            value: v,
          }),
          (r) => ({
            state: 'rejected',
            reason: r,
          })
        )
      )
    ).then((results: any[]): any => {
      const rejected = results.find((result) => result.state === 'rejected');
      if (rejected) {
        return Promise.reject(rejected.reason);
      }
      return results.map((result) => result.value);
    });
  }
}
