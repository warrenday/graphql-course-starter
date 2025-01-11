export type MockResolverFn<TResult, TParent, TContext, TArgs> = (
  args: TArgs
) => Promise<TResult> | TResult;
