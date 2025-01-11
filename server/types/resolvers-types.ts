import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Job } from '@prisma/client';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type IAddress = IUkAddress | IUsAddress;

export type IApplyForJobInput = {
  id: Scalars['ID']['input'];
};

export type ICancelApplicationInput = {
  id: Scalars['ID']['input'];
};

export type ICompany = {
  __typename?: 'Company';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ICreateJobInput = {
  companyName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  remote: Scalars['Boolean']['input'];
  salary: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  type: IJobType;
};

export type IDeleteJobInput = {
  id: Scalars['ID']['input'];
};

export type IJob = {
  __typename?: 'Job';
  company: ICompany;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isApplied: Scalars['Boolean']['output'];
  /** @deprecated Use officeAddress instead */
  location: Scalars['String']['output'];
  officeAddress?: Maybe<IAddress>;
  remote: Scalars['Boolean']['output'];
  salary: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: IJobType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum IJobType {
  FullTime = 'FULL_TIME',
  Internship = 'INTERNSHIP',
  PartTime = 'PART_TIME'
}

export type ILoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type IMutation = {
  __typename?: 'Mutation';
  applyForJob: Scalars['Boolean']['output'];
  cancelApplication: Scalars['Boolean']['output'];
  createJob: IJob;
  deleteJob: Scalars['Boolean']['output'];
  login: IUser;
  logout: Scalars['Boolean']['output'];
  signup: IUser;
};


export type IMutationApplyForJobArgs = {
  input: IApplyForJobInput;
};


export type IMutationCancelApplicationArgs = {
  input: ICancelApplicationInput;
};


export type IMutationCreateJobArgs = {
  input: ICreateJobInput;
};


export type IMutationDeleteJobArgs = {
  input: IDeleteJobInput;
};


export type IMutationLoginArgs = {
  input: ILoginInput;
};


export type IMutationSignupArgs = {
  input: ISignupInput;
};

export type IQuery = {
  __typename?: 'Query';
  me?: Maybe<IUser>;
  searchJobs: Array<IJob>;
};


export type IQuerySearchJobsArgs = {
  input: ISearchJobsInput;
};

export type ISearchJobsInput = {
  query: Scalars['String']['input'];
};

export type ISignupInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: IUserRole;
};

export type ISubscription = {
  __typename?: 'Subscription';
  jobCreated: IJob;
};

export type IUkAddress = {
  __typename?: 'UKAddress';
  addressLine1: Scalars['String']['output'];
  addressLine2: Scalars['String']['output'];
  city: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
};

export type IUsAddress = {
  __typename?: 'USAddress';
  city: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};

export type IUser = {
  __typename?: 'User';
  appliedJobs: Array<IJob>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownedJobs: Array<IJob>;
  role: IUserRole;
};

export enum IUserRole {
  Admin = 'ADMIN',
  User = 'USER'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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
export type IResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  Address: ( Partial<IUkAddress> ) | ( Partial<IUsAddress> );
};


/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Address: Partial<ResolverTypeWrapper<IResolversUnionTypes<IResolversTypes>['Address']>>;
  ApplyForJobInput: ResolverTypeWrapper<Partial<IApplyForJobInput>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']['output']>>;
  CancelApplicationInput: ResolverTypeWrapper<Partial<ICancelApplicationInput>>;
  Company: ResolverTypeWrapper<Partial<ICompany>>;
  CreateJobInput: ResolverTypeWrapper<Partial<ICreateJobInput>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']['output']>>;
  DeleteJobInput: ResolverTypeWrapper<Partial<IDeleteJobInput>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']['output']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']['output']>>;
  Job: ResolverTypeWrapper<Job>;
  JobType: ResolverTypeWrapper<Partial<IJobType>>;
  LoginInput: ResolverTypeWrapper<Partial<ILoginInput>>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SearchJobsInput: ResolverTypeWrapper<Partial<ISearchJobsInput>>;
  SignupInput: ResolverTypeWrapper<Partial<ISignupInput>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']['output']>>;
  Subscription: ResolverTypeWrapper<{}>;
  UKAddress: ResolverTypeWrapper<Partial<IUkAddress>>;
  USAddress: ResolverTypeWrapper<Partial<IUsAddress>>;
  User: ResolverTypeWrapper<Partial<Omit<IUser, 'appliedJobs' | 'ownedJobs'> & { appliedJobs: Array<IResolversTypes['Job']>, ownedJobs: Array<IResolversTypes['Job']> }>>;
  UserRole: ResolverTypeWrapper<Partial<IUserRole>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Address: Partial<IResolversUnionTypes<IResolversParentTypes>['Address']>;
  ApplyForJobInput: Partial<IApplyForJobInput>;
  Boolean: Partial<Scalars['Boolean']['output']>;
  CancelApplicationInput: Partial<ICancelApplicationInput>;
  Company: Partial<ICompany>;
  CreateJobInput: Partial<ICreateJobInput>;
  DateTime: Partial<Scalars['DateTime']['output']>;
  DeleteJobInput: Partial<IDeleteJobInput>;
  ID: Partial<Scalars['ID']['output']>;
  Int: Partial<Scalars['Int']['output']>;
  Job: Job;
  LoginInput: Partial<ILoginInput>;
  Mutation: {};
  Query: {};
  SearchJobsInput: Partial<ISearchJobsInput>;
  SignupInput: Partial<ISignupInput>;
  String: Partial<Scalars['String']['output']>;
  Subscription: {};
  UKAddress: Partial<IUkAddress>;
  USAddress: Partial<IUsAddress>;
  User: Partial<Omit<IUser, 'appliedJobs' | 'ownedJobs'> & { appliedJobs: Array<IResolversParentTypes['Job']>, ownedJobs: Array<IResolversParentTypes['Job']> }>;
};

