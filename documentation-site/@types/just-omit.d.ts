declare module 'just-omit' {
  declare function omit<T, U extends keyof T>(obj: T, select: U[]): Omit<T, U>;
  declare function omit<T, U extends keyof T>(
    obj: T,
    select1: U,
    ...selectn: U[]
  ): Omit<T, U>;
  export default omit;
}
