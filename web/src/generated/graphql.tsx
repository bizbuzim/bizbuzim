import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  json: any;
  numeric: any;
  timestamp: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "expenses" */
export type Expenses = {
  __typename?: 'expenses';
  created_at: Scalars['timestamp'];
  created_by: Scalars['String'];
  description: Scalars['String'];
  expensed_at: Scalars['timestamp'];
  external_channel_id?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  payment: Scalars['String'];
  price: Scalars['numeric'];
  tags: Scalars['_text'];
};

/** aggregated selection of "expenses" */
export type Expenses_Aggregate = {
  __typename?: 'expenses_aggregate';
  aggregate?: Maybe<Expenses_Aggregate_Fields>;
  nodes: Array<Expenses>;
};

/** aggregate fields of "expenses" */
export type Expenses_Aggregate_Fields = {
  __typename?: 'expenses_aggregate_fields';
  avg?: Maybe<Expenses_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Expenses_Max_Fields>;
  min?: Maybe<Expenses_Min_Fields>;
  stddev?: Maybe<Expenses_Stddev_Fields>;
  stddev_pop?: Maybe<Expenses_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Expenses_Stddev_Samp_Fields>;
  sum?: Maybe<Expenses_Sum_Fields>;
  var_pop?: Maybe<Expenses_Var_Pop_Fields>;
  var_samp?: Maybe<Expenses_Var_Samp_Fields>;
  variance?: Maybe<Expenses_Variance_Fields>;
};


/** aggregate fields of "expenses" */
export type Expenses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Expenses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Expenses_Avg_Fields = {
  __typename?: 'expenses_avg_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "expenses". All fields are combined with a logical 'AND'. */
export type Expenses_Bool_Exp = {
  _and?: InputMaybe<Array<Expenses_Bool_Exp>>;
  _not?: InputMaybe<Expenses_Bool_Exp>;
  _or?: InputMaybe<Array<Expenses_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  expensed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  external_channel_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  payment?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  tags?: InputMaybe<_Text_Comparison_Exp>;
};

/** unique or primary key constraints on table "expenses" */
export enum Expenses_Constraint {
  /** unique or primary key constraint */
  PkExpensesId = 'PK_expenses_id'
}

/** input type for incrementing numeric columns in table "expenses" */
export type Expenses_Inc_Input = {
  price?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "expenses" */
export type Expenses_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  expensed_at?: InputMaybe<Scalars['timestamp']>;
  external_channel_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  tags?: InputMaybe<Scalars['_text']>;
};

/** aggregate max on columns */
export type Expenses_Max_Fields = {
  __typename?: 'expenses_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expensed_at?: Maybe<Scalars['timestamp']>;
  external_channel_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  payment?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type Expenses_Min_Fields = {
  __typename?: 'expenses_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expensed_at?: Maybe<Scalars['timestamp']>;
  external_channel_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  payment?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
};

/** response of any mutation on the table "expenses" */
export type Expenses_Mutation_Response = {
  __typename?: 'expenses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Expenses>;
};

/** on_conflict condition type for table "expenses" */
export type Expenses_On_Conflict = {
  constraint: Expenses_Constraint;
  update_columns?: Array<Expenses_Update_Column>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};

/** Ordering options when selecting data from "expenses". */
export type Expenses_Order_By = {
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  expensed_at?: InputMaybe<Order_By>;
  external_channel_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  payment?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
};

/** primary key columns input for table: expenses */
export type Expenses_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "expenses" */
export enum Expenses_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Description = 'description',
  /** column name */
  ExpensedAt = 'expensed_at',
  /** column name */
  ExternalChannelId = 'external_channel_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Payment = 'payment',
  /** column name */
  Price = 'price',
  /** column name */
  Tags = 'tags'
}

/** input type for updating data in table "expenses" */
export type Expenses_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  expensed_at?: InputMaybe<Scalars['timestamp']>;
  external_channel_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['numeric']>;
  tags?: InputMaybe<Scalars['_text']>;
};

/** aggregate stddev on columns */
export type Expenses_Stddev_Fields = {
  __typename?: 'expenses_stddev_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Expenses_Stddev_Pop_Fields = {
  __typename?: 'expenses_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Expenses_Stddev_Samp_Fields = {
  __typename?: 'expenses_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Expenses_Sum_Fields = {
  __typename?: 'expenses_sum_fields';
  price?: Maybe<Scalars['numeric']>;
};

/** update columns of table "expenses" */
export enum Expenses_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Description = 'description',
  /** column name */
  ExpensedAt = 'expensed_at',
  /** column name */
  ExternalChannelId = 'external_channel_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Payment = 'payment',
  /** column name */
  Price = 'price',
  /** column name */
  Tags = 'tags'
}

