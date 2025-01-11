import type { MockResolverFn as ResolverFn } from './custom-resolver';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type { ResolverFn };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Address = UkAddress | UsAddress;

export type ApplyForJobInput = {
  id: Scalars['ID']['input'];
};

export type CancelApplicationInput = {
  id: Scalars['ID']['input'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateJobInput = {
  companyName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  remote: Scalars['Boolean']['input'];
  salary: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  type: JobType;
};

export type DeleteJobInput = {
  id: Scalars['ID']['input'];
};

export type Job = {
  __typename?: 'Job';
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isApplied: Scalars['Boolean']['output'];
  /** @deprecated Use officeAddress instead */
  location: Scalars['String']['output'];
  officeAddress?: Maybe<Address>;
  remote: Scalars['Boolean']['output'];
  salary: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: JobType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum JobType {
  FullTime = 'FULL_TIME',
  Internship = 'INTERNSHIP',
  PartTime = 'PART_TIME'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  applyForJob: Scalars['Boolean']['output'];
  cancelApplication: Scalars['Boolean']['output'];
  createJob: Job;
  deleteJob: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  signup: User;
};


export type MutationApplyForJobArgs = {
  input: ApplyForJobInput;
};


export type MutationCancelApplicationArgs = {
  input: CancelApplicationInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationDeleteJobArgs = {
  input: DeleteJobInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  searchJobs: Array<Job>;
};


export type QuerySearchJobsArgs = {
  input: SearchJobsInput;
};

export type SearchJobsInput = {
  query: Scalars['String']['input'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};

export type Subscription = {
  __typename?: 'Subscription';
  jobCreated: Job;
};

export type UkAddress = {
  __typename?: 'UKAddress';
  addressLine1: Scalars['String']['output'];
  addressLine2: Scalars['String']['output'];
  city: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
};

export type UsAddress = {
  __typename?: 'USAddress';
  city: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  appliedJobs: Array<Job>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownedJobs: Array<Job>;
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  Address: ( Partial<UkAddress> ) | ( Partial<UsAddress> );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: Partial<ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Address']>>;
  ApplyForJobInput: ResolverTypeWrapper<Partial<ApplyForJobInput>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']['output']>>;
  CancelApplicationInput: ResolverTypeWrapper<Partial<CancelApplicationInput>>;
  Company: ResolverTypeWrapper<Partial<Company>>;
  CreateJobInput: ResolverTypeWrapper<Partial<CreateJobInput>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']['output']>>;
  DeleteJobInput: ResolverTypeWrapper<Partial<DeleteJobInput>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']['output']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']['output']>>;
  Job: ResolverTypeWrapper<Partial<Omit<Job, 'officeAddress'> & { officeAddress?: Maybe<ResolversTypes['Address']> }>>;
  JobType: ResolverTypeWrapper<Partial<JobType>>;
  LoginInput: ResolverTypeWrapper<Partial<LoginInput>>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SearchJobsInput: ResolverTypeWrapper<Partial<SearchJobsInput>>;
  SignupInput: ResolverTypeWrapper<Partial<SignupInput>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']['output']>>;
  Subscription: ResolverTypeWrapper<{}>;
  UKAddress: ResolverTypeWrapper<Partial<UkAddress>>;
  USAddress: ResolverTypeWrapper<Partial<UsAddress>>;
  User: ResolverTypeWrapper<Partial<Omit<User, 'appliedJobs' | 'ownedJobs'> & { appliedJobs: Array<ResolversTypes['Job']>, ownedJobs: Array<ResolversTypes['Job']> }>>;
  UserRole: ResolverTypeWrapper<Partial<UserRole>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Partial<ResolversUnionTypes<ResolversParentTypes>['Address']>;
  ApplyForJobInput: Partial<ApplyForJobInput>;
  Boolean: Partial<Scalars['Boolean']['output']>;
  CancelApplicationInput: Partial<CancelApplicationInput>;
  Company: Partial<Company>;
  CreateJobInput: Partial<CreateJobInput>;
  DateTime: Partial<Scalars['DateTime']['output']>;
  DeleteJobInput: Partial<DeleteJobInput>;
  ID: Partial<Scalars['ID']['output']>;
  Int: Partial<Scalars['Int']['output']>;
  Job: Partial<Omit<Job, 'officeAddress'> & { officeAddress?: Maybe<ResolversParentTypes['Address']> }>;
  LoginInput: Partial<LoginInput>;
  Mutation: {};
  Query: {};
  SearchJobsInput: Partial<SearchJobsInput>;
  SignupInput: Partial<SignupInput>;
  String: Partial<Scalars['String']['output']>;
  Subscription: {};
  UKAddress: Partial<UkAddress>;
  USAddress: Partial<UsAddress>;
  User: Partial<Omit<User, 'appliedJobs' | 'ownedJobs'> & { appliedJobs: Array<ResolversParentTypes['Job']>, ownedJobs: Array<ResolversParentTypes['Job']> }>;
};

export type AuthDirectiveArgs = {
  role: UserRole;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  __resolveType: TypeResolveFn<'UKAddress' | 'USAddress', ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isApplied?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  officeAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  remote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  salary?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['JobType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  applyForJob?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationApplyForJobArgs, 'input'>>;
  cancelApplication?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCancelApplicationArgs, 'input'>>;
  createJob?: Resolver<ResolversTypes['Job'], ParentType, ContextType, RequireFields<MutationCreateJobArgs, 'input'>>;
  deleteJob?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteJobArgs, 'input'>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  searchJobs?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<QuerySearchJobsArgs, 'input'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  jobCreated?: SubscriptionResolver<ResolversTypes['Job'], "jobCreated", ParentType, ContextType>;
};

export type UkAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['UKAddress'] = ResolversParentTypes['UKAddress']> = {
  addressLine1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressLine2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['USAddress'] = ResolversParentTypes['USAddress']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  appliedJobs?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownedJobs?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Job?: JobResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UKAddress?: UkAddressResolvers<ContextType>;
  USAddress?: UsAddressResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
