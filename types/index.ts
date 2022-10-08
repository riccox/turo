export * as Turo from './turo';

export type PickFieldType<O, K extends keyof O> = Pick<O, K>[K];