/** aggregate var_pop on columns */
export type Expenses_Var_Pop_Fields = {
  __typename?: 'expenses_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Expenses_Var_Samp_Fields = {
  __typename?: 'expenses_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Expenses_Variance_Fields = {
  __typename?: 'expenses_variance_fields';
  price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "expenses" */
  delete_expenses?: Maybe<Expenses_Mutation_Response>;
  /** delete single row from the table: "expenses" */
  delete_expenses_by_pk?: Maybe<Expenses>;
  /** delete data from the table: "sources" */
  delete_sources?: Maybe<Sources_Mutation_Response>;
  /** delete single row from the table: "sources" */
  delete_sources_by_pk?: Maybe<Sources>;
  /** insert data into the table: "expenses" */
  insert_expenses?: Maybe<Expenses_Mutation_Response>;
  /** insert a single row into the table: "expenses" */
  insert_expenses_one?: Maybe<Expenses>;
  /** insert data into the table: "sources" */
  insert_sources?: Maybe<Sources_Mutation_Response>;
  /** insert a single row into the table: "sources" */
  insert_sources_one?: Maybe<Sources>;
  /** update data of the table: "expenses" */
  update_expenses?: Maybe<Expenses_Mutation_Response>;
  /** update single row of the table: "expenses" */
  update_expenses_by_pk?: Maybe<Expenses>;
  /** update data of the table: "sources" */
  update_sources?: Maybe<Sources_Mutation_Response>;
  /** update single row of the table: "sources" */
  update_sources_by_pk?: Maybe<Sources>;
};