export type IAuthDirectiveArgs = {
  role: IUserRole;
};

export type IAuthDirectiveResolver<Result, Parent, ContextType = Context, Args = IAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IAddressResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Address'] = IResolversParentTypes['Address']> = {
  __resolveType: TypeResolveFn<'UKAddress' | 'USAddress', ParentType, ContextType>;
};

export type ICompanyResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Company'] = IResolversParentTypes['Company']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IDateTimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type IJobResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Job'] = IResolversParentTypes['Job']> = {
  company?: Resolver<IResolversTypes['Company'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  isApplied?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  officeAddress?: Resolver<Maybe<IResolversTypes['Address']>, ParentType, ContextType>;
  remote?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  salary?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<IResolversTypes['JobType'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  applyForJob?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationApplyForJobArgs, 'input'>>;
  cancelApplication?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationCancelApplicationArgs, 'input'>>;
  createJob?: Resolver<IResolversTypes['Job'], ParentType, ContextType, RequireFields<IMutationCreateJobArgs, 'input'>>;
  deleteJob?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDeleteJobArgs, 'input'>>;
  login?: Resolver<IResolversTypes['User'], ParentType, ContextType, RequireFields<IMutationLoginArgs, 'input'>>;
  logout?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  signup?: Resolver<IResolversTypes['User'], ParentType, ContextType, RequireFields<IMutationSignupArgs, 'input'>>;
};

export type IQueryResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType>;
  searchJobs?: Resolver<Array<IResolversTypes['Job']>, ParentType, ContextType, RequireFields<IQuerySearchJobsArgs, 'input'>>;
};

export type ISubscriptionResolvers<ContextType = Context, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = {
  jobCreated?: SubscriptionResolver<IResolversTypes['Job'], "jobCreated", ParentType, ContextType>;
};

export type IUkAddressResolvers<ContextType = Context, ParentType extends IResolversParentTypes['UKAddress'] = IResolversParentTypes['UKAddress']> = {
  addressLine1?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  addressLine2?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  postcode?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUsAddressResolvers<ContextType = Context, ParentType extends IResolversParentTypes['USAddress'] = IResolversParentTypes['USAddress']> = {
  city?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserResolvers<ContextType = Context, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  appliedJobs?: Resolver<Array<IResolversTypes['Job']>, ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  ownedJobs?: Resolver<Array<IResolversTypes['Job']>, ParentType, ContextType>;
  role?: Resolver<IResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = Context> = {
  Address?: IAddressResolvers<ContextType>;
  Company?: ICompanyResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Job?: IJobResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Subscription?: ISubscriptionResolvers<ContextType>;
  UKAddress?: IUkAddressResolvers<ContextType>;
  USAddress?: IUsAddressResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};

export type IDirectiveResolvers<ContextType = Context> = {
  auth?: IAuthDirectiveResolver<any, any, ContextType>;
};