/** mutation root */
export type Mutation_RootDelete_ExpensesArgs = {
  where: Expenses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Expenses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SourcesArgs = {
  where: Sources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sources_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ExpensesArgs = {
  objects: Array<Expenses_Insert_Input>;
  on_conflict?: InputMaybe<Expenses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Expenses_OneArgs = {
  object: Expenses_Insert_Input;
  on_conflict?: InputMaybe<Expenses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SourcesArgs = {
  objects: Array<Sources_Insert_Input>;
  on_conflict?: InputMaybe<Sources_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sources_OneArgs = {
  object: Sources_Insert_Input;
  on_conflict?: InputMaybe<Sources_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ExpensesArgs = {
  _inc?: InputMaybe<Expenses_Inc_Input>;
  _set?: InputMaybe<Expenses_Set_Input>;
  where: Expenses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Expenses_By_PkArgs = {
  _inc?: InputMaybe<Expenses_Inc_Input>;
  _set?: InputMaybe<Expenses_Set_Input>;
  pk_columns: Expenses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SourcesArgs = {
  _set?: InputMaybe<Sources_Set_Input>;
  where: Sources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sources_By_PkArgs = {
  _set?: InputMaybe<Sources_Set_Input>;
  pk_columns: Sources_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** fetch aggregated fields from the table: "expenses" */
  expenses_aggregate: Expenses_Aggregate;
  /** fetch data from the table: "expenses" using primary key columns */
  expenses_by_pk?: Maybe<Expenses>;
  /** fetch data from the table: "sources" */
  sources: Array<Sources>;
  /** fetch aggregated fields from the table: "sources" */
  sources_aggregate: Sources_Aggregate;
  /** fetch data from the table: "sources" using primary key columns */
  sources_by_pk?: Maybe<Sources>;
};


export type Query_RootExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Query_RootExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Query_RootExpenses_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSourcesArgs = {
  distinct_on?: InputMaybe<Array<Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sources_Order_By>>;
  where?: InputMaybe<Sources_Bool_Exp>;
};


export type Query_RootSources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sources_Order_By>>;
  where?: InputMaybe<Sources_Bool_Exp>;
};


export type Query_RootSources_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "sources" */
export type Sources = {
  __typename?: 'sources';
  configuration: Scalars['json'];
  external_id: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  source: Scalars['String'];
};


/** columns and relationships of "sources" */
export type SourcesConfigurationArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "sources" */
export type Sources_Aggregate = {
  __typename?: 'sources_aggregate';
  aggregate?: Maybe<Sources_Aggregate_Fields>;
  nodes: Array<Sources>;
};

/** aggregate fields of "sources" */
export type Sources_Aggregate_Fields = {
  __typename?: 'sources_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Sources_Max_Fields>;
  min?: Maybe<Sources_Min_Fields>;
};


/** aggregate fields of "sources" */
export type Sources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "sources". All fields are combined with a logical 'AND'. */
export type Sources_Bool_Exp = {
  _and?: InputMaybe<Array<Sources_Bool_Exp>>;
  _not?: InputMaybe<Sources_Bool_Exp>;
  _or?: InputMaybe<Array<Sources_Bool_Exp>>;
  configuration?: InputMaybe<Json_Comparison_Exp>;
  external_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  source?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "sources" */
export enum Sources_Constraint {
  /** unique or primary key constraint */
  PkSourcesId = 'PK_sources_id'
}

/** input type for inserting data into table "sources" */
export type Sources_Insert_Input = {
  configuration?: InputMaybe<Scalars['json']>;
  external_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Sources_Max_Fields = {
  __typename?: 'sources_max_fields';
  external_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Sources_Min_Fields = {
  __typename?: 'sources_min_fields';
  external_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "sources" */
export type Sources_Mutation_Response = {
  __typename?: 'sources_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Sources>;
};

/** on_conflict condition type for table "sources" */
export type Sources_On_Conflict = {
  constraint: Sources_Constraint;
  update_columns?: Array<Sources_Update_Column>;
  where?: InputMaybe<Sources_Bool_Exp>;
};

/** Ordering options when selecting data from "sources". */
export type Sources_Order_By = {
  configuration?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sources */
export type Sources_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "sources" */
export enum Sources_Select_Column {
  /** column name */
  Configuration = 'configuration',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Source = 'source'
}

/** input type for updating data in table "sources" */
export type Sources_Set_Input = {
  configuration?: InputMaybe<Scalars['json']>;
  external_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
};

/** update columns of table "sources" */
export enum Sources_Update_Column {
  /** column name */
  Configuration = 'configuration',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Source = 'source'
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** fetch aggregated fields from the table: "expenses" */
  expenses_aggregate: Expenses_Aggregate;
  /** fetch data from the table: "expenses" using primary key columns */
  expenses_by_pk?: Maybe<Expenses>;
  /** fetch data from the table: "sources" */
  sources: Array<Sources>;
  /** fetch aggregated fields from the table: "sources" */
  sources_aggregate: Sources_Aggregate;
  /** fetch data from the table: "sources" using primary key columns */
  sources_by_pk?: Maybe<Sources>;
};


export type Subscription_RootExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Subscription_RootExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Subscription_RootExpenses_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSourcesArgs = {
  distinct_on?: InputMaybe<Array<Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sources_Order_By>>;
  where?: InputMaybe<Sources_Bool_Exp>;
};


export type Subscription_RootSources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sources_Order_By>>;
  where?: InputMaybe<Sources_Bool_Exp>;
};


export type Subscription_RootSources_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type GetAllExpensesQueryVariables = Exact<{
  from: Scalars['timestamp'];
  to: Scalars['timestamp'];
}>;


export type GetAllExpensesQuery = { __typename?: 'query_root', expenses: Array<{ __typename?: 'expenses', id: any, name: string, payment: string, tags: any, price: any, expensed_at: any }> };

export type FetchSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchSourcesQuery = { __typename?: 'query_root', sources: Array<{ __typename?: 'sources', id: any, name: string, source: string, external_id: string, configuration: any }> };


export const GetAllExpensesDocument = gql`
    query GetAllExpenses($from: timestamp!, $to: timestamp!) {
  expenses(
    order_by: {expensed_at: desc}
    where: {_and: {expensed_at: {_gte: $from, _lt: $to}}}
  ) {
    id
    name
    payment
    tags
    price
    expensed_at
  }
}
    `;

export function useGetAllExpensesQuery(options: Omit<Urql.UseQueryArgs<GetAllExpensesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllExpensesQuery>({ query: GetAllExpensesDocument, ...options });
};
export const FetchSourcesDocument = gql`
    query FetchSources {
  sources {
    id
    name
    source
    external_id
    configuration
  }
}
    `;

export function useFetchSourcesQuery(options?: Omit<Urql.UseQueryArgs<FetchSourcesQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchSourcesQuery>({ query: FetchSourcesDocument, ...options });
};
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "query_root"
    },
    "mutationType": {
      "name": "mutation_root"
    },
    "subscriptionType": {
      "name": "subscription_root"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "expenses",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "created_by",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "expensed_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "external_channel_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "payment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "price",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "tags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "expenses",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_avg_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_max_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "created_by",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "expensed_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "external_channel_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "payment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_min_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "created_by",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "expensed_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "external_channel_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "payment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "expenses",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_stddev_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_stddev_pop_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_stddev_samp_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_sum_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_var_pop_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_var_samp_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "expenses_variance_fields",
        "fields": [
          {
            "name": "price",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "mutation_root",
        "fields": [
          {
            "name": "delete_expenses",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_expenses_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "expenses",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_sources",
            "type": {
              "kind": "OBJECT",
              "name": "sources_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_sources_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "sources",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "insert_expenses",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_expenses_one",
            "type": {
              "kind": "OBJECT",
              "name": "expenses",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_sources",
            "type": {
              "kind": "OBJECT",
              "name": "sources_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_sources_one",
            "type": {
              "kind": "OBJECT",
              "name": "sources",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "update_expenses",
            "type": {
              "kind": "OBJECT",
              "name": "expenses_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_expenses_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "expenses",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_sources",
            "type": {
              "kind": "OBJECT",
              "name": "sources_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_sources_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "sources",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "query_root",
        "fields": [
          {
            "name": "expenses",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "expenses",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "expenses_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "expenses_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "expenses_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "expenses",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "sources",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "sources",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "sources_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "sources_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "sources_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "sources",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "sources",
        "fields": [
          {
            "name": "configuration",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "path",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "external_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "source",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "sources_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "sources_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "sources",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "sources_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "sources_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "sources_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "sources_max_fields",
        "fields": [
          {
            "name": "external_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "source",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "sources_min_fields",
        "fields": [
          {
            "name": "external_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "source",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "sources_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "sources",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "subscription_root",
        "fields": [
          {
            "name": "expenses",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "expenses",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "expenses_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "expenses_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "expenses_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "expenses",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "sources",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "sources",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "sources_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "sources_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "sources_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "sources",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;