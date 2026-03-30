
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model LessonSchedule
 * 
 */
export type LessonSchedule = $Result.DefaultSelection<Prisma.$LessonSchedulePayload>
/**
 * Model LessonRecord
 * 
 */
export type LessonRecord = $Result.DefaultSelection<Prisma.$LessonRecordPayload>
/**
 * Model TestScore
 * 
 */
export type TestScore = $Result.DefaultSelection<Prisma.$TestScorePayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model SchoolSettings
 * 
 */
export type SchoolSettings = $Result.DefaultSelection<Prisma.$SchoolSettingsPayload>
/**
 * Model VocabProgress
 * 
 */
export type VocabProgress = $Result.DefaultSelection<Prisma.$VocabProgressPayload>
/**
 * Model GrammarProgress
 * 
 */
export type GrammarProgress = $Result.DefaultSelection<Prisma.$GrammarProgressPayload>
/**
 * Model GrammarPoint
 * 
 */
export type GrammarPoint = $Result.DefaultSelection<Prisma.$GrammarPointPayload>
/**
 * Model GrammarMastery
 * 
 */
export type GrammarMastery = $Result.DefaultSelection<Prisma.$GrammarMasteryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonSchedule`: Exposes CRUD operations for the **LessonSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonSchedules
    * const lessonSchedules = await prisma.lessonSchedule.findMany()
    * ```
    */
  get lessonSchedule(): Prisma.LessonScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessonRecord`: Exposes CRUD operations for the **LessonRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LessonRecords
    * const lessonRecords = await prisma.lessonRecord.findMany()
    * ```
    */
  get lessonRecord(): Prisma.LessonRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testScore`: Exposes CRUD operations for the **TestScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestScores
    * const testScores = await prisma.testScore.findMany()
    * ```
    */
  get testScore(): Prisma.TestScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schoolSettings`: Exposes CRUD operations for the **SchoolSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SchoolSettings
    * const schoolSettings = await prisma.schoolSettings.findMany()
    * ```
    */
  get schoolSettings(): Prisma.SchoolSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vocabProgress`: Exposes CRUD operations for the **VocabProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VocabProgresses
    * const vocabProgresses = await prisma.vocabProgress.findMany()
    * ```
    */
  get vocabProgress(): Prisma.VocabProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.grammarProgress`: Exposes CRUD operations for the **GrammarProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GrammarProgresses
    * const grammarProgresses = await prisma.grammarProgress.findMany()
    * ```
    */
  get grammarProgress(): Prisma.GrammarProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.grammarPoint`: Exposes CRUD operations for the **GrammarPoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GrammarPoints
    * const grammarPoints = await prisma.grammarPoint.findMany()
    * ```
    */
  get grammarPoint(): Prisma.GrammarPointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.grammarMastery`: Exposes CRUD operations for the **GrammarMastery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GrammarMasteries
    * const grammarMasteries = await prisma.grammarMastery.findMany()
    * ```
    */
  get grammarMastery(): Prisma.GrammarMasteryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Teacher: 'Teacher',
    LessonSchedule: 'LessonSchedule',
    LessonRecord: 'LessonRecord',
    TestScore: 'TestScore',
    Message: 'Message',
    Announcement: 'Announcement',
    Invoice: 'Invoice',
    SchoolSettings: 'SchoolSettings',
    VocabProgress: 'VocabProgress',
    GrammarProgress: 'GrammarProgress',
    GrammarPoint: 'GrammarPoint',
    GrammarMastery: 'GrammarMastery'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "student" | "teacher" | "lessonSchedule" | "lessonRecord" | "testScore" | "message" | "announcement" | "invoice" | "schoolSettings" | "vocabProgress" | "grammarProgress" | "grammarPoint" | "grammarMastery"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      LessonSchedule: {
        payload: Prisma.$LessonSchedulePayload<ExtArgs>
        fields: Prisma.LessonScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>
          }
          findFirst: {
            args: Prisma.LessonScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>
          }
          findMany: {
            args: Prisma.LessonScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>[]
          }
          create: {
            args: Prisma.LessonScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>
          }
          createMany: {
            args: Prisma.LessonScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>[]
          }
          delete: {
            args: Prisma.LessonScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>
          }
          update: {
            args: Prisma.LessonScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>
          }
          deleteMany: {
            args: Prisma.LessonScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LessonScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>[]
          }
          upsert: {
            args: Prisma.LessonScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonSchedulePayload>
          }
          aggregate: {
            args: Prisma.LessonScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonSchedule>
          }
          groupBy: {
            args: Prisma.LessonScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<LessonScheduleCountAggregateOutputType> | number
          }
        }
      }
      LessonRecord: {
        payload: Prisma.$LessonRecordPayload<ExtArgs>
        fields: Prisma.LessonRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>
          }
          findFirst: {
            args: Prisma.LessonRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>
          }
          findMany: {
            args: Prisma.LessonRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>[]
          }
          create: {
            args: Prisma.LessonRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>
          }
          createMany: {
            args: Prisma.LessonRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>[]
          }
          delete: {
            args: Prisma.LessonRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>
          }
          update: {
            args: Prisma.LessonRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>
          }
          deleteMany: {
            args: Prisma.LessonRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LessonRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>[]
          }
          upsert: {
            args: Prisma.LessonRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonRecordPayload>
          }
          aggregate: {
            args: Prisma.LessonRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessonRecord>
          }
          groupBy: {
            args: Prisma.LessonRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonRecordCountArgs<ExtArgs>
            result: $Utils.Optional<LessonRecordCountAggregateOutputType> | number
          }
        }
      }
      TestScore: {
        payload: Prisma.$TestScorePayload<ExtArgs>
        fields: Prisma.TestScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          findFirst: {
            args: Prisma.TestScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          findMany: {
            args: Prisma.TestScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          create: {
            args: Prisma.TestScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          createMany: {
            args: Prisma.TestScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          delete: {
            args: Prisma.TestScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          update: {
            args: Prisma.TestScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          deleteMany: {
            args: Prisma.TestScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          upsert: {
            args: Prisma.TestScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          aggregate: {
            args: Prisma.TestScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestScore>
          }
          groupBy: {
            args: Prisma.TestScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestScoreCountArgs<ExtArgs>
            result: $Utils.Optional<TestScoreCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnouncementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnouncementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      SchoolSettings: {
        payload: Prisma.$SchoolSettingsPayload<ExtArgs>
        fields: Prisma.SchoolSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>
          }
          findFirst: {
            args: Prisma.SchoolSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>
          }
          findMany: {
            args: Prisma.SchoolSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>[]
          }
          create: {
            args: Prisma.SchoolSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>
          }
          createMany: {
            args: Prisma.SchoolSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>[]
          }
          delete: {
            args: Prisma.SchoolSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>
          }
          update: {
            args: Prisma.SchoolSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>
          }
          deleteMany: {
            args: Prisma.SchoolSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchoolSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>[]
          }
          upsert: {
            args: Prisma.SchoolSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolSettingsPayload>
          }
          aggregate: {
            args: Prisma.SchoolSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchoolSettings>
          }
          groupBy: {
            args: Prisma.SchoolSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolSettingsCountAggregateOutputType> | number
          }
        }
      }
      VocabProgress: {
        payload: Prisma.$VocabProgressPayload<ExtArgs>
        fields: Prisma.VocabProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VocabProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VocabProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>
          }
          findFirst: {
            args: Prisma.VocabProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VocabProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>
          }
          findMany: {
            args: Prisma.VocabProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>[]
          }
          create: {
            args: Prisma.VocabProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>
          }
          createMany: {
            args: Prisma.VocabProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VocabProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>[]
          }
          delete: {
            args: Prisma.VocabProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>
          }
          update: {
            args: Prisma.VocabProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>
          }
          deleteMany: {
            args: Prisma.VocabProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VocabProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VocabProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>[]
          }
          upsert: {
            args: Prisma.VocabProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabProgressPayload>
          }
          aggregate: {
            args: Prisma.VocabProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVocabProgress>
          }
          groupBy: {
            args: Prisma.VocabProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<VocabProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.VocabProgressCountArgs<ExtArgs>
            result: $Utils.Optional<VocabProgressCountAggregateOutputType> | number
          }
        }
      }
      GrammarProgress: {
        payload: Prisma.$GrammarProgressPayload<ExtArgs>
        fields: Prisma.GrammarProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrammarProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrammarProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>
          }
          findFirst: {
            args: Prisma.GrammarProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrammarProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>
          }
          findMany: {
            args: Prisma.GrammarProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>[]
          }
          create: {
            args: Prisma.GrammarProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>
          }
          createMany: {
            args: Prisma.GrammarProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrammarProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>[]
          }
          delete: {
            args: Prisma.GrammarProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>
          }
          update: {
            args: Prisma.GrammarProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>
          }
          deleteMany: {
            args: Prisma.GrammarProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrammarProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GrammarProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>[]
          }
          upsert: {
            args: Prisma.GrammarProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarProgressPayload>
          }
          aggregate: {
            args: Prisma.GrammarProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrammarProgress>
          }
          groupBy: {
            args: Prisma.GrammarProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrammarProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrammarProgressCountArgs<ExtArgs>
            result: $Utils.Optional<GrammarProgressCountAggregateOutputType> | number
          }
        }
      }
      GrammarPoint: {
        payload: Prisma.$GrammarPointPayload<ExtArgs>
        fields: Prisma.GrammarPointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrammarPointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrammarPointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>
          }
          findFirst: {
            args: Prisma.GrammarPointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrammarPointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>
          }
          findMany: {
            args: Prisma.GrammarPointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>[]
          }
          create: {
            args: Prisma.GrammarPointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>
          }
          createMany: {
            args: Prisma.GrammarPointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrammarPointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>[]
          }
          delete: {
            args: Prisma.GrammarPointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>
          }
          update: {
            args: Prisma.GrammarPointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>
          }
          deleteMany: {
            args: Prisma.GrammarPointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrammarPointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GrammarPointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>[]
          }
          upsert: {
            args: Prisma.GrammarPointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarPointPayload>
          }
          aggregate: {
            args: Prisma.GrammarPointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrammarPoint>
          }
          groupBy: {
            args: Prisma.GrammarPointGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrammarPointGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrammarPointCountArgs<ExtArgs>
            result: $Utils.Optional<GrammarPointCountAggregateOutputType> | number
          }
        }
      }
      GrammarMastery: {
        payload: Prisma.$GrammarMasteryPayload<ExtArgs>
        fields: Prisma.GrammarMasteryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrammarMasteryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrammarMasteryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>
          }
          findFirst: {
            args: Prisma.GrammarMasteryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrammarMasteryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>
          }
          findMany: {
            args: Prisma.GrammarMasteryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>[]
          }
          create: {
            args: Prisma.GrammarMasteryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>
          }
          createMany: {
            args: Prisma.GrammarMasteryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrammarMasteryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>[]
          }
          delete: {
            args: Prisma.GrammarMasteryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>
          }
          update: {
            args: Prisma.GrammarMasteryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>
          }
          deleteMany: {
            args: Prisma.GrammarMasteryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrammarMasteryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GrammarMasteryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>[]
          }
          upsert: {
            args: Prisma.GrammarMasteryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrammarMasteryPayload>
          }
          aggregate: {
            args: Prisma.GrammarMasteryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrammarMastery>
          }
          groupBy: {
            args: Prisma.GrammarMasteryGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrammarMasteryGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrammarMasteryCountArgs<ExtArgs>
            result: $Utils.Optional<GrammarMasteryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    student?: StudentOmit
    teacher?: TeacherOmit
    lessonSchedule?: LessonScheduleOmit
    lessonRecord?: LessonRecordOmit
    testScore?: TestScoreOmit
    message?: MessageOmit
    announcement?: AnnouncementOmit
    invoice?: InvoiceOmit
    schoolSettings?: SchoolSettingsOmit
    vocabProgress?: VocabProgressOmit
    grammarProgress?: GrammarProgressOmit
    grammarPoint?: GrammarPointOmit
    grammarMastery?: GrammarMasteryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    grammarProgresses: number
    grammarMasteries: number
    invoices: number
    records: number
    schedules: number
    messages: number
    testScores: number
    vocabProgresses: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    grammarProgresses?: boolean | StudentCountOutputTypeCountGrammarProgressesArgs
    grammarMasteries?: boolean | StudentCountOutputTypeCountGrammarMasteriesArgs
    invoices?: boolean | StudentCountOutputTypeCountInvoicesArgs
    records?: boolean | StudentCountOutputTypeCountRecordsArgs
    schedules?: boolean | StudentCountOutputTypeCountSchedulesArgs
    messages?: boolean | StudentCountOutputTypeCountMessagesArgs
    testScores?: boolean | StudentCountOutputTypeCountTestScoresArgs
    vocabProgresses?: boolean | StudentCountOutputTypeCountVocabProgressesArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountGrammarProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrammarProgressWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountGrammarMasteriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrammarMasteryWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonRecordWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonScheduleWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTestScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountVocabProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabProgressWhereInput
  }


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    messages: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | TeacherCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type GrammarPointCountOutputType
   */

  export type GrammarPointCountOutputType = {
    masteries: number
  }

  export type GrammarPointCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masteries?: boolean | GrammarPointCountOutputTypeCountMasteriesArgs
  }

  // Custom InputTypes
  /**
   * GrammarPointCountOutputType without action
   */
  export type GrammarPointCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPointCountOutputType
     */
    select?: GrammarPointCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GrammarPointCountOutputType without action
   */
  export type GrammarPointCountOutputTypeCountMasteriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrammarMasteryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    progress: number | null
    level: number | null
    totalLessons: number | null
    vocabScore: number | null
    grammarScore: number | null
    listeningScore: number | null
    speakingScore: number | null
    goalProgress: number | null
    questLevel: number | null
    questXP: number | null
    questStreak: number | null
  }

  export type StudentSumAggregateOutputType = {
    progress: number | null
    level: number | null
    totalLessons: number | null
    vocabScore: number | null
    grammarScore: number | null
    listeningScore: number | null
    speakingScore: number | null
    goalProgress: number | null
    questLevel: number | null
    questXP: number | null
    questStreak: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    course: string | null
    status: string | null
    lastLesson: string | null
    progress: number | null
    loginId: string | null
    password: string | null
    level: number | null
    target: string | null
    phone: string | null
    joinDate: string | null
    totalLessons: number | null
    internalNote: string | null
    toeicScore: string | null
    cefr: string | null
    vocabScore: number | null
    grammarScore: number | null
    listeningScore: number | null
    speakingScore: number | null
    goalTarget: string | null
    goalProgress: number | null
    biography: string | null
    occupation: string | null
    avatarUrl: string | null
    coverUrl: string | null
    questLevel: number | null
    questXP: number | null
    questStreak: number | null
    lastQuestPlayedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    course: string | null
    status: string | null
    lastLesson: string | null
    progress: number | null
    loginId: string | null
    password: string | null
    level: number | null
    target: string | null
    phone: string | null
    joinDate: string | null
    totalLessons: number | null
    internalNote: string | null
    toeicScore: string | null
    cefr: string | null
    vocabScore: number | null
    grammarScore: number | null
    listeningScore: number | null
    speakingScore: number | null
    goalTarget: string | null
    goalProgress: number | null
    biography: string | null
    occupation: string | null
    avatarUrl: string | null
    coverUrl: string | null
    questLevel: number | null
    questXP: number | null
    questStreak: number | null
    lastQuestPlayedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    email: number
    course: number
    status: number
    lastLesson: number
    progress: number
    loginId: number
    password: number
    level: number
    target: number
    phone: number
    joinDate: number
    totalLessons: number
    internalNote: number
    toeicScore: number
    cefr: number
    vocabScore: number
    grammarScore: number
    listeningScore: number
    speakingScore: number
    goalTarget: number
    goalProgress: number
    biography: number
    occupation: number
    avatarUrl: number
    coverUrl: number
    questLevel: number
    questXP: number
    questStreak: number
    lastQuestPlayedAt: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    progress?: true
    level?: true
    totalLessons?: true
    vocabScore?: true
    grammarScore?: true
    listeningScore?: true
    speakingScore?: true
    goalProgress?: true
    questLevel?: true
    questXP?: true
    questStreak?: true
  }

  export type StudentSumAggregateInputType = {
    progress?: true
    level?: true
    totalLessons?: true
    vocabScore?: true
    grammarScore?: true
    listeningScore?: true
    speakingScore?: true
    goalProgress?: true
    questLevel?: true
    questXP?: true
    questStreak?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    course?: true
    status?: true
    lastLesson?: true
    progress?: true
    loginId?: true
    password?: true
    level?: true
    target?: true
    phone?: true
    joinDate?: true
    totalLessons?: true
    internalNote?: true
    toeicScore?: true
    cefr?: true
    vocabScore?: true
    grammarScore?: true
    listeningScore?: true
    speakingScore?: true
    goalTarget?: true
    goalProgress?: true
    biography?: true
    occupation?: true
    avatarUrl?: true
    coverUrl?: true
    questLevel?: true
    questXP?: true
    questStreak?: true
    lastQuestPlayedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    course?: true
    status?: true
    lastLesson?: true
    progress?: true
    loginId?: true
    password?: true
    level?: true
    target?: true
    phone?: true
    joinDate?: true
    totalLessons?: true
    internalNote?: true
    toeicScore?: true
    cefr?: true
    vocabScore?: true
    grammarScore?: true
    listeningScore?: true
    speakingScore?: true
    goalTarget?: true
    goalProgress?: true
    biography?: true
    occupation?: true
    avatarUrl?: true
    coverUrl?: true
    questLevel?: true
    questXP?: true
    questStreak?: true
    lastQuestPlayedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    course?: true
    status?: true
    lastLesson?: true
    progress?: true
    loginId?: true
    password?: true
    level?: true
    target?: true
    phone?: true
    joinDate?: true
    totalLessons?: true
    internalNote?: true
    toeicScore?: true
    cefr?: true
    vocabScore?: true
    grammarScore?: true
    listeningScore?: true
    speakingScore?: true
    goalTarget?: true
    goalProgress?: true
    biography?: true
    occupation?: true
    avatarUrl?: true
    coverUrl?: true
    questLevel?: true
    questXP?: true
    questStreak?: true
    lastQuestPlayedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    name: string
    email: string
    course: string
    status: string
    lastLesson: string | null
    progress: number
    loginId: string
    password: string
    level: number
    target: string | null
    phone: string | null
    joinDate: string | null
    totalLessons: number
    internalNote: string | null
    toeicScore: string | null
    cefr: string | null
    vocabScore: number | null
    grammarScore: number | null
    listeningScore: number | null
    speakingScore: number | null
    goalTarget: string | null
    goalProgress: number | null
    biography: string | null
    occupation: string | null
    avatarUrl: string | null
    coverUrl: string | null
    questLevel: number
    questXP: number
    questStreak: number
    lastQuestPlayedAt: Date | null
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    course?: boolean
    status?: boolean
    lastLesson?: boolean
    progress?: boolean
    loginId?: boolean
    password?: boolean
    level?: boolean
    target?: boolean
    phone?: boolean
    joinDate?: boolean
    totalLessons?: boolean
    internalNote?: boolean
    toeicScore?: boolean
    cefr?: boolean
    vocabScore?: boolean
    grammarScore?: boolean
    listeningScore?: boolean
    speakingScore?: boolean
    goalTarget?: boolean
    goalProgress?: boolean
    biography?: boolean
    occupation?: boolean
    avatarUrl?: boolean
    coverUrl?: boolean
    questLevel?: boolean
    questXP?: boolean
    questStreak?: boolean
    lastQuestPlayedAt?: boolean
    grammarProgresses?: boolean | Student$grammarProgressesArgs<ExtArgs>
    grammarMasteries?: boolean | Student$grammarMasteriesArgs<ExtArgs>
    invoices?: boolean | Student$invoicesArgs<ExtArgs>
    records?: boolean | Student$recordsArgs<ExtArgs>
    schedules?: boolean | Student$schedulesArgs<ExtArgs>
    messages?: boolean | Student$messagesArgs<ExtArgs>
    testScores?: boolean | Student$testScoresArgs<ExtArgs>
    vocabProgresses?: boolean | Student$vocabProgressesArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    course?: boolean
    status?: boolean
    lastLesson?: boolean
    progress?: boolean
    loginId?: boolean
    password?: boolean
    level?: boolean
    target?: boolean
    phone?: boolean
    joinDate?: boolean
    totalLessons?: boolean
    internalNote?: boolean
    toeicScore?: boolean
    cefr?: boolean
    vocabScore?: boolean
    grammarScore?: boolean
    listeningScore?: boolean
    speakingScore?: boolean
    goalTarget?: boolean
    goalProgress?: boolean
    biography?: boolean
    occupation?: boolean
    avatarUrl?: boolean
    coverUrl?: boolean
    questLevel?: boolean
    questXP?: boolean
    questStreak?: boolean
    lastQuestPlayedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    course?: boolean
    status?: boolean
    lastLesson?: boolean
    progress?: boolean
    loginId?: boolean
    password?: boolean
    level?: boolean
    target?: boolean
    phone?: boolean
    joinDate?: boolean
    totalLessons?: boolean
    internalNote?: boolean
    toeicScore?: boolean
    cefr?: boolean
    vocabScore?: boolean
    grammarScore?: boolean
    listeningScore?: boolean
    speakingScore?: boolean
    goalTarget?: boolean
    goalProgress?: boolean
    biography?: boolean
    occupation?: boolean
    avatarUrl?: boolean
    coverUrl?: boolean
    questLevel?: boolean
    questXP?: boolean
    questStreak?: boolean
    lastQuestPlayedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    course?: boolean
    status?: boolean
    lastLesson?: boolean
    progress?: boolean
    loginId?: boolean
    password?: boolean
    level?: boolean
    target?: boolean
    phone?: boolean
    joinDate?: boolean
    totalLessons?: boolean
    internalNote?: boolean
    toeicScore?: boolean
    cefr?: boolean
    vocabScore?: boolean
    grammarScore?: boolean
    listeningScore?: boolean
    speakingScore?: boolean
    goalTarget?: boolean
    goalProgress?: boolean
    biography?: boolean
    occupation?: boolean
    avatarUrl?: boolean
    coverUrl?: boolean
    questLevel?: boolean
    questXP?: boolean
    questStreak?: boolean
    lastQuestPlayedAt?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "course" | "status" | "lastLesson" | "progress" | "loginId" | "password" | "level" | "target" | "phone" | "joinDate" | "totalLessons" | "internalNote" | "toeicScore" | "cefr" | "vocabScore" | "grammarScore" | "listeningScore" | "speakingScore" | "goalTarget" | "goalProgress" | "biography" | "occupation" | "avatarUrl" | "coverUrl" | "questLevel" | "questXP" | "questStreak" | "lastQuestPlayedAt", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    grammarProgresses?: boolean | Student$grammarProgressesArgs<ExtArgs>
    grammarMasteries?: boolean | Student$grammarMasteriesArgs<ExtArgs>
    invoices?: boolean | Student$invoicesArgs<ExtArgs>
    records?: boolean | Student$recordsArgs<ExtArgs>
    schedules?: boolean | Student$schedulesArgs<ExtArgs>
    messages?: boolean | Student$messagesArgs<ExtArgs>
    testScores?: boolean | Student$testScoresArgs<ExtArgs>
    vocabProgresses?: boolean | Student$vocabProgressesArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      grammarProgresses: Prisma.$GrammarProgressPayload<ExtArgs>[]
      grammarMasteries: Prisma.$GrammarMasteryPayload<ExtArgs>[]
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      records: Prisma.$LessonRecordPayload<ExtArgs>[]
      schedules: Prisma.$LessonSchedulePayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      testScores: Prisma.$TestScorePayload<ExtArgs>[]
      vocabProgresses: Prisma.$VocabProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      course: string
      status: string
      lastLesson: string | null
      progress: number
      loginId: string
      password: string
      level: number
      target: string | null
      phone: string | null
      joinDate: string | null
      totalLessons: number
      internalNote: string | null
      toeicScore: string | null
      cefr: string | null
      vocabScore: number | null
      grammarScore: number | null
      listeningScore: number | null
      speakingScore: number | null
      goalTarget: string | null
      goalProgress: number | null
      biography: string | null
      occupation: string | null
      avatarUrl: string | null
      coverUrl: string | null
      questLevel: number
      questXP: number
      questStreak: number
      lastQuestPlayedAt: Date | null
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    grammarProgresses<T extends Student$grammarProgressesArgs<ExtArgs> = {}>(args?: Subset<T, Student$grammarProgressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    grammarMasteries<T extends Student$grammarMasteriesArgs<ExtArgs> = {}>(args?: Subset<T, Student$grammarMasteriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invoices<T extends Student$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Student$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    records<T extends Student$recordsArgs<ExtArgs> = {}>(args?: Subset<T, Student$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    schedules<T extends Student$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Student$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Student$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Student$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testScores<T extends Student$testScoresArgs<ExtArgs> = {}>(args?: Subset<T, Student$testScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vocabProgresses<T extends Student$vocabProgressesArgs<ExtArgs> = {}>(args?: Subset<T, Student$vocabProgressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly course: FieldRef<"Student", 'String'>
    readonly status: FieldRef<"Student", 'String'>
    readonly lastLesson: FieldRef<"Student", 'String'>
    readonly progress: FieldRef<"Student", 'Int'>
    readonly loginId: FieldRef<"Student", 'String'>
    readonly password: FieldRef<"Student", 'String'>
    readonly level: FieldRef<"Student", 'Int'>
    readonly target: FieldRef<"Student", 'String'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly joinDate: FieldRef<"Student", 'String'>
    readonly totalLessons: FieldRef<"Student", 'Int'>
    readonly internalNote: FieldRef<"Student", 'String'>
    readonly toeicScore: FieldRef<"Student", 'String'>
    readonly cefr: FieldRef<"Student", 'String'>
    readonly vocabScore: FieldRef<"Student", 'Int'>
    readonly grammarScore: FieldRef<"Student", 'Int'>
    readonly listeningScore: FieldRef<"Student", 'Int'>
    readonly speakingScore: FieldRef<"Student", 'Int'>
    readonly goalTarget: FieldRef<"Student", 'String'>
    readonly goalProgress: FieldRef<"Student", 'Int'>
    readonly biography: FieldRef<"Student", 'String'>
    readonly occupation: FieldRef<"Student", 'String'>
    readonly avatarUrl: FieldRef<"Student", 'String'>
    readonly coverUrl: FieldRef<"Student", 'String'>
    readonly questLevel: FieldRef<"Student", 'Int'>
    readonly questXP: FieldRef<"Student", 'Int'>
    readonly questStreak: FieldRef<"Student", 'Int'>
    readonly lastQuestPlayedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.grammarProgresses
   */
  export type Student$grammarProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    where?: GrammarProgressWhereInput
    orderBy?: GrammarProgressOrderByWithRelationInput | GrammarProgressOrderByWithRelationInput[]
    cursor?: GrammarProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GrammarProgressScalarFieldEnum | GrammarProgressScalarFieldEnum[]
  }

  /**
   * Student.grammarMasteries
   */
  export type Student$grammarMasteriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    where?: GrammarMasteryWhereInput
    orderBy?: GrammarMasteryOrderByWithRelationInput | GrammarMasteryOrderByWithRelationInput[]
    cursor?: GrammarMasteryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GrammarMasteryScalarFieldEnum | GrammarMasteryScalarFieldEnum[]
  }

  /**
   * Student.invoices
   */
  export type Student$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Student.records
   */
  export type Student$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    where?: LessonRecordWhereInput
    orderBy?: LessonRecordOrderByWithRelationInput | LessonRecordOrderByWithRelationInput[]
    cursor?: LessonRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonRecordScalarFieldEnum | LessonRecordScalarFieldEnum[]
  }

  /**
   * Student.schedules
   */
  export type Student$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    where?: LessonScheduleWhereInput
    orderBy?: LessonScheduleOrderByWithRelationInput | LessonScheduleOrderByWithRelationInput[]
    cursor?: LessonScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonScheduleScalarFieldEnum | LessonScheduleScalarFieldEnum[]
  }

  /**
   * Student.messages
   */
  export type Student$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Student.testScores
   */
  export type Student$testScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    cursor?: TestScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * Student.vocabProgresses
   */
  export type Student$vocabProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    where?: VocabProgressWhereInput
    orderBy?: VocabProgressOrderByWithRelationInput | VocabProgressOrderByWithRelationInput[]
    cursor?: VocabProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VocabProgressScalarFieldEnum | VocabProgressScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    rating: number | null
  }

  export type TeacherSumAggregateOutputType = {
    rating: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    status: string | null
    role: string | null
    bio: string | null
    joinDate: string | null
    rating: number | null
    loginId: string | null
    password: string | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    status: string | null
    role: string | null
    bio: string | null
    joinDate: string | null
    rating: number | null
    loginId: string | null
    password: string | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    name: number
    email: number
    status: number
    role: number
    bio: number
    joinDate: number
    rating: number
    loginId: number
    password: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    rating?: true
  }

  export type TeacherSumAggregateInputType = {
    rating?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    status?: true
    role?: true
    bio?: true
    joinDate?: true
    rating?: true
    loginId?: true
    password?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    status?: true
    role?: true
    bio?: true
    joinDate?: true
    rating?: true
    loginId?: true
    password?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    status?: true
    role?: true
    bio?: true
    joinDate?: true
    rating?: true
    loginId?: true
    password?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: string
    name: string
    email: string
    status: string
    role: string
    bio: string | null
    joinDate: string
    rating: number | null
    loginId: string | null
    password: string | null
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    bio?: boolean
    joinDate?: boolean
    rating?: boolean
    loginId?: boolean
    password?: boolean
    messages?: boolean | Teacher$messagesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    bio?: boolean
    joinDate?: boolean
    rating?: boolean
    loginId?: boolean
    password?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    bio?: boolean
    joinDate?: boolean
    rating?: boolean
    loginId?: boolean
    password?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    bio?: boolean
    joinDate?: boolean
    rating?: boolean
    loginId?: boolean
    password?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "status" | "role" | "bio" | "joinDate" | "rating" | "loginId" | "password", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Teacher$messagesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      status: string
      role: string
      bio: string | null
      joinDate: string
      rating: number | null
      loginId: string | null
      password: string | null
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Teacher$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'String'>
    readonly name: FieldRef<"Teacher", 'String'>
    readonly email: FieldRef<"Teacher", 'String'>
    readonly status: FieldRef<"Teacher", 'String'>
    readonly role: FieldRef<"Teacher", 'String'>
    readonly bio: FieldRef<"Teacher", 'String'>
    readonly joinDate: FieldRef<"Teacher", 'String'>
    readonly rating: FieldRef<"Teacher", 'Float'>
    readonly loginId: FieldRef<"Teacher", 'String'>
    readonly password: FieldRef<"Teacher", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.messages
   */
  export type Teacher$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model LessonSchedule
   */

  export type AggregateLessonSchedule = {
    _count: LessonScheduleCountAggregateOutputType | null
    _min: LessonScheduleMinAggregateOutputType | null
    _max: LessonScheduleMaxAggregateOutputType | null
  }

  export type LessonScheduleMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    studentName: string | null
    teacherName: string | null
    date: string | null
    time: string | null
    duration: string | null
    course: string | null
    type: string | null
    status: string | null
    tags: string | null
    meetingPassword: string | null
    meetingUrl: string | null
  }

  export type LessonScheduleMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    studentName: string | null
    teacherName: string | null
    date: string | null
    time: string | null
    duration: string | null
    course: string | null
    type: string | null
    status: string | null
    tags: string | null
    meetingPassword: string | null
    meetingUrl: string | null
  }

  export type LessonScheduleCountAggregateOutputType = {
    id: number
    studentId: number
    studentName: number
    teacherName: number
    date: number
    time: number
    duration: number
    course: number
    type: number
    status: number
    tags: number
    meetingPassword: number
    meetingUrl: number
    _all: number
  }


  export type LessonScheduleMinAggregateInputType = {
    id?: true
    studentId?: true
    studentName?: true
    teacherName?: true
    date?: true
    time?: true
    duration?: true
    course?: true
    type?: true
    status?: true
    tags?: true
    meetingPassword?: true
    meetingUrl?: true
  }

  export type LessonScheduleMaxAggregateInputType = {
    id?: true
    studentId?: true
    studentName?: true
    teacherName?: true
    date?: true
    time?: true
    duration?: true
    course?: true
    type?: true
    status?: true
    tags?: true
    meetingPassword?: true
    meetingUrl?: true
  }

  export type LessonScheduleCountAggregateInputType = {
    id?: true
    studentId?: true
    studentName?: true
    teacherName?: true
    date?: true
    time?: true
    duration?: true
    course?: true
    type?: true
    status?: true
    tags?: true
    meetingPassword?: true
    meetingUrl?: true
    _all?: true
  }

  export type LessonScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonSchedule to aggregate.
     */
    where?: LessonScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonSchedules to fetch.
     */
    orderBy?: LessonScheduleOrderByWithRelationInput | LessonScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonSchedules
    **/
    _count?: true | LessonScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonScheduleMaxAggregateInputType
  }

  export type GetLessonScheduleAggregateType<T extends LessonScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonSchedule[P]>
      : GetScalarType<T[P], AggregateLessonSchedule[P]>
  }




  export type LessonScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonScheduleWhereInput
    orderBy?: LessonScheduleOrderByWithAggregationInput | LessonScheduleOrderByWithAggregationInput[]
    by: LessonScheduleScalarFieldEnum[] | LessonScheduleScalarFieldEnum
    having?: LessonScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonScheduleCountAggregateInputType | true
    _min?: LessonScheduleMinAggregateInputType
    _max?: LessonScheduleMaxAggregateInputType
  }

  export type LessonScheduleGroupByOutputType = {
    id: string
    studentId: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status: string
    tags: string | null
    meetingPassword: string | null
    meetingUrl: string | null
    _count: LessonScheduleCountAggregateOutputType | null
    _min: LessonScheduleMinAggregateOutputType | null
    _max: LessonScheduleMaxAggregateOutputType | null
  }

  type GetLessonScheduleGroupByPayload<T extends LessonScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], LessonScheduleGroupByOutputType[P]>
        }
      >
    >


  export type LessonScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    studentName?: boolean
    teacherName?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    course?: boolean
    type?: boolean
    status?: boolean
    tags?: boolean
    meetingPassword?: boolean
    meetingUrl?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonSchedule"]>

  export type LessonScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    studentName?: boolean
    teacherName?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    course?: boolean
    type?: boolean
    status?: boolean
    tags?: boolean
    meetingPassword?: boolean
    meetingUrl?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonSchedule"]>

  export type LessonScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    studentName?: boolean
    teacherName?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    course?: boolean
    type?: boolean
    status?: boolean
    tags?: boolean
    meetingPassword?: boolean
    meetingUrl?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonSchedule"]>

  export type LessonScheduleSelectScalar = {
    id?: boolean
    studentId?: boolean
    studentName?: boolean
    teacherName?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    course?: boolean
    type?: boolean
    status?: boolean
    tags?: boolean
    meetingPassword?: boolean
    meetingUrl?: boolean
  }

  export type LessonScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "studentName" | "teacherName" | "date" | "time" | "duration" | "course" | "type" | "status" | "tags" | "meetingPassword" | "meetingUrl", ExtArgs["result"]["lessonSchedule"]>
  export type LessonScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type LessonScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type LessonScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $LessonSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonSchedule"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      studentName: string
      teacherName: string
      date: string
      time: string
      duration: string
      course: string
      type: string
      status: string
      tags: string | null
      meetingPassword: string | null
      meetingUrl: string | null
    }, ExtArgs["result"]["lessonSchedule"]>
    composites: {}
  }

  type LessonScheduleGetPayload<S extends boolean | null | undefined | LessonScheduleDefaultArgs> = $Result.GetResult<Prisma.$LessonSchedulePayload, S>

  type LessonScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonScheduleCountAggregateInputType | true
    }

  export interface LessonScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonSchedule'], meta: { name: 'LessonSchedule' } }
    /**
     * Find zero or one LessonSchedule that matches the filter.
     * @param {LessonScheduleFindUniqueArgs} args - Arguments to find a LessonSchedule
     * @example
     * // Get one LessonSchedule
     * const lessonSchedule = await prisma.lessonSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonScheduleFindUniqueArgs>(args: SelectSubset<T, LessonScheduleFindUniqueArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonScheduleFindUniqueOrThrowArgs} args - Arguments to find a LessonSchedule
     * @example
     * // Get one LessonSchedule
     * const lessonSchedule = await prisma.lessonSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleFindFirstArgs} args - Arguments to find a LessonSchedule
     * @example
     * // Get one LessonSchedule
     * const lessonSchedule = await prisma.lessonSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonScheduleFindFirstArgs>(args?: SelectSubset<T, LessonScheduleFindFirstArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleFindFirstOrThrowArgs} args - Arguments to find a LessonSchedule
     * @example
     * // Get one LessonSchedule
     * const lessonSchedule = await prisma.lessonSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonSchedules
     * const lessonSchedules = await prisma.lessonSchedule.findMany()
     * 
     * // Get first 10 LessonSchedules
     * const lessonSchedules = await prisma.lessonSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonScheduleWithIdOnly = await prisma.lessonSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonScheduleFindManyArgs>(args?: SelectSubset<T, LessonScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonSchedule.
     * @param {LessonScheduleCreateArgs} args - Arguments to create a LessonSchedule.
     * @example
     * // Create one LessonSchedule
     * const LessonSchedule = await prisma.lessonSchedule.create({
     *   data: {
     *     // ... data to create a LessonSchedule
     *   }
     * })
     * 
     */
    create<T extends LessonScheduleCreateArgs>(args: SelectSubset<T, LessonScheduleCreateArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonSchedules.
     * @param {LessonScheduleCreateManyArgs} args - Arguments to create many LessonSchedules.
     * @example
     * // Create many LessonSchedules
     * const lessonSchedule = await prisma.lessonSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonScheduleCreateManyArgs>(args?: SelectSubset<T, LessonScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LessonSchedules and returns the data saved in the database.
     * @param {LessonScheduleCreateManyAndReturnArgs} args - Arguments to create many LessonSchedules.
     * @example
     * // Create many LessonSchedules
     * const lessonSchedule = await prisma.lessonSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LessonSchedules and only return the `id`
     * const lessonScheduleWithIdOnly = await prisma.lessonSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LessonSchedule.
     * @param {LessonScheduleDeleteArgs} args - Arguments to delete one LessonSchedule.
     * @example
     * // Delete one LessonSchedule
     * const LessonSchedule = await prisma.lessonSchedule.delete({
     *   where: {
     *     // ... filter to delete one LessonSchedule
     *   }
     * })
     * 
     */
    delete<T extends LessonScheduleDeleteArgs>(args: SelectSubset<T, LessonScheduleDeleteArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonSchedule.
     * @param {LessonScheduleUpdateArgs} args - Arguments to update one LessonSchedule.
     * @example
     * // Update one LessonSchedule
     * const lessonSchedule = await prisma.lessonSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonScheduleUpdateArgs>(args: SelectSubset<T, LessonScheduleUpdateArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonSchedules.
     * @param {LessonScheduleDeleteManyArgs} args - Arguments to filter LessonSchedules to delete.
     * @example
     * // Delete a few LessonSchedules
     * const { count } = await prisma.lessonSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonScheduleDeleteManyArgs>(args?: SelectSubset<T, LessonScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonSchedules
     * const lessonSchedule = await prisma.lessonSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonScheduleUpdateManyArgs>(args: SelectSubset<T, LessonScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonSchedules and returns the data updated in the database.
     * @param {LessonScheduleUpdateManyAndReturnArgs} args - Arguments to update many LessonSchedules.
     * @example
     * // Update many LessonSchedules
     * const lessonSchedule = await prisma.lessonSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LessonSchedules and only return the `id`
     * const lessonScheduleWithIdOnly = await prisma.lessonSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LessonScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LessonSchedule.
     * @param {LessonScheduleUpsertArgs} args - Arguments to update or create a LessonSchedule.
     * @example
     * // Update or create a LessonSchedule
     * const lessonSchedule = await prisma.lessonSchedule.upsert({
     *   create: {
     *     // ... data to create a LessonSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonSchedule we want to update
     *   }
     * })
     */
    upsert<T extends LessonScheduleUpsertArgs>(args: SelectSubset<T, LessonScheduleUpsertArgs<ExtArgs>>): Prisma__LessonScheduleClient<$Result.GetResult<Prisma.$LessonSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LessonSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleCountArgs} args - Arguments to filter LessonSchedules to count.
     * @example
     * // Count the number of LessonSchedules
     * const count = await prisma.lessonSchedule.count({
     *   where: {
     *     // ... the filter for the LessonSchedules we want to count
     *   }
     * })
    **/
    count<T extends LessonScheduleCountArgs>(
      args?: Subset<T, LessonScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LessonScheduleAggregateArgs>(args: Subset<T, LessonScheduleAggregateArgs>): Prisma.PrismaPromise<GetLessonScheduleAggregateType<T>>

    /**
     * Group by LessonSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LessonScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonScheduleGroupByArgs['orderBy'] }
        : { orderBy?: LessonScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LessonScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonSchedule model
   */
  readonly fields: LessonScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LessonSchedule model
   */
  interface LessonScheduleFieldRefs {
    readonly id: FieldRef<"LessonSchedule", 'String'>
    readonly studentId: FieldRef<"LessonSchedule", 'String'>
    readonly studentName: FieldRef<"LessonSchedule", 'String'>
    readonly teacherName: FieldRef<"LessonSchedule", 'String'>
    readonly date: FieldRef<"LessonSchedule", 'String'>
    readonly time: FieldRef<"LessonSchedule", 'String'>
    readonly duration: FieldRef<"LessonSchedule", 'String'>
    readonly course: FieldRef<"LessonSchedule", 'String'>
    readonly type: FieldRef<"LessonSchedule", 'String'>
    readonly status: FieldRef<"LessonSchedule", 'String'>
    readonly tags: FieldRef<"LessonSchedule", 'String'>
    readonly meetingPassword: FieldRef<"LessonSchedule", 'String'>
    readonly meetingUrl: FieldRef<"LessonSchedule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LessonSchedule findUnique
   */
  export type LessonScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * Filter, which LessonSchedule to fetch.
     */
    where: LessonScheduleWhereUniqueInput
  }

  /**
   * LessonSchedule findUniqueOrThrow
   */
  export type LessonScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * Filter, which LessonSchedule to fetch.
     */
    where: LessonScheduleWhereUniqueInput
  }

  /**
   * LessonSchedule findFirst
   */
  export type LessonScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * Filter, which LessonSchedule to fetch.
     */
    where?: LessonScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonSchedules to fetch.
     */
    orderBy?: LessonScheduleOrderByWithRelationInput | LessonScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonSchedules.
     */
    cursor?: LessonScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonSchedules.
     */
    distinct?: LessonScheduleScalarFieldEnum | LessonScheduleScalarFieldEnum[]
  }

  /**
   * LessonSchedule findFirstOrThrow
   */
  export type LessonScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * Filter, which LessonSchedule to fetch.
     */
    where?: LessonScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonSchedules to fetch.
     */
    orderBy?: LessonScheduleOrderByWithRelationInput | LessonScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonSchedules.
     */
    cursor?: LessonScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonSchedules.
     */
    distinct?: LessonScheduleScalarFieldEnum | LessonScheduleScalarFieldEnum[]
  }

  /**
   * LessonSchedule findMany
   */
  export type LessonScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * Filter, which LessonSchedules to fetch.
     */
    where?: LessonScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonSchedules to fetch.
     */
    orderBy?: LessonScheduleOrderByWithRelationInput | LessonScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonSchedules.
     */
    cursor?: LessonScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonSchedules.
     */
    skip?: number
    distinct?: LessonScheduleScalarFieldEnum | LessonScheduleScalarFieldEnum[]
  }

  /**
   * LessonSchedule create
   */
  export type LessonScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a LessonSchedule.
     */
    data: XOR<LessonScheduleCreateInput, LessonScheduleUncheckedCreateInput>
  }

  /**
   * LessonSchedule createMany
   */
  export type LessonScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonSchedules.
     */
    data: LessonScheduleCreateManyInput | LessonScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LessonSchedule createManyAndReturn
   */
  export type LessonScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many LessonSchedules.
     */
    data: LessonScheduleCreateManyInput | LessonScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonSchedule update
   */
  export type LessonScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a LessonSchedule.
     */
    data: XOR<LessonScheduleUpdateInput, LessonScheduleUncheckedUpdateInput>
    /**
     * Choose, which LessonSchedule to update.
     */
    where: LessonScheduleWhereUniqueInput
  }

  /**
   * LessonSchedule updateMany
   */
  export type LessonScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonSchedules.
     */
    data: XOR<LessonScheduleUpdateManyMutationInput, LessonScheduleUncheckedUpdateManyInput>
    /**
     * Filter which LessonSchedules to update
     */
    where?: LessonScheduleWhereInput
    /**
     * Limit how many LessonSchedules to update.
     */
    limit?: number
  }

  /**
   * LessonSchedule updateManyAndReturn
   */
  export type LessonScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * The data used to update LessonSchedules.
     */
    data: XOR<LessonScheduleUpdateManyMutationInput, LessonScheduleUncheckedUpdateManyInput>
    /**
     * Filter which LessonSchedules to update
     */
    where?: LessonScheduleWhereInput
    /**
     * Limit how many LessonSchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonSchedule upsert
   */
  export type LessonScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the LessonSchedule to update in case it exists.
     */
    where: LessonScheduleWhereUniqueInput
    /**
     * In case the LessonSchedule found by the `where` argument doesn't exist, create a new LessonSchedule with this data.
     */
    create: XOR<LessonScheduleCreateInput, LessonScheduleUncheckedCreateInput>
    /**
     * In case the LessonSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonScheduleUpdateInput, LessonScheduleUncheckedUpdateInput>
  }

  /**
   * LessonSchedule delete
   */
  export type LessonScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
    /**
     * Filter which LessonSchedule to delete.
     */
    where: LessonScheduleWhereUniqueInput
  }

  /**
   * LessonSchedule deleteMany
   */
  export type LessonScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonSchedules to delete
     */
    where?: LessonScheduleWhereInput
    /**
     * Limit how many LessonSchedules to delete.
     */
    limit?: number
  }

  /**
   * LessonSchedule without action
   */
  export type LessonScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonSchedule
     */
    select?: LessonScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonSchedule
     */
    omit?: LessonScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonScheduleInclude<ExtArgs> | null
  }


  /**
   * Model LessonRecord
   */

  export type AggregateLessonRecord = {
    _count: LessonRecordCountAggregateOutputType | null
    _avg: LessonRecordAvgAggregateOutputType | null
    _sum: LessonRecordSumAggregateOutputType | null
    _min: LessonRecordMinAggregateOutputType | null
    _max: LessonRecordMaxAggregateOutputType | null
  }

  export type LessonRecordAvgAggregateOutputType = {
    grammar: number | null
    vocab: number | null
    pronunciation: number | null
    fluency: number | null
  }

  export type LessonRecordSumAggregateOutputType = {
    grammar: number | null
    vocab: number | null
    pronunciation: number | null
    fluency: number | null
  }

  export type LessonRecordMinAggregateOutputType = {
    id: string | null
    lessonId: string | null
    studentId: string | null
    date: string | null
    teacher: string | null
    title: string | null
    feedback: string | null
    nextScope: string | null
    importantExpressions: string | null
    homework: string | null
    internalNote: string | null
    grammar: number | null
    vocab: number | null
    pronunciation: number | null
    fluency: number | null
  }

  export type LessonRecordMaxAggregateOutputType = {
    id: string | null
    lessonId: string | null
    studentId: string | null
    date: string | null
    teacher: string | null
    title: string | null
    feedback: string | null
    nextScope: string | null
    importantExpressions: string | null
    homework: string | null
    internalNote: string | null
    grammar: number | null
    vocab: number | null
    pronunciation: number | null
    fluency: number | null
  }

  export type LessonRecordCountAggregateOutputType = {
    id: number
    lessonId: number
    studentId: number
    date: number
    teacher: number
    title: number
    feedback: number
    nextScope: number
    importantExpressions: number
    homework: number
    internalNote: number
    grammar: number
    vocab: number
    pronunciation: number
    fluency: number
    _all: number
  }


  export type LessonRecordAvgAggregateInputType = {
    grammar?: true
    vocab?: true
    pronunciation?: true
    fluency?: true
  }

  export type LessonRecordSumAggregateInputType = {
    grammar?: true
    vocab?: true
    pronunciation?: true
    fluency?: true
  }

  export type LessonRecordMinAggregateInputType = {
    id?: true
    lessonId?: true
    studentId?: true
    date?: true
    teacher?: true
    title?: true
    feedback?: true
    nextScope?: true
    importantExpressions?: true
    homework?: true
    internalNote?: true
    grammar?: true
    vocab?: true
    pronunciation?: true
    fluency?: true
  }

  export type LessonRecordMaxAggregateInputType = {
    id?: true
    lessonId?: true
    studentId?: true
    date?: true
    teacher?: true
    title?: true
    feedback?: true
    nextScope?: true
    importantExpressions?: true
    homework?: true
    internalNote?: true
    grammar?: true
    vocab?: true
    pronunciation?: true
    fluency?: true
  }

  export type LessonRecordCountAggregateInputType = {
    id?: true
    lessonId?: true
    studentId?: true
    date?: true
    teacher?: true
    title?: true
    feedback?: true
    nextScope?: true
    importantExpressions?: true
    homework?: true
    internalNote?: true
    grammar?: true
    vocab?: true
    pronunciation?: true
    fluency?: true
    _all?: true
  }

  export type LessonRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonRecord to aggregate.
     */
    where?: LessonRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonRecords to fetch.
     */
    orderBy?: LessonRecordOrderByWithRelationInput | LessonRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LessonRecords
    **/
    _count?: true | LessonRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LessonRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LessonRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonRecordMaxAggregateInputType
  }

  export type GetLessonRecordAggregateType<T extends LessonRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessonRecord[P]>
      : GetScalarType<T[P], AggregateLessonRecord[P]>
  }




  export type LessonRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonRecordWhereInput
    orderBy?: LessonRecordOrderByWithAggregationInput | LessonRecordOrderByWithAggregationInput[]
    by: LessonRecordScalarFieldEnum[] | LessonRecordScalarFieldEnum
    having?: LessonRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonRecordCountAggregateInputType | true
    _avg?: LessonRecordAvgAggregateInputType
    _sum?: LessonRecordSumAggregateInputType
    _min?: LessonRecordMinAggregateInputType
    _max?: LessonRecordMaxAggregateInputType
  }

  export type LessonRecordGroupByOutputType = {
    id: string
    lessonId: string | null
    studentId: string
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope: string | null
    importantExpressions: string | null
    homework: string | null
    internalNote: string | null
    grammar: number
    vocab: number
    pronunciation: number
    fluency: number
    _count: LessonRecordCountAggregateOutputType | null
    _avg: LessonRecordAvgAggregateOutputType | null
    _sum: LessonRecordSumAggregateOutputType | null
    _min: LessonRecordMinAggregateOutputType | null
    _max: LessonRecordMaxAggregateOutputType | null
  }

  type GetLessonRecordGroupByPayload<T extends LessonRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonRecordGroupByOutputType[P]>
            : GetScalarType<T[P], LessonRecordGroupByOutputType[P]>
        }
      >
    >


  export type LessonRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lessonId?: boolean
    studentId?: boolean
    date?: boolean
    teacher?: boolean
    title?: boolean
    feedback?: boolean
    nextScope?: boolean
    importantExpressions?: boolean
    homework?: boolean
    internalNote?: boolean
    grammar?: boolean
    vocab?: boolean
    pronunciation?: boolean
    fluency?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonRecord"]>

  export type LessonRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lessonId?: boolean
    studentId?: boolean
    date?: boolean
    teacher?: boolean
    title?: boolean
    feedback?: boolean
    nextScope?: boolean
    importantExpressions?: boolean
    homework?: boolean
    internalNote?: boolean
    grammar?: boolean
    vocab?: boolean
    pronunciation?: boolean
    fluency?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonRecord"]>

  export type LessonRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lessonId?: boolean
    studentId?: boolean
    date?: boolean
    teacher?: boolean
    title?: boolean
    feedback?: boolean
    nextScope?: boolean
    importantExpressions?: boolean
    homework?: boolean
    internalNote?: boolean
    grammar?: boolean
    vocab?: boolean
    pronunciation?: boolean
    fluency?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessonRecord"]>

  export type LessonRecordSelectScalar = {
    id?: boolean
    lessonId?: boolean
    studentId?: boolean
    date?: boolean
    teacher?: boolean
    title?: boolean
    feedback?: boolean
    nextScope?: boolean
    importantExpressions?: boolean
    homework?: boolean
    internalNote?: boolean
    grammar?: boolean
    vocab?: boolean
    pronunciation?: boolean
    fluency?: boolean
  }

  export type LessonRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lessonId" | "studentId" | "date" | "teacher" | "title" | "feedback" | "nextScope" | "importantExpressions" | "homework" | "internalNote" | "grammar" | "vocab" | "pronunciation" | "fluency", ExtArgs["result"]["lessonRecord"]>
  export type LessonRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type LessonRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type LessonRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $LessonRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LessonRecord"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lessonId: string | null
      studentId: string
      date: string
      teacher: string
      title: string
      feedback: string
      nextScope: string | null
      importantExpressions: string | null
      homework: string | null
      internalNote: string | null
      grammar: number
      vocab: number
      pronunciation: number
      fluency: number
    }, ExtArgs["result"]["lessonRecord"]>
    composites: {}
  }

  type LessonRecordGetPayload<S extends boolean | null | undefined | LessonRecordDefaultArgs> = $Result.GetResult<Prisma.$LessonRecordPayload, S>

  type LessonRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonRecordCountAggregateInputType | true
    }

  export interface LessonRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LessonRecord'], meta: { name: 'LessonRecord' } }
    /**
     * Find zero or one LessonRecord that matches the filter.
     * @param {LessonRecordFindUniqueArgs} args - Arguments to find a LessonRecord
     * @example
     * // Get one LessonRecord
     * const lessonRecord = await prisma.lessonRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonRecordFindUniqueArgs>(args: SelectSubset<T, LessonRecordFindUniqueArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LessonRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonRecordFindUniqueOrThrowArgs} args - Arguments to find a LessonRecord
     * @example
     * // Get one LessonRecord
     * const lessonRecord = await prisma.lessonRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordFindFirstArgs} args - Arguments to find a LessonRecord
     * @example
     * // Get one LessonRecord
     * const lessonRecord = await prisma.lessonRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonRecordFindFirstArgs>(args?: SelectSubset<T, LessonRecordFindFirstArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LessonRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordFindFirstOrThrowArgs} args - Arguments to find a LessonRecord
     * @example
     * // Get one LessonRecord
     * const lessonRecord = await prisma.lessonRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LessonRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LessonRecords
     * const lessonRecords = await prisma.lessonRecord.findMany()
     * 
     * // Get first 10 LessonRecords
     * const lessonRecords = await prisma.lessonRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonRecordWithIdOnly = await prisma.lessonRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonRecordFindManyArgs>(args?: SelectSubset<T, LessonRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LessonRecord.
     * @param {LessonRecordCreateArgs} args - Arguments to create a LessonRecord.
     * @example
     * // Create one LessonRecord
     * const LessonRecord = await prisma.lessonRecord.create({
     *   data: {
     *     // ... data to create a LessonRecord
     *   }
     * })
     * 
     */
    create<T extends LessonRecordCreateArgs>(args: SelectSubset<T, LessonRecordCreateArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LessonRecords.
     * @param {LessonRecordCreateManyArgs} args - Arguments to create many LessonRecords.
     * @example
     * // Create many LessonRecords
     * const lessonRecord = await prisma.lessonRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonRecordCreateManyArgs>(args?: SelectSubset<T, LessonRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LessonRecords and returns the data saved in the database.
     * @param {LessonRecordCreateManyAndReturnArgs} args - Arguments to create many LessonRecords.
     * @example
     * // Create many LessonRecords
     * const lessonRecord = await prisma.lessonRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LessonRecords and only return the `id`
     * const lessonRecordWithIdOnly = await prisma.lessonRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LessonRecord.
     * @param {LessonRecordDeleteArgs} args - Arguments to delete one LessonRecord.
     * @example
     * // Delete one LessonRecord
     * const LessonRecord = await prisma.lessonRecord.delete({
     *   where: {
     *     // ... filter to delete one LessonRecord
     *   }
     * })
     * 
     */
    delete<T extends LessonRecordDeleteArgs>(args: SelectSubset<T, LessonRecordDeleteArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LessonRecord.
     * @param {LessonRecordUpdateArgs} args - Arguments to update one LessonRecord.
     * @example
     * // Update one LessonRecord
     * const lessonRecord = await prisma.lessonRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonRecordUpdateArgs>(args: SelectSubset<T, LessonRecordUpdateArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LessonRecords.
     * @param {LessonRecordDeleteManyArgs} args - Arguments to filter LessonRecords to delete.
     * @example
     * // Delete a few LessonRecords
     * const { count } = await prisma.lessonRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonRecordDeleteManyArgs>(args?: SelectSubset<T, LessonRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LessonRecords
     * const lessonRecord = await prisma.lessonRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonRecordUpdateManyArgs>(args: SelectSubset<T, LessonRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LessonRecords and returns the data updated in the database.
     * @param {LessonRecordUpdateManyAndReturnArgs} args - Arguments to update many LessonRecords.
     * @example
     * // Update many LessonRecords
     * const lessonRecord = await prisma.lessonRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LessonRecords and only return the `id`
     * const lessonRecordWithIdOnly = await prisma.lessonRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LessonRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LessonRecord.
     * @param {LessonRecordUpsertArgs} args - Arguments to update or create a LessonRecord.
     * @example
     * // Update or create a LessonRecord
     * const lessonRecord = await prisma.lessonRecord.upsert({
     *   create: {
     *     // ... data to create a LessonRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LessonRecord we want to update
     *   }
     * })
     */
    upsert<T extends LessonRecordUpsertArgs>(args: SelectSubset<T, LessonRecordUpsertArgs<ExtArgs>>): Prisma__LessonRecordClient<$Result.GetResult<Prisma.$LessonRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LessonRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordCountArgs} args - Arguments to filter LessonRecords to count.
     * @example
     * // Count the number of LessonRecords
     * const count = await prisma.lessonRecord.count({
     *   where: {
     *     // ... the filter for the LessonRecords we want to count
     *   }
     * })
    **/
    count<T extends LessonRecordCountArgs>(
      args?: Subset<T, LessonRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LessonRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LessonRecordAggregateArgs>(args: Subset<T, LessonRecordAggregateArgs>): Prisma.PrismaPromise<GetLessonRecordAggregateType<T>>

    /**
     * Group by LessonRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LessonRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonRecordGroupByArgs['orderBy'] }
        : { orderBy?: LessonRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LessonRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LessonRecord model
   */
  readonly fields: LessonRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LessonRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LessonRecord model
   */
  interface LessonRecordFieldRefs {
    readonly id: FieldRef<"LessonRecord", 'String'>
    readonly lessonId: FieldRef<"LessonRecord", 'String'>
    readonly studentId: FieldRef<"LessonRecord", 'String'>
    readonly date: FieldRef<"LessonRecord", 'String'>
    readonly teacher: FieldRef<"LessonRecord", 'String'>
    readonly title: FieldRef<"LessonRecord", 'String'>
    readonly feedback: FieldRef<"LessonRecord", 'String'>
    readonly nextScope: FieldRef<"LessonRecord", 'String'>
    readonly importantExpressions: FieldRef<"LessonRecord", 'String'>
    readonly homework: FieldRef<"LessonRecord", 'String'>
    readonly internalNote: FieldRef<"LessonRecord", 'String'>
    readonly grammar: FieldRef<"LessonRecord", 'Int'>
    readonly vocab: FieldRef<"LessonRecord", 'Int'>
    readonly pronunciation: FieldRef<"LessonRecord", 'Int'>
    readonly fluency: FieldRef<"LessonRecord", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * LessonRecord findUnique
   */
  export type LessonRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * Filter, which LessonRecord to fetch.
     */
    where: LessonRecordWhereUniqueInput
  }

  /**
   * LessonRecord findUniqueOrThrow
   */
  export type LessonRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * Filter, which LessonRecord to fetch.
     */
    where: LessonRecordWhereUniqueInput
  }

  /**
   * LessonRecord findFirst
   */
  export type LessonRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * Filter, which LessonRecord to fetch.
     */
    where?: LessonRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonRecords to fetch.
     */
    orderBy?: LessonRecordOrderByWithRelationInput | LessonRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonRecords.
     */
    cursor?: LessonRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonRecords.
     */
    distinct?: LessonRecordScalarFieldEnum | LessonRecordScalarFieldEnum[]
  }

  /**
   * LessonRecord findFirstOrThrow
   */
  export type LessonRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * Filter, which LessonRecord to fetch.
     */
    where?: LessonRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonRecords to fetch.
     */
    orderBy?: LessonRecordOrderByWithRelationInput | LessonRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LessonRecords.
     */
    cursor?: LessonRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LessonRecords.
     */
    distinct?: LessonRecordScalarFieldEnum | LessonRecordScalarFieldEnum[]
  }

  /**
   * LessonRecord findMany
   */
  export type LessonRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * Filter, which LessonRecords to fetch.
     */
    where?: LessonRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LessonRecords to fetch.
     */
    orderBy?: LessonRecordOrderByWithRelationInput | LessonRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LessonRecords.
     */
    cursor?: LessonRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LessonRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LessonRecords.
     */
    skip?: number
    distinct?: LessonRecordScalarFieldEnum | LessonRecordScalarFieldEnum[]
  }

  /**
   * LessonRecord create
   */
  export type LessonRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a LessonRecord.
     */
    data: XOR<LessonRecordCreateInput, LessonRecordUncheckedCreateInput>
  }

  /**
   * LessonRecord createMany
   */
  export type LessonRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LessonRecords.
     */
    data: LessonRecordCreateManyInput | LessonRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LessonRecord createManyAndReturn
   */
  export type LessonRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * The data used to create many LessonRecords.
     */
    data: LessonRecordCreateManyInput | LessonRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonRecord update
   */
  export type LessonRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a LessonRecord.
     */
    data: XOR<LessonRecordUpdateInput, LessonRecordUncheckedUpdateInput>
    /**
     * Choose, which LessonRecord to update.
     */
    where: LessonRecordWhereUniqueInput
  }

  /**
   * LessonRecord updateMany
   */
  export type LessonRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LessonRecords.
     */
    data: XOR<LessonRecordUpdateManyMutationInput, LessonRecordUncheckedUpdateManyInput>
    /**
     * Filter which LessonRecords to update
     */
    where?: LessonRecordWhereInput
    /**
     * Limit how many LessonRecords to update.
     */
    limit?: number
  }

  /**
   * LessonRecord updateManyAndReturn
   */
  export type LessonRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * The data used to update LessonRecords.
     */
    data: XOR<LessonRecordUpdateManyMutationInput, LessonRecordUncheckedUpdateManyInput>
    /**
     * Filter which LessonRecords to update
     */
    where?: LessonRecordWhereInput
    /**
     * Limit how many LessonRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LessonRecord upsert
   */
  export type LessonRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the LessonRecord to update in case it exists.
     */
    where: LessonRecordWhereUniqueInput
    /**
     * In case the LessonRecord found by the `where` argument doesn't exist, create a new LessonRecord with this data.
     */
    create: XOR<LessonRecordCreateInput, LessonRecordUncheckedCreateInput>
    /**
     * In case the LessonRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonRecordUpdateInput, LessonRecordUncheckedUpdateInput>
  }

  /**
   * LessonRecord delete
   */
  export type LessonRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
    /**
     * Filter which LessonRecord to delete.
     */
    where: LessonRecordWhereUniqueInput
  }

  /**
   * LessonRecord deleteMany
   */
  export type LessonRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LessonRecords to delete
     */
    where?: LessonRecordWhereInput
    /**
     * Limit how many LessonRecords to delete.
     */
    limit?: number
  }

  /**
   * LessonRecord without action
   */
  export type LessonRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonRecord
     */
    select?: LessonRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LessonRecord
     */
    omit?: LessonRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonRecordInclude<ExtArgs> | null
  }


  /**
   * Model TestScore
   */

  export type AggregateTestScore = {
    _count: TestScoreCountAggregateOutputType | null
    _min: TestScoreMinAggregateOutputType | null
    _max: TestScoreMaxAggregateOutputType | null
  }

  export type TestScoreMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    type: string | null
    testName: string | null
    date: string | null
    grade: string | null
    score: string | null
    totalScore: string | null
    trend: string | null
    createdAt: Date | null
  }

  export type TestScoreMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    type: string | null
    testName: string | null
    date: string | null
    grade: string | null
    score: string | null
    totalScore: string | null
    trend: string | null
    createdAt: Date | null
  }

  export type TestScoreCountAggregateOutputType = {
    id: number
    studentId: number
    type: number
    testName: number
    date: number
    grade: number
    score: number
    totalScore: number
    trend: number
    createdAt: number
    _all: number
  }


  export type TestScoreMinAggregateInputType = {
    id?: true
    studentId?: true
    type?: true
    testName?: true
    date?: true
    grade?: true
    score?: true
    totalScore?: true
    trend?: true
    createdAt?: true
  }

  export type TestScoreMaxAggregateInputType = {
    id?: true
    studentId?: true
    type?: true
    testName?: true
    date?: true
    grade?: true
    score?: true
    totalScore?: true
    trend?: true
    createdAt?: true
  }

  export type TestScoreCountAggregateInputType = {
    id?: true
    studentId?: true
    type?: true
    testName?: true
    date?: true
    grade?: true
    score?: true
    totalScore?: true
    trend?: true
    createdAt?: true
    _all?: true
  }

  export type TestScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestScore to aggregate.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestScores
    **/
    _count?: true | TestScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestScoreMaxAggregateInputType
  }

  export type GetTestScoreAggregateType<T extends TestScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateTestScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestScore[P]>
      : GetScalarType<T[P], AggregateTestScore[P]>
  }




  export type TestScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithAggregationInput | TestScoreOrderByWithAggregationInput[]
    by: TestScoreScalarFieldEnum[] | TestScoreScalarFieldEnum
    having?: TestScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestScoreCountAggregateInputType | true
    _min?: TestScoreMinAggregateInputType
    _max?: TestScoreMaxAggregateInputType
  }

  export type TestScoreGroupByOutputType = {
    id: string
    studentId: string
    type: string
    testName: string
    date: string
    grade: string | null
    score: string
    totalScore: string | null
    trend: string
    createdAt: Date
    _count: TestScoreCountAggregateOutputType | null
    _min: TestScoreMinAggregateOutputType | null
    _max: TestScoreMaxAggregateOutputType | null
  }

  type GetTestScoreGroupByPayload<T extends TestScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestScoreGroupByOutputType[P]>
            : GetScalarType<T[P], TestScoreGroupByOutputType[P]>
        }
      >
    >


  export type TestScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    type?: boolean
    testName?: boolean
    date?: boolean
    grade?: boolean
    score?: boolean
    totalScore?: boolean
    trend?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    type?: boolean
    testName?: boolean
    date?: boolean
    grade?: boolean
    score?: boolean
    totalScore?: boolean
    trend?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    type?: boolean
    testName?: boolean
    date?: boolean
    grade?: boolean
    score?: boolean
    totalScore?: boolean
    trend?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectScalar = {
    id?: boolean
    studentId?: boolean
    type?: boolean
    testName?: boolean
    date?: boolean
    grade?: boolean
    score?: boolean
    totalScore?: boolean
    trend?: boolean
    createdAt?: boolean
  }

  export type TestScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "type" | "testName" | "date" | "grade" | "score" | "totalScore" | "trend" | "createdAt", ExtArgs["result"]["testScore"]>
  export type TestScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TestScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TestScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $TestScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestScore"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      type: string
      testName: string
      date: string
      grade: string | null
      score: string
      totalScore: string | null
      trend: string
      createdAt: Date
    }, ExtArgs["result"]["testScore"]>
    composites: {}
  }

  type TestScoreGetPayload<S extends boolean | null | undefined | TestScoreDefaultArgs> = $Result.GetResult<Prisma.$TestScorePayload, S>

  type TestScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestScoreCountAggregateInputType | true
    }

  export interface TestScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestScore'], meta: { name: 'TestScore' } }
    /**
     * Find zero or one TestScore that matches the filter.
     * @param {TestScoreFindUniqueArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestScoreFindUniqueArgs>(args: SelectSubset<T, TestScoreFindUniqueArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestScoreFindUniqueOrThrowArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, TestScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindFirstArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestScoreFindFirstArgs>(args?: SelectSubset<T, TestScoreFindFirstArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindFirstOrThrowArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, TestScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestScores
     * const testScores = await prisma.testScore.findMany()
     * 
     * // Get first 10 TestScores
     * const testScores = await prisma.testScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testScoreWithIdOnly = await prisma.testScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestScoreFindManyArgs>(args?: SelectSubset<T, TestScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestScore.
     * @param {TestScoreCreateArgs} args - Arguments to create a TestScore.
     * @example
     * // Create one TestScore
     * const TestScore = await prisma.testScore.create({
     *   data: {
     *     // ... data to create a TestScore
     *   }
     * })
     * 
     */
    create<T extends TestScoreCreateArgs>(args: SelectSubset<T, TestScoreCreateArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestScores.
     * @param {TestScoreCreateManyArgs} args - Arguments to create many TestScores.
     * @example
     * // Create many TestScores
     * const testScore = await prisma.testScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestScoreCreateManyArgs>(args?: SelectSubset<T, TestScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestScores and returns the data saved in the database.
     * @param {TestScoreCreateManyAndReturnArgs} args - Arguments to create many TestScores.
     * @example
     * // Create many TestScores
     * const testScore = await prisma.testScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestScores and only return the `id`
     * const testScoreWithIdOnly = await prisma.testScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, TestScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestScore.
     * @param {TestScoreDeleteArgs} args - Arguments to delete one TestScore.
     * @example
     * // Delete one TestScore
     * const TestScore = await prisma.testScore.delete({
     *   where: {
     *     // ... filter to delete one TestScore
     *   }
     * })
     * 
     */
    delete<T extends TestScoreDeleteArgs>(args: SelectSubset<T, TestScoreDeleteArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestScore.
     * @param {TestScoreUpdateArgs} args - Arguments to update one TestScore.
     * @example
     * // Update one TestScore
     * const testScore = await prisma.testScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestScoreUpdateArgs>(args: SelectSubset<T, TestScoreUpdateArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestScores.
     * @param {TestScoreDeleteManyArgs} args - Arguments to filter TestScores to delete.
     * @example
     * // Delete a few TestScores
     * const { count } = await prisma.testScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestScoreDeleteManyArgs>(args?: SelectSubset<T, TestScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestScores
     * const testScore = await prisma.testScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestScoreUpdateManyArgs>(args: SelectSubset<T, TestScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestScores and returns the data updated in the database.
     * @param {TestScoreUpdateManyAndReturnArgs} args - Arguments to update many TestScores.
     * @example
     * // Update many TestScores
     * const testScore = await prisma.testScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestScores and only return the `id`
     * const testScoreWithIdOnly = await prisma.testScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, TestScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestScore.
     * @param {TestScoreUpsertArgs} args - Arguments to update or create a TestScore.
     * @example
     * // Update or create a TestScore
     * const testScore = await prisma.testScore.upsert({
     *   create: {
     *     // ... data to create a TestScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestScore we want to update
     *   }
     * })
     */
    upsert<T extends TestScoreUpsertArgs>(args: SelectSubset<T, TestScoreUpsertArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreCountArgs} args - Arguments to filter TestScores to count.
     * @example
     * // Count the number of TestScores
     * const count = await prisma.testScore.count({
     *   where: {
     *     // ... the filter for the TestScores we want to count
     *   }
     * })
    **/
    count<T extends TestScoreCountArgs>(
      args?: Subset<T, TestScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestScoreAggregateArgs>(args: Subset<T, TestScoreAggregateArgs>): Prisma.PrismaPromise<GetTestScoreAggregateType<T>>

    /**
     * Group by TestScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestScoreGroupByArgs['orderBy'] }
        : { orderBy?: TestScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestScore model
   */
  readonly fields: TestScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestScore model
   */
  interface TestScoreFieldRefs {
    readonly id: FieldRef<"TestScore", 'String'>
    readonly studentId: FieldRef<"TestScore", 'String'>
    readonly type: FieldRef<"TestScore", 'String'>
    readonly testName: FieldRef<"TestScore", 'String'>
    readonly date: FieldRef<"TestScore", 'String'>
    readonly grade: FieldRef<"TestScore", 'String'>
    readonly score: FieldRef<"TestScore", 'String'>
    readonly totalScore: FieldRef<"TestScore", 'String'>
    readonly trend: FieldRef<"TestScore", 'String'>
    readonly createdAt: FieldRef<"TestScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestScore findUnique
   */
  export type TestScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore findUniqueOrThrow
   */
  export type TestScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore findFirst
   */
  export type TestScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore findFirstOrThrow
   */
  export type TestScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore findMany
   */
  export type TestScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScores to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore create
   */
  export type TestScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a TestScore.
     */
    data: XOR<TestScoreCreateInput, TestScoreUncheckedCreateInput>
  }

  /**
   * TestScore createMany
   */
  export type TestScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestScores.
     */
    data: TestScoreCreateManyInput | TestScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestScore createManyAndReturn
   */
  export type TestScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * The data used to create many TestScores.
     */
    data: TestScoreCreateManyInput | TestScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestScore update
   */
  export type TestScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a TestScore.
     */
    data: XOR<TestScoreUpdateInput, TestScoreUncheckedUpdateInput>
    /**
     * Choose, which TestScore to update.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore updateMany
   */
  export type TestScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestScores.
     */
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyInput>
    /**
     * Filter which TestScores to update
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to update.
     */
    limit?: number
  }

  /**
   * TestScore updateManyAndReturn
   */
  export type TestScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * The data used to update TestScores.
     */
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyInput>
    /**
     * Filter which TestScores to update
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestScore upsert
   */
  export type TestScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the TestScore to update in case it exists.
     */
    where: TestScoreWhereUniqueInput
    /**
     * In case the TestScore found by the `where` argument doesn't exist, create a new TestScore with this data.
     */
    create: XOR<TestScoreCreateInput, TestScoreUncheckedCreateInput>
    /**
     * In case the TestScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestScoreUpdateInput, TestScoreUncheckedUpdateInput>
  }

  /**
   * TestScore delete
   */
  export type TestScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter which TestScore to delete.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore deleteMany
   */
  export type TestScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestScores to delete
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to delete.
     */
    limit?: number
  }

  /**
   * TestScore without action
   */
  export type TestScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    teacherId: string | null
    sender: string | null
    text: string | null
    time: Date | null
    read: boolean | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    teacherId: string | null
    sender: string | null
    text: string | null
    time: Date | null
    read: boolean | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    studentId: number
    teacherId: number
    sender: number
    text: number
    time: number
    read: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    sender?: true
    text?: true
    time?: true
    read?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    sender?: true
    text?: true
    time?: true
    read?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    sender?: true
    text?: true
    time?: true
    read?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    studentId: string
    teacherId: string | null
    sender: string
    text: string
    time: Date
    read: boolean
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    sender?: boolean
    text?: boolean
    time?: boolean
    read?: boolean
    teacher?: boolean | Message$teacherArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    sender?: boolean
    text?: boolean
    time?: boolean
    read?: boolean
    teacher?: boolean | Message$teacherArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    sender?: boolean
    text?: boolean
    time?: boolean
    read?: boolean
    teacher?: boolean | Message$teacherArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    sender?: boolean
    text?: boolean
    time?: boolean
    read?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "teacherId" | "sender" | "text" | "time" | "read", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Message$teacherArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Message$teacherArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Message$teacherArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      teacherId: string | null
      sender: string
      text: string
      time: Date
      read: boolean
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends Message$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Message$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly studentId: FieldRef<"Message", 'String'>
    readonly teacherId: FieldRef<"Message", 'String'>
    readonly sender: FieldRef<"Message", 'String'>
    readonly text: FieldRef<"Message", 'String'>
    readonly time: FieldRef<"Message", 'DateTime'>
    readonly read: FieldRef<"Message", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.teacher
   */
  export type Message$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    date: string | null
    target: string | null
    priority: string | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    date: string | null
    target: string | null
    priority: string | null
  }

  export type AnnouncementCountAggregateOutputType = {
    id: number
    title: number
    content: number
    date: number
    target: number
    priority: number
    _all: number
  }


  export type AnnouncementMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    date?: true
    target?: true
    priority?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    date?: true
    target?: true
    priority?: true
  }

  export type AnnouncementCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    date?: true
    target?: true
    priority?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    id: string
    title: string
    content: string
    date: string
    target: string
    priority: string
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    date?: boolean
    target?: boolean
    priority?: boolean
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    date?: boolean
    target?: boolean
    priority?: boolean
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    date?: boolean
    target?: boolean
    priority?: boolean
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    date?: boolean
    target?: boolean
    priority?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "date" | "target" | "priority", ExtArgs["result"]["announcement"]>

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      date: string
      target: string
      priority: string
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementWithIdOnly = await prisma.announcement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Announcements and returns the data saved in the database.
     * @param {AnnouncementCreateManyAndReturnArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnouncementCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnouncementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements and returns the data updated in the database.
     * @param {AnnouncementUpdateManyAndReturnArgs} args - Arguments to update many Announcements.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnouncementUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnouncementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly id: FieldRef<"Announcement", 'String'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly date: FieldRef<"Announcement", 'String'>
    readonly target: FieldRef<"Announcement", 'String'>
    readonly priority: FieldRef<"Announcement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement createManyAndReturn
   */
  export type AnnouncementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement updateManyAndReturn
   */
  export type AnnouncementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    amount: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    amount: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    planName: string | null
    amount: number | null
    dueDate: string | null
    status: string | null
    createdAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    planName: string | null
    amount: number | null
    dueDate: string | null
    status: string | null
    createdAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    studentId: number
    planName: number
    amount: number
    dueDate: number
    status: number
    createdAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    amount?: true
  }

  export type InvoiceSumAggregateInputType = {
    amount?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    studentId?: true
    planName?: true
    amount?: true
    dueDate?: true
    status?: true
    createdAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    studentId?: true
    planName?: true
    amount?: true
    dueDate?: true
    status?: true
    createdAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    studentId?: true
    planName?: true
    amount?: true
    dueDate?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    studentId: string
    planName: string
    amount: number
    dueDate: string
    status: string
    createdAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    planName?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    planName?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    planName?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    studentId?: boolean
    planName?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "planName" | "amount" | "dueDate" | "status" | "createdAt", ExtArgs["result"]["invoice"]>
  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      planName: string
      amount: number
      dueDate: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly studentId: FieldRef<"Invoice", 'String'>
    readonly planName: FieldRef<"Invoice", 'String'>
    readonly amount: FieldRef<"Invoice", 'Int'>
    readonly dueDate: FieldRef<"Invoice", 'String'>
    readonly status: FieldRef<"Invoice", 'String'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model SchoolSettings
   */

  export type AggregateSchoolSettings = {
    _count: SchoolSettingsCountAggregateOutputType | null
    _avg: SchoolSettingsAvgAggregateOutputType | null
    _sum: SchoolSettingsSumAggregateOutputType | null
    _min: SchoolSettingsMinAggregateOutputType | null
    _max: SchoolSettingsMaxAggregateOutputType | null
  }

  export type SchoolSettingsAvgAggregateOutputType = {
    id: number | null
    defaultCourseDuration: number | null
    cancellationDeadlineHours: number | null
    monthlyGoal: number | null
  }

  export type SchoolSettingsSumAggregateOutputType = {
    id: number | null
    defaultCourseDuration: number | null
    cancellationDeadlineHours: number | null
    monthlyGoal: number | null
  }

  export type SchoolSettingsMinAggregateOutputType = {
    id: number | null
    schoolName: string | null
    timezone: string | null
    defaultCourseDuration: number | null
    allowStudentCancellation: boolean | null
    cancellationDeadlineHours: number | null
    monthlyGoal: number | null
  }

  export type SchoolSettingsMaxAggregateOutputType = {
    id: number | null
    schoolName: string | null
    timezone: string | null
    defaultCourseDuration: number | null
    allowStudentCancellation: boolean | null
    cancellationDeadlineHours: number | null
    monthlyGoal: number | null
  }

  export type SchoolSettingsCountAggregateOutputType = {
    id: number
    schoolName: number
    timezone: number
    defaultCourseDuration: number
    allowStudentCancellation: number
    cancellationDeadlineHours: number
    monthlyGoal: number
    _all: number
  }


  export type SchoolSettingsAvgAggregateInputType = {
    id?: true
    defaultCourseDuration?: true
    cancellationDeadlineHours?: true
    monthlyGoal?: true
  }

  export type SchoolSettingsSumAggregateInputType = {
    id?: true
    defaultCourseDuration?: true
    cancellationDeadlineHours?: true
    monthlyGoal?: true
  }

  export type SchoolSettingsMinAggregateInputType = {
    id?: true
    schoolName?: true
    timezone?: true
    defaultCourseDuration?: true
    allowStudentCancellation?: true
    cancellationDeadlineHours?: true
    monthlyGoal?: true
  }

  export type SchoolSettingsMaxAggregateInputType = {
    id?: true
    schoolName?: true
    timezone?: true
    defaultCourseDuration?: true
    allowStudentCancellation?: true
    cancellationDeadlineHours?: true
    monthlyGoal?: true
  }

  export type SchoolSettingsCountAggregateInputType = {
    id?: true
    schoolName?: true
    timezone?: true
    defaultCourseDuration?: true
    allowStudentCancellation?: true
    cancellationDeadlineHours?: true
    monthlyGoal?: true
    _all?: true
  }

  export type SchoolSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolSettings to aggregate.
     */
    where?: SchoolSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingsOrderByWithRelationInput | SchoolSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SchoolSettings
    **/
    _count?: true | SchoolSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolSettingsMaxAggregateInputType
  }

  export type GetSchoolSettingsAggregateType<T extends SchoolSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSchoolSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchoolSettings[P]>
      : GetScalarType<T[P], AggregateSchoolSettings[P]>
  }




  export type SchoolSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolSettingsWhereInput
    orderBy?: SchoolSettingsOrderByWithAggregationInput | SchoolSettingsOrderByWithAggregationInput[]
    by: SchoolSettingsScalarFieldEnum[] | SchoolSettingsScalarFieldEnum
    having?: SchoolSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolSettingsCountAggregateInputType | true
    _avg?: SchoolSettingsAvgAggregateInputType
    _sum?: SchoolSettingsSumAggregateInputType
    _min?: SchoolSettingsMinAggregateInputType
    _max?: SchoolSettingsMaxAggregateInputType
  }

  export type SchoolSettingsGroupByOutputType = {
    id: number
    schoolName: string
    timezone: string
    defaultCourseDuration: number
    allowStudentCancellation: boolean
    cancellationDeadlineHours: number
    monthlyGoal: number
    _count: SchoolSettingsCountAggregateOutputType | null
    _avg: SchoolSettingsAvgAggregateOutputType | null
    _sum: SchoolSettingsSumAggregateOutputType | null
    _min: SchoolSettingsMinAggregateOutputType | null
    _max: SchoolSettingsMaxAggregateOutputType | null
  }

  type GetSchoolSettingsGroupByPayload<T extends SchoolSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolSettingsGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    timezone?: boolean
    defaultCourseDuration?: boolean
    allowStudentCancellation?: boolean
    cancellationDeadlineHours?: boolean
    monthlyGoal?: boolean
  }, ExtArgs["result"]["schoolSettings"]>

  export type SchoolSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    timezone?: boolean
    defaultCourseDuration?: boolean
    allowStudentCancellation?: boolean
    cancellationDeadlineHours?: boolean
    monthlyGoal?: boolean
  }, ExtArgs["result"]["schoolSettings"]>

  export type SchoolSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    timezone?: boolean
    defaultCourseDuration?: boolean
    allowStudentCancellation?: boolean
    cancellationDeadlineHours?: boolean
    monthlyGoal?: boolean
  }, ExtArgs["result"]["schoolSettings"]>

  export type SchoolSettingsSelectScalar = {
    id?: boolean
    schoolName?: boolean
    timezone?: boolean
    defaultCourseDuration?: boolean
    allowStudentCancellation?: boolean
    cancellationDeadlineHours?: boolean
    monthlyGoal?: boolean
  }

  export type SchoolSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolName" | "timezone" | "defaultCourseDuration" | "allowStudentCancellation" | "cancellationDeadlineHours" | "monthlyGoal", ExtArgs["result"]["schoolSettings"]>

  export type $SchoolSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SchoolSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      schoolName: string
      timezone: string
      defaultCourseDuration: number
      allowStudentCancellation: boolean
      cancellationDeadlineHours: number
      monthlyGoal: number
    }, ExtArgs["result"]["schoolSettings"]>
    composites: {}
  }

  type SchoolSettingsGetPayload<S extends boolean | null | undefined | SchoolSettingsDefaultArgs> = $Result.GetResult<Prisma.$SchoolSettingsPayload, S>

  type SchoolSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchoolSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchoolSettingsCountAggregateInputType | true
    }

  export interface SchoolSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SchoolSettings'], meta: { name: 'SchoolSettings' } }
    /**
     * Find zero or one SchoolSettings that matches the filter.
     * @param {SchoolSettingsFindUniqueArgs} args - Arguments to find a SchoolSettings
     * @example
     * // Get one SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolSettingsFindUniqueArgs>(args: SelectSubset<T, SchoolSettingsFindUniqueArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SchoolSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchoolSettingsFindUniqueOrThrowArgs} args - Arguments to find a SchoolSettings
     * @example
     * // Get one SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SchoolSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsFindFirstArgs} args - Arguments to find a SchoolSettings
     * @example
     * // Get one SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolSettingsFindFirstArgs>(args?: SelectSubset<T, SchoolSettingsFindFirstArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SchoolSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsFindFirstOrThrowArgs} args - Arguments to find a SchoolSettings
     * @example
     * // Get one SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SchoolSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.findMany()
     * 
     * // Get first 10 SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolSettingsWithIdOnly = await prisma.schoolSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolSettingsFindManyArgs>(args?: SelectSubset<T, SchoolSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SchoolSettings.
     * @param {SchoolSettingsCreateArgs} args - Arguments to create a SchoolSettings.
     * @example
     * // Create one SchoolSettings
     * const SchoolSettings = await prisma.schoolSettings.create({
     *   data: {
     *     // ... data to create a SchoolSettings
     *   }
     * })
     * 
     */
    create<T extends SchoolSettingsCreateArgs>(args: SelectSubset<T, SchoolSettingsCreateArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SchoolSettings.
     * @param {SchoolSettingsCreateManyArgs} args - Arguments to create many SchoolSettings.
     * @example
     * // Create many SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolSettingsCreateManyArgs>(args?: SelectSubset<T, SchoolSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SchoolSettings and returns the data saved in the database.
     * @param {SchoolSettingsCreateManyAndReturnArgs} args - Arguments to create many SchoolSettings.
     * @example
     * // Create many SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SchoolSettings and only return the `id`
     * const schoolSettingsWithIdOnly = await prisma.schoolSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SchoolSettings.
     * @param {SchoolSettingsDeleteArgs} args - Arguments to delete one SchoolSettings.
     * @example
     * // Delete one SchoolSettings
     * const SchoolSettings = await prisma.schoolSettings.delete({
     *   where: {
     *     // ... filter to delete one SchoolSettings
     *   }
     * })
     * 
     */
    delete<T extends SchoolSettingsDeleteArgs>(args: SelectSubset<T, SchoolSettingsDeleteArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SchoolSettings.
     * @param {SchoolSettingsUpdateArgs} args - Arguments to update one SchoolSettings.
     * @example
     * // Update one SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolSettingsUpdateArgs>(args: SelectSubset<T, SchoolSettingsUpdateArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SchoolSettings.
     * @param {SchoolSettingsDeleteManyArgs} args - Arguments to filter SchoolSettings to delete.
     * @example
     * // Delete a few SchoolSettings
     * const { count } = await prisma.schoolSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolSettingsDeleteManyArgs>(args?: SelectSubset<T, SchoolSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchoolSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolSettingsUpdateManyArgs>(args: SelectSubset<T, SchoolSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchoolSettings and returns the data updated in the database.
     * @param {SchoolSettingsUpdateManyAndReturnArgs} args - Arguments to update many SchoolSettings.
     * @example
     * // Update many SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SchoolSettings and only return the `id`
     * const schoolSettingsWithIdOnly = await prisma.schoolSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SchoolSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SchoolSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SchoolSettings.
     * @param {SchoolSettingsUpsertArgs} args - Arguments to update or create a SchoolSettings.
     * @example
     * // Update or create a SchoolSettings
     * const schoolSettings = await prisma.schoolSettings.upsert({
     *   create: {
     *     // ... data to create a SchoolSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchoolSettings we want to update
     *   }
     * })
     */
    upsert<T extends SchoolSettingsUpsertArgs>(args: SelectSubset<T, SchoolSettingsUpsertArgs<ExtArgs>>): Prisma__SchoolSettingsClient<$Result.GetResult<Prisma.$SchoolSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SchoolSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsCountArgs} args - Arguments to filter SchoolSettings to count.
     * @example
     * // Count the number of SchoolSettings
     * const count = await prisma.schoolSettings.count({
     *   where: {
     *     // ... the filter for the SchoolSettings we want to count
     *   }
     * })
    **/
    count<T extends SchoolSettingsCountArgs>(
      args?: Subset<T, SchoolSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SchoolSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolSettingsAggregateArgs>(args: Subset<T, SchoolSettingsAggregateArgs>): Prisma.PrismaPromise<GetSchoolSettingsAggregateType<T>>

    /**
     * Group by SchoolSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchoolSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolSettingsGroupByArgs['orderBy'] }
        : { orderBy?: SchoolSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchoolSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SchoolSettings model
   */
  readonly fields: SchoolSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SchoolSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SchoolSettings model
   */
  interface SchoolSettingsFieldRefs {
    readonly id: FieldRef<"SchoolSettings", 'Int'>
    readonly schoolName: FieldRef<"SchoolSettings", 'String'>
    readonly timezone: FieldRef<"SchoolSettings", 'String'>
    readonly defaultCourseDuration: FieldRef<"SchoolSettings", 'Int'>
    readonly allowStudentCancellation: FieldRef<"SchoolSettings", 'Boolean'>
    readonly cancellationDeadlineHours: FieldRef<"SchoolSettings", 'Int'>
    readonly monthlyGoal: FieldRef<"SchoolSettings", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SchoolSettings findUnique
   */
  export type SchoolSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SchoolSettings to fetch.
     */
    where: SchoolSettingsWhereUniqueInput
  }

  /**
   * SchoolSettings findUniqueOrThrow
   */
  export type SchoolSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SchoolSettings to fetch.
     */
    where: SchoolSettingsWhereUniqueInput
  }

  /**
   * SchoolSettings findFirst
   */
  export type SchoolSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SchoolSettings to fetch.
     */
    where?: SchoolSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingsOrderByWithRelationInput | SchoolSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolSettings.
     */
    cursor?: SchoolSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolSettings.
     */
    distinct?: SchoolSettingsScalarFieldEnum | SchoolSettingsScalarFieldEnum[]
  }

  /**
   * SchoolSettings findFirstOrThrow
   */
  export type SchoolSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SchoolSettings to fetch.
     */
    where?: SchoolSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingsOrderByWithRelationInput | SchoolSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolSettings.
     */
    cursor?: SchoolSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolSettings.
     */
    distinct?: SchoolSettingsScalarFieldEnum | SchoolSettingsScalarFieldEnum[]
  }

  /**
   * SchoolSettings findMany
   */
  export type SchoolSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SchoolSettings to fetch.
     */
    where?: SchoolSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolSettings to fetch.
     */
    orderBy?: SchoolSettingsOrderByWithRelationInput | SchoolSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SchoolSettings.
     */
    cursor?: SchoolSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolSettings.
     */
    skip?: number
    distinct?: SchoolSettingsScalarFieldEnum | SchoolSettingsScalarFieldEnum[]
  }

  /**
   * SchoolSettings create
   */
  export type SchoolSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a SchoolSettings.
     */
    data: XOR<SchoolSettingsCreateInput, SchoolSettingsUncheckedCreateInput>
  }

  /**
   * SchoolSettings createMany
   */
  export type SchoolSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchoolSettings.
     */
    data: SchoolSettingsCreateManyInput | SchoolSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchoolSettings createManyAndReturn
   */
  export type SchoolSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many SchoolSettings.
     */
    data: SchoolSettingsCreateManyInput | SchoolSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchoolSettings update
   */
  export type SchoolSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a SchoolSettings.
     */
    data: XOR<SchoolSettingsUpdateInput, SchoolSettingsUncheckedUpdateInput>
    /**
     * Choose, which SchoolSettings to update.
     */
    where: SchoolSettingsWhereUniqueInput
  }

  /**
   * SchoolSettings updateMany
   */
  export type SchoolSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SchoolSettings.
     */
    data: XOR<SchoolSettingsUpdateManyMutationInput, SchoolSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SchoolSettings to update
     */
    where?: SchoolSettingsWhereInput
    /**
     * Limit how many SchoolSettings to update.
     */
    limit?: number
  }

  /**
   * SchoolSettings updateManyAndReturn
   */
  export type SchoolSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * The data used to update SchoolSettings.
     */
    data: XOR<SchoolSettingsUpdateManyMutationInput, SchoolSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SchoolSettings to update
     */
    where?: SchoolSettingsWhereInput
    /**
     * Limit how many SchoolSettings to update.
     */
    limit?: number
  }

  /**
   * SchoolSettings upsert
   */
  export type SchoolSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the SchoolSettings to update in case it exists.
     */
    where: SchoolSettingsWhereUniqueInput
    /**
     * In case the SchoolSettings found by the `where` argument doesn't exist, create a new SchoolSettings with this data.
     */
    create: XOR<SchoolSettingsCreateInput, SchoolSettingsUncheckedCreateInput>
    /**
     * In case the SchoolSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolSettingsUpdateInput, SchoolSettingsUncheckedUpdateInput>
  }

  /**
   * SchoolSettings delete
   */
  export type SchoolSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
    /**
     * Filter which SchoolSettings to delete.
     */
    where: SchoolSettingsWhereUniqueInput
  }

  /**
   * SchoolSettings deleteMany
   */
  export type SchoolSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolSettings to delete
     */
    where?: SchoolSettingsWhereInput
    /**
     * Limit how many SchoolSettings to delete.
     */
    limit?: number
  }

  /**
   * SchoolSettings without action
   */
  export type SchoolSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolSettings
     */
    select?: SchoolSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolSettings
     */
    omit?: SchoolSettingsOmit<ExtArgs> | null
  }


  /**
   * Model VocabProgress
   */

  export type AggregateVocabProgress = {
    _count: VocabProgressCountAggregateOutputType | null
    _avg: VocabProgressAvgAggregateOutputType | null
    _sum: VocabProgressSumAggregateOutputType | null
    _min: VocabProgressMinAggregateOutputType | null
    _max: VocabProgressMaxAggregateOutputType | null
  }

  export type VocabProgressAvgAggregateOutputType = {
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
  }

  export type VocabProgressSumAggregateOutputType = {
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
  }

  export type VocabProgressMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    level: string | null
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
    mode: string | null
    lastPlayedAt: Date | null
  }

  export type VocabProgressMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    level: string | null
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
    mode: string | null
    lastPlayedAt: Date | null
  }

  export type VocabProgressCountAggregateOutputType = {
    id: number
    studentId: number
    level: number
    stageIndex: number
    completions: number
    perfectClears: number
    highestScore: number
    mode: number
    lastPlayedAt: number
    _all: number
  }


  export type VocabProgressAvgAggregateInputType = {
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
  }

  export type VocabProgressSumAggregateInputType = {
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
  }

  export type VocabProgressMinAggregateInputType = {
    id?: true
    studentId?: true
    level?: true
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
    mode?: true
    lastPlayedAt?: true
  }

  export type VocabProgressMaxAggregateInputType = {
    id?: true
    studentId?: true
    level?: true
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
    mode?: true
    lastPlayedAt?: true
  }

  export type VocabProgressCountAggregateInputType = {
    id?: true
    studentId?: true
    level?: true
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
    mode?: true
    lastPlayedAt?: true
    _all?: true
  }

  export type VocabProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocabProgress to aggregate.
     */
    where?: VocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabProgresses to fetch.
     */
    orderBy?: VocabProgressOrderByWithRelationInput | VocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VocabProgresses
    **/
    _count?: true | VocabProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VocabProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VocabProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VocabProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VocabProgressMaxAggregateInputType
  }

  export type GetVocabProgressAggregateType<T extends VocabProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateVocabProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVocabProgress[P]>
      : GetScalarType<T[P], AggregateVocabProgress[P]>
  }




  export type VocabProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabProgressWhereInput
    orderBy?: VocabProgressOrderByWithAggregationInput | VocabProgressOrderByWithAggregationInput[]
    by: VocabProgressScalarFieldEnum[] | VocabProgressScalarFieldEnum
    having?: VocabProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VocabProgressCountAggregateInputType | true
    _avg?: VocabProgressAvgAggregateInputType
    _sum?: VocabProgressSumAggregateInputType
    _min?: VocabProgressMinAggregateInputType
    _max?: VocabProgressMaxAggregateInputType
  }

  export type VocabProgressGroupByOutputType = {
    id: string
    studentId: string
    level: string
    stageIndex: number
    completions: number
    perfectClears: number
    highestScore: number
    mode: string
    lastPlayedAt: Date
    _count: VocabProgressCountAggregateOutputType | null
    _avg: VocabProgressAvgAggregateOutputType | null
    _sum: VocabProgressSumAggregateOutputType | null
    _min: VocabProgressMinAggregateOutputType | null
    _max: VocabProgressMaxAggregateOutputType | null
  }

  type GetVocabProgressGroupByPayload<T extends VocabProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VocabProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VocabProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VocabProgressGroupByOutputType[P]>
            : GetScalarType<T[P], VocabProgressGroupByOutputType[P]>
        }
      >
    >


  export type VocabProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    mode?: boolean
    lastPlayedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabProgress"]>

  export type VocabProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    mode?: boolean
    lastPlayedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabProgress"]>

  export type VocabProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    mode?: boolean
    lastPlayedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabProgress"]>

  export type VocabProgressSelectScalar = {
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    mode?: boolean
    lastPlayedAt?: boolean
  }

  export type VocabProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "level" | "stageIndex" | "completions" | "perfectClears" | "highestScore" | "mode" | "lastPlayedAt", ExtArgs["result"]["vocabProgress"]>
  export type VocabProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type VocabProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type VocabProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $VocabProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VocabProgress"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      level: string
      stageIndex: number
      completions: number
      perfectClears: number
      highestScore: number
      mode: string
      lastPlayedAt: Date
    }, ExtArgs["result"]["vocabProgress"]>
    composites: {}
  }

  type VocabProgressGetPayload<S extends boolean | null | undefined | VocabProgressDefaultArgs> = $Result.GetResult<Prisma.$VocabProgressPayload, S>

  type VocabProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VocabProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VocabProgressCountAggregateInputType | true
    }

  export interface VocabProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VocabProgress'], meta: { name: 'VocabProgress' } }
    /**
     * Find zero or one VocabProgress that matches the filter.
     * @param {VocabProgressFindUniqueArgs} args - Arguments to find a VocabProgress
     * @example
     * // Get one VocabProgress
     * const vocabProgress = await prisma.vocabProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocabProgressFindUniqueArgs>(args: SelectSubset<T, VocabProgressFindUniqueArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VocabProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocabProgressFindUniqueOrThrowArgs} args - Arguments to find a VocabProgress
     * @example
     * // Get one VocabProgress
     * const vocabProgress = await prisma.vocabProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocabProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, VocabProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocabProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressFindFirstArgs} args - Arguments to find a VocabProgress
     * @example
     * // Get one VocabProgress
     * const vocabProgress = await prisma.vocabProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocabProgressFindFirstArgs>(args?: SelectSubset<T, VocabProgressFindFirstArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VocabProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressFindFirstOrThrowArgs} args - Arguments to find a VocabProgress
     * @example
     * // Get one VocabProgress
     * const vocabProgress = await prisma.vocabProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocabProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, VocabProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VocabProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VocabProgresses
     * const vocabProgresses = await prisma.vocabProgress.findMany()
     * 
     * // Get first 10 VocabProgresses
     * const vocabProgresses = await prisma.vocabProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vocabProgressWithIdOnly = await prisma.vocabProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VocabProgressFindManyArgs>(args?: SelectSubset<T, VocabProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VocabProgress.
     * @param {VocabProgressCreateArgs} args - Arguments to create a VocabProgress.
     * @example
     * // Create one VocabProgress
     * const VocabProgress = await prisma.vocabProgress.create({
     *   data: {
     *     // ... data to create a VocabProgress
     *   }
     * })
     * 
     */
    create<T extends VocabProgressCreateArgs>(args: SelectSubset<T, VocabProgressCreateArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VocabProgresses.
     * @param {VocabProgressCreateManyArgs} args - Arguments to create many VocabProgresses.
     * @example
     * // Create many VocabProgresses
     * const vocabProgress = await prisma.vocabProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VocabProgressCreateManyArgs>(args?: SelectSubset<T, VocabProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VocabProgresses and returns the data saved in the database.
     * @param {VocabProgressCreateManyAndReturnArgs} args - Arguments to create many VocabProgresses.
     * @example
     * // Create many VocabProgresses
     * const vocabProgress = await prisma.vocabProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VocabProgresses and only return the `id`
     * const vocabProgressWithIdOnly = await prisma.vocabProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VocabProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, VocabProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VocabProgress.
     * @param {VocabProgressDeleteArgs} args - Arguments to delete one VocabProgress.
     * @example
     * // Delete one VocabProgress
     * const VocabProgress = await prisma.vocabProgress.delete({
     *   where: {
     *     // ... filter to delete one VocabProgress
     *   }
     * })
     * 
     */
    delete<T extends VocabProgressDeleteArgs>(args: SelectSubset<T, VocabProgressDeleteArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VocabProgress.
     * @param {VocabProgressUpdateArgs} args - Arguments to update one VocabProgress.
     * @example
     * // Update one VocabProgress
     * const vocabProgress = await prisma.vocabProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VocabProgressUpdateArgs>(args: SelectSubset<T, VocabProgressUpdateArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VocabProgresses.
     * @param {VocabProgressDeleteManyArgs} args - Arguments to filter VocabProgresses to delete.
     * @example
     * // Delete a few VocabProgresses
     * const { count } = await prisma.vocabProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VocabProgressDeleteManyArgs>(args?: SelectSubset<T, VocabProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VocabProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VocabProgresses
     * const vocabProgress = await prisma.vocabProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VocabProgressUpdateManyArgs>(args: SelectSubset<T, VocabProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VocabProgresses and returns the data updated in the database.
     * @param {VocabProgressUpdateManyAndReturnArgs} args - Arguments to update many VocabProgresses.
     * @example
     * // Update many VocabProgresses
     * const vocabProgress = await prisma.vocabProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VocabProgresses and only return the `id`
     * const vocabProgressWithIdOnly = await prisma.vocabProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VocabProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, VocabProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VocabProgress.
     * @param {VocabProgressUpsertArgs} args - Arguments to update or create a VocabProgress.
     * @example
     * // Update or create a VocabProgress
     * const vocabProgress = await prisma.vocabProgress.upsert({
     *   create: {
     *     // ... data to create a VocabProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VocabProgress we want to update
     *   }
     * })
     */
    upsert<T extends VocabProgressUpsertArgs>(args: SelectSubset<T, VocabProgressUpsertArgs<ExtArgs>>): Prisma__VocabProgressClient<$Result.GetResult<Prisma.$VocabProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VocabProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressCountArgs} args - Arguments to filter VocabProgresses to count.
     * @example
     * // Count the number of VocabProgresses
     * const count = await prisma.vocabProgress.count({
     *   where: {
     *     // ... the filter for the VocabProgresses we want to count
     *   }
     * })
    **/
    count<T extends VocabProgressCountArgs>(
      args?: Subset<T, VocabProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VocabProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VocabProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VocabProgressAggregateArgs>(args: Subset<T, VocabProgressAggregateArgs>): Prisma.PrismaPromise<GetVocabProgressAggregateType<T>>

    /**
     * Group by VocabProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VocabProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VocabProgressGroupByArgs['orderBy'] }
        : { orderBy?: VocabProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VocabProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocabProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VocabProgress model
   */
  readonly fields: VocabProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VocabProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VocabProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VocabProgress model
   */
  interface VocabProgressFieldRefs {
    readonly id: FieldRef<"VocabProgress", 'String'>
    readonly studentId: FieldRef<"VocabProgress", 'String'>
    readonly level: FieldRef<"VocabProgress", 'String'>
    readonly stageIndex: FieldRef<"VocabProgress", 'Int'>
    readonly completions: FieldRef<"VocabProgress", 'Int'>
    readonly perfectClears: FieldRef<"VocabProgress", 'Int'>
    readonly highestScore: FieldRef<"VocabProgress", 'Int'>
    readonly mode: FieldRef<"VocabProgress", 'String'>
    readonly lastPlayedAt: FieldRef<"VocabProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VocabProgress findUnique
   */
  export type VocabProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which VocabProgress to fetch.
     */
    where: VocabProgressWhereUniqueInput
  }

  /**
   * VocabProgress findUniqueOrThrow
   */
  export type VocabProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which VocabProgress to fetch.
     */
    where: VocabProgressWhereUniqueInput
  }

  /**
   * VocabProgress findFirst
   */
  export type VocabProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which VocabProgress to fetch.
     */
    where?: VocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabProgresses to fetch.
     */
    orderBy?: VocabProgressOrderByWithRelationInput | VocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocabProgresses.
     */
    cursor?: VocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocabProgresses.
     */
    distinct?: VocabProgressScalarFieldEnum | VocabProgressScalarFieldEnum[]
  }

  /**
   * VocabProgress findFirstOrThrow
   */
  export type VocabProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which VocabProgress to fetch.
     */
    where?: VocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabProgresses to fetch.
     */
    orderBy?: VocabProgressOrderByWithRelationInput | VocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VocabProgresses.
     */
    cursor?: VocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VocabProgresses.
     */
    distinct?: VocabProgressScalarFieldEnum | VocabProgressScalarFieldEnum[]
  }

  /**
   * VocabProgress findMany
   */
  export type VocabProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * Filter, which VocabProgresses to fetch.
     */
    where?: VocabProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VocabProgresses to fetch.
     */
    orderBy?: VocabProgressOrderByWithRelationInput | VocabProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VocabProgresses.
     */
    cursor?: VocabProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VocabProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VocabProgresses.
     */
    skip?: number
    distinct?: VocabProgressScalarFieldEnum | VocabProgressScalarFieldEnum[]
  }

  /**
   * VocabProgress create
   */
  export type VocabProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a VocabProgress.
     */
    data: XOR<VocabProgressCreateInput, VocabProgressUncheckedCreateInput>
  }

  /**
   * VocabProgress createMany
   */
  export type VocabProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VocabProgresses.
     */
    data: VocabProgressCreateManyInput | VocabProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VocabProgress createManyAndReturn
   */
  export type VocabProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * The data used to create many VocabProgresses.
     */
    data: VocabProgressCreateManyInput | VocabProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VocabProgress update
   */
  export type VocabProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a VocabProgress.
     */
    data: XOR<VocabProgressUpdateInput, VocabProgressUncheckedUpdateInput>
    /**
     * Choose, which VocabProgress to update.
     */
    where: VocabProgressWhereUniqueInput
  }

  /**
   * VocabProgress updateMany
   */
  export type VocabProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VocabProgresses.
     */
    data: XOR<VocabProgressUpdateManyMutationInput, VocabProgressUncheckedUpdateManyInput>
    /**
     * Filter which VocabProgresses to update
     */
    where?: VocabProgressWhereInput
    /**
     * Limit how many VocabProgresses to update.
     */
    limit?: number
  }

  /**
   * VocabProgress updateManyAndReturn
   */
  export type VocabProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * The data used to update VocabProgresses.
     */
    data: XOR<VocabProgressUpdateManyMutationInput, VocabProgressUncheckedUpdateManyInput>
    /**
     * Filter which VocabProgresses to update
     */
    where?: VocabProgressWhereInput
    /**
     * Limit how many VocabProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VocabProgress upsert
   */
  export type VocabProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the VocabProgress to update in case it exists.
     */
    where: VocabProgressWhereUniqueInput
    /**
     * In case the VocabProgress found by the `where` argument doesn't exist, create a new VocabProgress with this data.
     */
    create: XOR<VocabProgressCreateInput, VocabProgressUncheckedCreateInput>
    /**
     * In case the VocabProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VocabProgressUpdateInput, VocabProgressUncheckedUpdateInput>
  }

  /**
   * VocabProgress delete
   */
  export type VocabProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
    /**
     * Filter which VocabProgress to delete.
     */
    where: VocabProgressWhereUniqueInput
  }

  /**
   * VocabProgress deleteMany
   */
  export type VocabProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VocabProgresses to delete
     */
    where?: VocabProgressWhereInput
    /**
     * Limit how many VocabProgresses to delete.
     */
    limit?: number
  }

  /**
   * VocabProgress without action
   */
  export type VocabProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabProgress
     */
    select?: VocabProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VocabProgress
     */
    omit?: VocabProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabProgressInclude<ExtArgs> | null
  }


  /**
   * Model GrammarProgress
   */

  export type AggregateGrammarProgress = {
    _count: GrammarProgressCountAggregateOutputType | null
    _avg: GrammarProgressAvgAggregateOutputType | null
    _sum: GrammarProgressSumAggregateOutputType | null
    _min: GrammarProgressMinAggregateOutputType | null
    _max: GrammarProgressMaxAggregateOutputType | null
  }

  export type GrammarProgressAvgAggregateOutputType = {
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
  }

  export type GrammarProgressSumAggregateOutputType = {
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
  }

  export type GrammarProgressMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    level: string | null
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
    lastPlayedAt: Date | null
  }

  export type GrammarProgressMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    level: string | null
    stageIndex: number | null
    completions: number | null
    perfectClears: number | null
    highestScore: number | null
    lastPlayedAt: Date | null
  }

  export type GrammarProgressCountAggregateOutputType = {
    id: number
    studentId: number
    level: number
    stageIndex: number
    completions: number
    perfectClears: number
    highestScore: number
    lastPlayedAt: number
    _all: number
  }


  export type GrammarProgressAvgAggregateInputType = {
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
  }

  export type GrammarProgressSumAggregateInputType = {
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
  }

  export type GrammarProgressMinAggregateInputType = {
    id?: true
    studentId?: true
    level?: true
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
    lastPlayedAt?: true
  }

  export type GrammarProgressMaxAggregateInputType = {
    id?: true
    studentId?: true
    level?: true
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
    lastPlayedAt?: true
  }

  export type GrammarProgressCountAggregateInputType = {
    id?: true
    studentId?: true
    level?: true
    stageIndex?: true
    completions?: true
    perfectClears?: true
    highestScore?: true
    lastPlayedAt?: true
    _all?: true
  }

  export type GrammarProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrammarProgress to aggregate.
     */
    where?: GrammarProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarProgresses to fetch.
     */
    orderBy?: GrammarProgressOrderByWithRelationInput | GrammarProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrammarProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GrammarProgresses
    **/
    _count?: true | GrammarProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GrammarProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GrammarProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrammarProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrammarProgressMaxAggregateInputType
  }

  export type GetGrammarProgressAggregateType<T extends GrammarProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateGrammarProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrammarProgress[P]>
      : GetScalarType<T[P], AggregateGrammarProgress[P]>
  }




  export type GrammarProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrammarProgressWhereInput
    orderBy?: GrammarProgressOrderByWithAggregationInput | GrammarProgressOrderByWithAggregationInput[]
    by: GrammarProgressScalarFieldEnum[] | GrammarProgressScalarFieldEnum
    having?: GrammarProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrammarProgressCountAggregateInputType | true
    _avg?: GrammarProgressAvgAggregateInputType
    _sum?: GrammarProgressSumAggregateInputType
    _min?: GrammarProgressMinAggregateInputType
    _max?: GrammarProgressMaxAggregateInputType
  }

  export type GrammarProgressGroupByOutputType = {
    id: string
    studentId: string
    level: string
    stageIndex: number
    completions: number
    perfectClears: number
    highestScore: number
    lastPlayedAt: Date
    _count: GrammarProgressCountAggregateOutputType | null
    _avg: GrammarProgressAvgAggregateOutputType | null
    _sum: GrammarProgressSumAggregateOutputType | null
    _min: GrammarProgressMinAggregateOutputType | null
    _max: GrammarProgressMaxAggregateOutputType | null
  }

  type GetGrammarProgressGroupByPayload<T extends GrammarProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrammarProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrammarProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrammarProgressGroupByOutputType[P]>
            : GetScalarType<T[P], GrammarProgressGroupByOutputType[P]>
        }
      >
    >


  export type GrammarProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    lastPlayedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarProgress"]>

  export type GrammarProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    lastPlayedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarProgress"]>

  export type GrammarProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    lastPlayedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarProgress"]>

  export type GrammarProgressSelectScalar = {
    id?: boolean
    studentId?: boolean
    level?: boolean
    stageIndex?: boolean
    completions?: boolean
    perfectClears?: boolean
    highestScore?: boolean
    lastPlayedAt?: boolean
  }

  export type GrammarProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "level" | "stageIndex" | "completions" | "perfectClears" | "highestScore" | "lastPlayedAt", ExtArgs["result"]["grammarProgress"]>
  export type GrammarProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type GrammarProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type GrammarProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $GrammarProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GrammarProgress"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      level: string
      stageIndex: number
      completions: number
      perfectClears: number
      highestScore: number
      lastPlayedAt: Date
    }, ExtArgs["result"]["grammarProgress"]>
    composites: {}
  }

  type GrammarProgressGetPayload<S extends boolean | null | undefined | GrammarProgressDefaultArgs> = $Result.GetResult<Prisma.$GrammarProgressPayload, S>

  type GrammarProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GrammarProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GrammarProgressCountAggregateInputType | true
    }

  export interface GrammarProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GrammarProgress'], meta: { name: 'GrammarProgress' } }
    /**
     * Find zero or one GrammarProgress that matches the filter.
     * @param {GrammarProgressFindUniqueArgs} args - Arguments to find a GrammarProgress
     * @example
     * // Get one GrammarProgress
     * const grammarProgress = await prisma.grammarProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrammarProgressFindUniqueArgs>(args: SelectSubset<T, GrammarProgressFindUniqueArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GrammarProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GrammarProgressFindUniqueOrThrowArgs} args - Arguments to find a GrammarProgress
     * @example
     * // Get one GrammarProgress
     * const grammarProgress = await prisma.grammarProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrammarProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, GrammarProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrammarProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressFindFirstArgs} args - Arguments to find a GrammarProgress
     * @example
     * // Get one GrammarProgress
     * const grammarProgress = await prisma.grammarProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrammarProgressFindFirstArgs>(args?: SelectSubset<T, GrammarProgressFindFirstArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrammarProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressFindFirstOrThrowArgs} args - Arguments to find a GrammarProgress
     * @example
     * // Get one GrammarProgress
     * const grammarProgress = await prisma.grammarProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrammarProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, GrammarProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GrammarProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GrammarProgresses
     * const grammarProgresses = await prisma.grammarProgress.findMany()
     * 
     * // Get first 10 GrammarProgresses
     * const grammarProgresses = await prisma.grammarProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const grammarProgressWithIdOnly = await prisma.grammarProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrammarProgressFindManyArgs>(args?: SelectSubset<T, GrammarProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GrammarProgress.
     * @param {GrammarProgressCreateArgs} args - Arguments to create a GrammarProgress.
     * @example
     * // Create one GrammarProgress
     * const GrammarProgress = await prisma.grammarProgress.create({
     *   data: {
     *     // ... data to create a GrammarProgress
     *   }
     * })
     * 
     */
    create<T extends GrammarProgressCreateArgs>(args: SelectSubset<T, GrammarProgressCreateArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GrammarProgresses.
     * @param {GrammarProgressCreateManyArgs} args - Arguments to create many GrammarProgresses.
     * @example
     * // Create many GrammarProgresses
     * const grammarProgress = await prisma.grammarProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrammarProgressCreateManyArgs>(args?: SelectSubset<T, GrammarProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GrammarProgresses and returns the data saved in the database.
     * @param {GrammarProgressCreateManyAndReturnArgs} args - Arguments to create many GrammarProgresses.
     * @example
     * // Create many GrammarProgresses
     * const grammarProgress = await prisma.grammarProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GrammarProgresses and only return the `id`
     * const grammarProgressWithIdOnly = await prisma.grammarProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrammarProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, GrammarProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GrammarProgress.
     * @param {GrammarProgressDeleteArgs} args - Arguments to delete one GrammarProgress.
     * @example
     * // Delete one GrammarProgress
     * const GrammarProgress = await prisma.grammarProgress.delete({
     *   where: {
     *     // ... filter to delete one GrammarProgress
     *   }
     * })
     * 
     */
    delete<T extends GrammarProgressDeleteArgs>(args: SelectSubset<T, GrammarProgressDeleteArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GrammarProgress.
     * @param {GrammarProgressUpdateArgs} args - Arguments to update one GrammarProgress.
     * @example
     * // Update one GrammarProgress
     * const grammarProgress = await prisma.grammarProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrammarProgressUpdateArgs>(args: SelectSubset<T, GrammarProgressUpdateArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GrammarProgresses.
     * @param {GrammarProgressDeleteManyArgs} args - Arguments to filter GrammarProgresses to delete.
     * @example
     * // Delete a few GrammarProgresses
     * const { count } = await prisma.grammarProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrammarProgressDeleteManyArgs>(args?: SelectSubset<T, GrammarProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrammarProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GrammarProgresses
     * const grammarProgress = await prisma.grammarProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrammarProgressUpdateManyArgs>(args: SelectSubset<T, GrammarProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrammarProgresses and returns the data updated in the database.
     * @param {GrammarProgressUpdateManyAndReturnArgs} args - Arguments to update many GrammarProgresses.
     * @example
     * // Update many GrammarProgresses
     * const grammarProgress = await prisma.grammarProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GrammarProgresses and only return the `id`
     * const grammarProgressWithIdOnly = await prisma.grammarProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GrammarProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, GrammarProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GrammarProgress.
     * @param {GrammarProgressUpsertArgs} args - Arguments to update or create a GrammarProgress.
     * @example
     * // Update or create a GrammarProgress
     * const grammarProgress = await prisma.grammarProgress.upsert({
     *   create: {
     *     // ... data to create a GrammarProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GrammarProgress we want to update
     *   }
     * })
     */
    upsert<T extends GrammarProgressUpsertArgs>(args: SelectSubset<T, GrammarProgressUpsertArgs<ExtArgs>>): Prisma__GrammarProgressClient<$Result.GetResult<Prisma.$GrammarProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GrammarProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressCountArgs} args - Arguments to filter GrammarProgresses to count.
     * @example
     * // Count the number of GrammarProgresses
     * const count = await prisma.grammarProgress.count({
     *   where: {
     *     // ... the filter for the GrammarProgresses we want to count
     *   }
     * })
    **/
    count<T extends GrammarProgressCountArgs>(
      args?: Subset<T, GrammarProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrammarProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GrammarProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GrammarProgressAggregateArgs>(args: Subset<T, GrammarProgressAggregateArgs>): Prisma.PrismaPromise<GetGrammarProgressAggregateType<T>>

    /**
     * Group by GrammarProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GrammarProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrammarProgressGroupByArgs['orderBy'] }
        : { orderBy?: GrammarProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GrammarProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrammarProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GrammarProgress model
   */
  readonly fields: GrammarProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GrammarProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrammarProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GrammarProgress model
   */
  interface GrammarProgressFieldRefs {
    readonly id: FieldRef<"GrammarProgress", 'String'>
    readonly studentId: FieldRef<"GrammarProgress", 'String'>
    readonly level: FieldRef<"GrammarProgress", 'String'>
    readonly stageIndex: FieldRef<"GrammarProgress", 'Int'>
    readonly completions: FieldRef<"GrammarProgress", 'Int'>
    readonly perfectClears: FieldRef<"GrammarProgress", 'Int'>
    readonly highestScore: FieldRef<"GrammarProgress", 'Int'>
    readonly lastPlayedAt: FieldRef<"GrammarProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GrammarProgress findUnique
   */
  export type GrammarProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * Filter, which GrammarProgress to fetch.
     */
    where: GrammarProgressWhereUniqueInput
  }

  /**
   * GrammarProgress findUniqueOrThrow
   */
  export type GrammarProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * Filter, which GrammarProgress to fetch.
     */
    where: GrammarProgressWhereUniqueInput
  }

  /**
   * GrammarProgress findFirst
   */
  export type GrammarProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * Filter, which GrammarProgress to fetch.
     */
    where?: GrammarProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarProgresses to fetch.
     */
    orderBy?: GrammarProgressOrderByWithRelationInput | GrammarProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrammarProgresses.
     */
    cursor?: GrammarProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrammarProgresses.
     */
    distinct?: GrammarProgressScalarFieldEnum | GrammarProgressScalarFieldEnum[]
  }

  /**
   * GrammarProgress findFirstOrThrow
   */
  export type GrammarProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * Filter, which GrammarProgress to fetch.
     */
    where?: GrammarProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarProgresses to fetch.
     */
    orderBy?: GrammarProgressOrderByWithRelationInput | GrammarProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrammarProgresses.
     */
    cursor?: GrammarProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrammarProgresses.
     */
    distinct?: GrammarProgressScalarFieldEnum | GrammarProgressScalarFieldEnum[]
  }

  /**
   * GrammarProgress findMany
   */
  export type GrammarProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * Filter, which GrammarProgresses to fetch.
     */
    where?: GrammarProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarProgresses to fetch.
     */
    orderBy?: GrammarProgressOrderByWithRelationInput | GrammarProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GrammarProgresses.
     */
    cursor?: GrammarProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarProgresses.
     */
    skip?: number
    distinct?: GrammarProgressScalarFieldEnum | GrammarProgressScalarFieldEnum[]
  }

  /**
   * GrammarProgress create
   */
  export type GrammarProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a GrammarProgress.
     */
    data: XOR<GrammarProgressCreateInput, GrammarProgressUncheckedCreateInput>
  }

  /**
   * GrammarProgress createMany
   */
  export type GrammarProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GrammarProgresses.
     */
    data: GrammarProgressCreateManyInput | GrammarProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GrammarProgress createManyAndReturn
   */
  export type GrammarProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * The data used to create many GrammarProgresses.
     */
    data: GrammarProgressCreateManyInput | GrammarProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrammarProgress update
   */
  export type GrammarProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a GrammarProgress.
     */
    data: XOR<GrammarProgressUpdateInput, GrammarProgressUncheckedUpdateInput>
    /**
     * Choose, which GrammarProgress to update.
     */
    where: GrammarProgressWhereUniqueInput
  }

  /**
   * GrammarProgress updateMany
   */
  export type GrammarProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GrammarProgresses.
     */
    data: XOR<GrammarProgressUpdateManyMutationInput, GrammarProgressUncheckedUpdateManyInput>
    /**
     * Filter which GrammarProgresses to update
     */
    where?: GrammarProgressWhereInput
    /**
     * Limit how many GrammarProgresses to update.
     */
    limit?: number
  }

  /**
   * GrammarProgress updateManyAndReturn
   */
  export type GrammarProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * The data used to update GrammarProgresses.
     */
    data: XOR<GrammarProgressUpdateManyMutationInput, GrammarProgressUncheckedUpdateManyInput>
    /**
     * Filter which GrammarProgresses to update
     */
    where?: GrammarProgressWhereInput
    /**
     * Limit how many GrammarProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrammarProgress upsert
   */
  export type GrammarProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the GrammarProgress to update in case it exists.
     */
    where: GrammarProgressWhereUniqueInput
    /**
     * In case the GrammarProgress found by the `where` argument doesn't exist, create a new GrammarProgress with this data.
     */
    create: XOR<GrammarProgressCreateInput, GrammarProgressUncheckedCreateInput>
    /**
     * In case the GrammarProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrammarProgressUpdateInput, GrammarProgressUncheckedUpdateInput>
  }

  /**
   * GrammarProgress delete
   */
  export type GrammarProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
    /**
     * Filter which GrammarProgress to delete.
     */
    where: GrammarProgressWhereUniqueInput
  }

  /**
   * GrammarProgress deleteMany
   */
  export type GrammarProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrammarProgresses to delete
     */
    where?: GrammarProgressWhereInput
    /**
     * Limit how many GrammarProgresses to delete.
     */
    limit?: number
  }

  /**
   * GrammarProgress without action
   */
  export type GrammarProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarProgress
     */
    select?: GrammarProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarProgress
     */
    omit?: GrammarProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarProgressInclude<ExtArgs> | null
  }


  /**
   * Model GrammarPoint
   */

  export type AggregateGrammarPoint = {
    _count: GrammarPointCountAggregateOutputType | null
    _avg: GrammarPointAvgAggregateOutputType | null
    _sum: GrammarPointSumAggregateOutputType | null
    _min: GrammarPointMinAggregateOutputType | null
    _max: GrammarPointMaxAggregateOutputType | null
  }

  export type GrammarPointAvgAggregateOutputType = {
    order: number | null
  }

  export type GrammarPointSumAggregateOutputType = {
    order: number | null
  }

  export type GrammarPointMinAggregateOutputType = {
    id: string | null
    label: string | null
    category: string | null
    order: number | null
  }

  export type GrammarPointMaxAggregateOutputType = {
    id: string | null
    label: string | null
    category: string | null
    order: number | null
  }

  export type GrammarPointCountAggregateOutputType = {
    id: number
    label: number
    category: number
    order: number
    _all: number
  }


  export type GrammarPointAvgAggregateInputType = {
    order?: true
  }

  export type GrammarPointSumAggregateInputType = {
    order?: true
  }

  export type GrammarPointMinAggregateInputType = {
    id?: true
    label?: true
    category?: true
    order?: true
  }

  export type GrammarPointMaxAggregateInputType = {
    id?: true
    label?: true
    category?: true
    order?: true
  }

  export type GrammarPointCountAggregateInputType = {
    id?: true
    label?: true
    category?: true
    order?: true
    _all?: true
  }

  export type GrammarPointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrammarPoint to aggregate.
     */
    where?: GrammarPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarPoints to fetch.
     */
    orderBy?: GrammarPointOrderByWithRelationInput | GrammarPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrammarPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GrammarPoints
    **/
    _count?: true | GrammarPointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GrammarPointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GrammarPointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrammarPointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrammarPointMaxAggregateInputType
  }

  export type GetGrammarPointAggregateType<T extends GrammarPointAggregateArgs> = {
        [P in keyof T & keyof AggregateGrammarPoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrammarPoint[P]>
      : GetScalarType<T[P], AggregateGrammarPoint[P]>
  }




  export type GrammarPointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrammarPointWhereInput
    orderBy?: GrammarPointOrderByWithAggregationInput | GrammarPointOrderByWithAggregationInput[]
    by: GrammarPointScalarFieldEnum[] | GrammarPointScalarFieldEnum
    having?: GrammarPointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrammarPointCountAggregateInputType | true
    _avg?: GrammarPointAvgAggregateInputType
    _sum?: GrammarPointSumAggregateInputType
    _min?: GrammarPointMinAggregateInputType
    _max?: GrammarPointMaxAggregateInputType
  }

  export type GrammarPointGroupByOutputType = {
    id: string
    label: string
    category: string
    order: number
    _count: GrammarPointCountAggregateOutputType | null
    _avg: GrammarPointAvgAggregateOutputType | null
    _sum: GrammarPointSumAggregateOutputType | null
    _min: GrammarPointMinAggregateOutputType | null
    _max: GrammarPointMaxAggregateOutputType | null
  }

  type GetGrammarPointGroupByPayload<T extends GrammarPointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrammarPointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrammarPointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrammarPointGroupByOutputType[P]>
            : GetScalarType<T[P], GrammarPointGroupByOutputType[P]>
        }
      >
    >


  export type GrammarPointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    category?: boolean
    order?: boolean
    masteries?: boolean | GrammarPoint$masteriesArgs<ExtArgs>
    _count?: boolean | GrammarPointCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarPoint"]>

  export type GrammarPointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    category?: boolean
    order?: boolean
  }, ExtArgs["result"]["grammarPoint"]>

  export type GrammarPointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    category?: boolean
    order?: boolean
  }, ExtArgs["result"]["grammarPoint"]>

  export type GrammarPointSelectScalar = {
    id?: boolean
    label?: boolean
    category?: boolean
    order?: boolean
  }

  export type GrammarPointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "category" | "order", ExtArgs["result"]["grammarPoint"]>
  export type GrammarPointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masteries?: boolean | GrammarPoint$masteriesArgs<ExtArgs>
    _count?: boolean | GrammarPointCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GrammarPointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GrammarPointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GrammarPointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GrammarPoint"
    objects: {
      masteries: Prisma.$GrammarMasteryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      category: string
      order: number
    }, ExtArgs["result"]["grammarPoint"]>
    composites: {}
  }

  type GrammarPointGetPayload<S extends boolean | null | undefined | GrammarPointDefaultArgs> = $Result.GetResult<Prisma.$GrammarPointPayload, S>

  type GrammarPointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GrammarPointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GrammarPointCountAggregateInputType | true
    }

  export interface GrammarPointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GrammarPoint'], meta: { name: 'GrammarPoint' } }
    /**
     * Find zero or one GrammarPoint that matches the filter.
     * @param {GrammarPointFindUniqueArgs} args - Arguments to find a GrammarPoint
     * @example
     * // Get one GrammarPoint
     * const grammarPoint = await prisma.grammarPoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrammarPointFindUniqueArgs>(args: SelectSubset<T, GrammarPointFindUniqueArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GrammarPoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GrammarPointFindUniqueOrThrowArgs} args - Arguments to find a GrammarPoint
     * @example
     * // Get one GrammarPoint
     * const grammarPoint = await prisma.grammarPoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrammarPointFindUniqueOrThrowArgs>(args: SelectSubset<T, GrammarPointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrammarPoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointFindFirstArgs} args - Arguments to find a GrammarPoint
     * @example
     * // Get one GrammarPoint
     * const grammarPoint = await prisma.grammarPoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrammarPointFindFirstArgs>(args?: SelectSubset<T, GrammarPointFindFirstArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrammarPoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointFindFirstOrThrowArgs} args - Arguments to find a GrammarPoint
     * @example
     * // Get one GrammarPoint
     * const grammarPoint = await prisma.grammarPoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrammarPointFindFirstOrThrowArgs>(args?: SelectSubset<T, GrammarPointFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GrammarPoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GrammarPoints
     * const grammarPoints = await prisma.grammarPoint.findMany()
     * 
     * // Get first 10 GrammarPoints
     * const grammarPoints = await prisma.grammarPoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const grammarPointWithIdOnly = await prisma.grammarPoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrammarPointFindManyArgs>(args?: SelectSubset<T, GrammarPointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GrammarPoint.
     * @param {GrammarPointCreateArgs} args - Arguments to create a GrammarPoint.
     * @example
     * // Create one GrammarPoint
     * const GrammarPoint = await prisma.grammarPoint.create({
     *   data: {
     *     // ... data to create a GrammarPoint
     *   }
     * })
     * 
     */
    create<T extends GrammarPointCreateArgs>(args: SelectSubset<T, GrammarPointCreateArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GrammarPoints.
     * @param {GrammarPointCreateManyArgs} args - Arguments to create many GrammarPoints.
     * @example
     * // Create many GrammarPoints
     * const grammarPoint = await prisma.grammarPoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrammarPointCreateManyArgs>(args?: SelectSubset<T, GrammarPointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GrammarPoints and returns the data saved in the database.
     * @param {GrammarPointCreateManyAndReturnArgs} args - Arguments to create many GrammarPoints.
     * @example
     * // Create many GrammarPoints
     * const grammarPoint = await prisma.grammarPoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GrammarPoints and only return the `id`
     * const grammarPointWithIdOnly = await prisma.grammarPoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrammarPointCreateManyAndReturnArgs>(args?: SelectSubset<T, GrammarPointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GrammarPoint.
     * @param {GrammarPointDeleteArgs} args - Arguments to delete one GrammarPoint.
     * @example
     * // Delete one GrammarPoint
     * const GrammarPoint = await prisma.grammarPoint.delete({
     *   where: {
     *     // ... filter to delete one GrammarPoint
     *   }
     * })
     * 
     */
    delete<T extends GrammarPointDeleteArgs>(args: SelectSubset<T, GrammarPointDeleteArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GrammarPoint.
     * @param {GrammarPointUpdateArgs} args - Arguments to update one GrammarPoint.
     * @example
     * // Update one GrammarPoint
     * const grammarPoint = await prisma.grammarPoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrammarPointUpdateArgs>(args: SelectSubset<T, GrammarPointUpdateArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GrammarPoints.
     * @param {GrammarPointDeleteManyArgs} args - Arguments to filter GrammarPoints to delete.
     * @example
     * // Delete a few GrammarPoints
     * const { count } = await prisma.grammarPoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrammarPointDeleteManyArgs>(args?: SelectSubset<T, GrammarPointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrammarPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GrammarPoints
     * const grammarPoint = await prisma.grammarPoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrammarPointUpdateManyArgs>(args: SelectSubset<T, GrammarPointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrammarPoints and returns the data updated in the database.
     * @param {GrammarPointUpdateManyAndReturnArgs} args - Arguments to update many GrammarPoints.
     * @example
     * // Update many GrammarPoints
     * const grammarPoint = await prisma.grammarPoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GrammarPoints and only return the `id`
     * const grammarPointWithIdOnly = await prisma.grammarPoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GrammarPointUpdateManyAndReturnArgs>(args: SelectSubset<T, GrammarPointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GrammarPoint.
     * @param {GrammarPointUpsertArgs} args - Arguments to update or create a GrammarPoint.
     * @example
     * // Update or create a GrammarPoint
     * const grammarPoint = await prisma.grammarPoint.upsert({
     *   create: {
     *     // ... data to create a GrammarPoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GrammarPoint we want to update
     *   }
     * })
     */
    upsert<T extends GrammarPointUpsertArgs>(args: SelectSubset<T, GrammarPointUpsertArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GrammarPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointCountArgs} args - Arguments to filter GrammarPoints to count.
     * @example
     * // Count the number of GrammarPoints
     * const count = await prisma.grammarPoint.count({
     *   where: {
     *     // ... the filter for the GrammarPoints we want to count
     *   }
     * })
    **/
    count<T extends GrammarPointCountArgs>(
      args?: Subset<T, GrammarPointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrammarPointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GrammarPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GrammarPointAggregateArgs>(args: Subset<T, GrammarPointAggregateArgs>): Prisma.PrismaPromise<GetGrammarPointAggregateType<T>>

    /**
     * Group by GrammarPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarPointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GrammarPointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrammarPointGroupByArgs['orderBy'] }
        : { orderBy?: GrammarPointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GrammarPointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrammarPointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GrammarPoint model
   */
  readonly fields: GrammarPointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GrammarPoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrammarPointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    masteries<T extends GrammarPoint$masteriesArgs<ExtArgs> = {}>(args?: Subset<T, GrammarPoint$masteriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GrammarPoint model
   */
  interface GrammarPointFieldRefs {
    readonly id: FieldRef<"GrammarPoint", 'String'>
    readonly label: FieldRef<"GrammarPoint", 'String'>
    readonly category: FieldRef<"GrammarPoint", 'String'>
    readonly order: FieldRef<"GrammarPoint", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GrammarPoint findUnique
   */
  export type GrammarPointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * Filter, which GrammarPoint to fetch.
     */
    where: GrammarPointWhereUniqueInput
  }

  /**
   * GrammarPoint findUniqueOrThrow
   */
  export type GrammarPointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * Filter, which GrammarPoint to fetch.
     */
    where: GrammarPointWhereUniqueInput
  }

  /**
   * GrammarPoint findFirst
   */
  export type GrammarPointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * Filter, which GrammarPoint to fetch.
     */
    where?: GrammarPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarPoints to fetch.
     */
    orderBy?: GrammarPointOrderByWithRelationInput | GrammarPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrammarPoints.
     */
    cursor?: GrammarPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrammarPoints.
     */
    distinct?: GrammarPointScalarFieldEnum | GrammarPointScalarFieldEnum[]
  }

  /**
   * GrammarPoint findFirstOrThrow
   */
  export type GrammarPointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * Filter, which GrammarPoint to fetch.
     */
    where?: GrammarPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarPoints to fetch.
     */
    orderBy?: GrammarPointOrderByWithRelationInput | GrammarPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrammarPoints.
     */
    cursor?: GrammarPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrammarPoints.
     */
    distinct?: GrammarPointScalarFieldEnum | GrammarPointScalarFieldEnum[]
  }

  /**
   * GrammarPoint findMany
   */
  export type GrammarPointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * Filter, which GrammarPoints to fetch.
     */
    where?: GrammarPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarPoints to fetch.
     */
    orderBy?: GrammarPointOrderByWithRelationInput | GrammarPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GrammarPoints.
     */
    cursor?: GrammarPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarPoints.
     */
    skip?: number
    distinct?: GrammarPointScalarFieldEnum | GrammarPointScalarFieldEnum[]
  }

  /**
   * GrammarPoint create
   */
  export type GrammarPointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * The data needed to create a GrammarPoint.
     */
    data: XOR<GrammarPointCreateInput, GrammarPointUncheckedCreateInput>
  }

  /**
   * GrammarPoint createMany
   */
  export type GrammarPointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GrammarPoints.
     */
    data: GrammarPointCreateManyInput | GrammarPointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GrammarPoint createManyAndReturn
   */
  export type GrammarPointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * The data used to create many GrammarPoints.
     */
    data: GrammarPointCreateManyInput | GrammarPointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GrammarPoint update
   */
  export type GrammarPointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * The data needed to update a GrammarPoint.
     */
    data: XOR<GrammarPointUpdateInput, GrammarPointUncheckedUpdateInput>
    /**
     * Choose, which GrammarPoint to update.
     */
    where: GrammarPointWhereUniqueInput
  }

  /**
   * GrammarPoint updateMany
   */
  export type GrammarPointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GrammarPoints.
     */
    data: XOR<GrammarPointUpdateManyMutationInput, GrammarPointUncheckedUpdateManyInput>
    /**
     * Filter which GrammarPoints to update
     */
    where?: GrammarPointWhereInput
    /**
     * Limit how many GrammarPoints to update.
     */
    limit?: number
  }

  /**
   * GrammarPoint updateManyAndReturn
   */
  export type GrammarPointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * The data used to update GrammarPoints.
     */
    data: XOR<GrammarPointUpdateManyMutationInput, GrammarPointUncheckedUpdateManyInput>
    /**
     * Filter which GrammarPoints to update
     */
    where?: GrammarPointWhereInput
    /**
     * Limit how many GrammarPoints to update.
     */
    limit?: number
  }

  /**
   * GrammarPoint upsert
   */
  export type GrammarPointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * The filter to search for the GrammarPoint to update in case it exists.
     */
    where: GrammarPointWhereUniqueInput
    /**
     * In case the GrammarPoint found by the `where` argument doesn't exist, create a new GrammarPoint with this data.
     */
    create: XOR<GrammarPointCreateInput, GrammarPointUncheckedCreateInput>
    /**
     * In case the GrammarPoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrammarPointUpdateInput, GrammarPointUncheckedUpdateInput>
  }

  /**
   * GrammarPoint delete
   */
  export type GrammarPointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
    /**
     * Filter which GrammarPoint to delete.
     */
    where: GrammarPointWhereUniqueInput
  }

  /**
   * GrammarPoint deleteMany
   */
  export type GrammarPointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrammarPoints to delete
     */
    where?: GrammarPointWhereInput
    /**
     * Limit how many GrammarPoints to delete.
     */
    limit?: number
  }

  /**
   * GrammarPoint.masteries
   */
  export type GrammarPoint$masteriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    where?: GrammarMasteryWhereInput
    orderBy?: GrammarMasteryOrderByWithRelationInput | GrammarMasteryOrderByWithRelationInput[]
    cursor?: GrammarMasteryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GrammarMasteryScalarFieldEnum | GrammarMasteryScalarFieldEnum[]
  }

  /**
   * GrammarPoint without action
   */
  export type GrammarPointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarPoint
     */
    select?: GrammarPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarPoint
     */
    omit?: GrammarPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarPointInclude<ExtArgs> | null
  }


  /**
   * Model GrammarMastery
   */

  export type AggregateGrammarMastery = {
    _count: GrammarMasteryCountAggregateOutputType | null
    _min: GrammarMasteryMinAggregateOutputType | null
    _max: GrammarMasteryMaxAggregateOutputType | null
  }

  export type GrammarMasteryMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    grammarPointId: string | null
    status: string | null
    updatedAt: Date | null
  }

  export type GrammarMasteryMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    grammarPointId: string | null
    status: string | null
    updatedAt: Date | null
  }

  export type GrammarMasteryCountAggregateOutputType = {
    id: number
    studentId: number
    grammarPointId: number
    status: number
    updatedAt: number
    _all: number
  }


  export type GrammarMasteryMinAggregateInputType = {
    id?: true
    studentId?: true
    grammarPointId?: true
    status?: true
    updatedAt?: true
  }

  export type GrammarMasteryMaxAggregateInputType = {
    id?: true
    studentId?: true
    grammarPointId?: true
    status?: true
    updatedAt?: true
  }

  export type GrammarMasteryCountAggregateInputType = {
    id?: true
    studentId?: true
    grammarPointId?: true
    status?: true
    updatedAt?: true
    _all?: true
  }

  export type GrammarMasteryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrammarMastery to aggregate.
     */
    where?: GrammarMasteryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarMasteries to fetch.
     */
    orderBy?: GrammarMasteryOrderByWithRelationInput | GrammarMasteryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrammarMasteryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarMasteries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarMasteries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GrammarMasteries
    **/
    _count?: true | GrammarMasteryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrammarMasteryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrammarMasteryMaxAggregateInputType
  }

  export type GetGrammarMasteryAggregateType<T extends GrammarMasteryAggregateArgs> = {
        [P in keyof T & keyof AggregateGrammarMastery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrammarMastery[P]>
      : GetScalarType<T[P], AggregateGrammarMastery[P]>
  }




  export type GrammarMasteryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrammarMasteryWhereInput
    orderBy?: GrammarMasteryOrderByWithAggregationInput | GrammarMasteryOrderByWithAggregationInput[]
    by: GrammarMasteryScalarFieldEnum[] | GrammarMasteryScalarFieldEnum
    having?: GrammarMasteryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrammarMasteryCountAggregateInputType | true
    _min?: GrammarMasteryMinAggregateInputType
    _max?: GrammarMasteryMaxAggregateInputType
  }

  export type GrammarMasteryGroupByOutputType = {
    id: string
    studentId: string
    grammarPointId: string
    status: string
    updatedAt: Date
    _count: GrammarMasteryCountAggregateOutputType | null
    _min: GrammarMasteryMinAggregateOutputType | null
    _max: GrammarMasteryMaxAggregateOutputType | null
  }

  type GetGrammarMasteryGroupByPayload<T extends GrammarMasteryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrammarMasteryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrammarMasteryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrammarMasteryGroupByOutputType[P]>
            : GetScalarType<T[P], GrammarMasteryGroupByOutputType[P]>
        }
      >
    >


  export type GrammarMasterySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    grammarPointId?: boolean
    status?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    grammarPoint?: boolean | GrammarPointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarMastery"]>

  export type GrammarMasterySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    grammarPointId?: boolean
    status?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    grammarPoint?: boolean | GrammarPointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarMastery"]>

  export type GrammarMasterySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    grammarPointId?: boolean
    status?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    grammarPoint?: boolean | GrammarPointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grammarMastery"]>

  export type GrammarMasterySelectScalar = {
    id?: boolean
    studentId?: boolean
    grammarPointId?: boolean
    status?: boolean
    updatedAt?: boolean
  }

  export type GrammarMasteryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "grammarPointId" | "status" | "updatedAt", ExtArgs["result"]["grammarMastery"]>
  export type GrammarMasteryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    grammarPoint?: boolean | GrammarPointDefaultArgs<ExtArgs>
  }
  export type GrammarMasteryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    grammarPoint?: boolean | GrammarPointDefaultArgs<ExtArgs>
  }
  export type GrammarMasteryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    grammarPoint?: boolean | GrammarPointDefaultArgs<ExtArgs>
  }

  export type $GrammarMasteryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GrammarMastery"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      grammarPoint: Prisma.$GrammarPointPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      grammarPointId: string
      status: string
      updatedAt: Date
    }, ExtArgs["result"]["grammarMastery"]>
    composites: {}
  }

  type GrammarMasteryGetPayload<S extends boolean | null | undefined | GrammarMasteryDefaultArgs> = $Result.GetResult<Prisma.$GrammarMasteryPayload, S>

  type GrammarMasteryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GrammarMasteryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GrammarMasteryCountAggregateInputType | true
    }

  export interface GrammarMasteryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GrammarMastery'], meta: { name: 'GrammarMastery' } }
    /**
     * Find zero or one GrammarMastery that matches the filter.
     * @param {GrammarMasteryFindUniqueArgs} args - Arguments to find a GrammarMastery
     * @example
     * // Get one GrammarMastery
     * const grammarMastery = await prisma.grammarMastery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrammarMasteryFindUniqueArgs>(args: SelectSubset<T, GrammarMasteryFindUniqueArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GrammarMastery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GrammarMasteryFindUniqueOrThrowArgs} args - Arguments to find a GrammarMastery
     * @example
     * // Get one GrammarMastery
     * const grammarMastery = await prisma.grammarMastery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrammarMasteryFindUniqueOrThrowArgs>(args: SelectSubset<T, GrammarMasteryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrammarMastery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryFindFirstArgs} args - Arguments to find a GrammarMastery
     * @example
     * // Get one GrammarMastery
     * const grammarMastery = await prisma.grammarMastery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrammarMasteryFindFirstArgs>(args?: SelectSubset<T, GrammarMasteryFindFirstArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrammarMastery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryFindFirstOrThrowArgs} args - Arguments to find a GrammarMastery
     * @example
     * // Get one GrammarMastery
     * const grammarMastery = await prisma.grammarMastery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrammarMasteryFindFirstOrThrowArgs>(args?: SelectSubset<T, GrammarMasteryFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GrammarMasteries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GrammarMasteries
     * const grammarMasteries = await prisma.grammarMastery.findMany()
     * 
     * // Get first 10 GrammarMasteries
     * const grammarMasteries = await prisma.grammarMastery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const grammarMasteryWithIdOnly = await prisma.grammarMastery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrammarMasteryFindManyArgs>(args?: SelectSubset<T, GrammarMasteryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GrammarMastery.
     * @param {GrammarMasteryCreateArgs} args - Arguments to create a GrammarMastery.
     * @example
     * // Create one GrammarMastery
     * const GrammarMastery = await prisma.grammarMastery.create({
     *   data: {
     *     // ... data to create a GrammarMastery
     *   }
     * })
     * 
     */
    create<T extends GrammarMasteryCreateArgs>(args: SelectSubset<T, GrammarMasteryCreateArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GrammarMasteries.
     * @param {GrammarMasteryCreateManyArgs} args - Arguments to create many GrammarMasteries.
     * @example
     * // Create many GrammarMasteries
     * const grammarMastery = await prisma.grammarMastery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrammarMasteryCreateManyArgs>(args?: SelectSubset<T, GrammarMasteryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GrammarMasteries and returns the data saved in the database.
     * @param {GrammarMasteryCreateManyAndReturnArgs} args - Arguments to create many GrammarMasteries.
     * @example
     * // Create many GrammarMasteries
     * const grammarMastery = await prisma.grammarMastery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GrammarMasteries and only return the `id`
     * const grammarMasteryWithIdOnly = await prisma.grammarMastery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrammarMasteryCreateManyAndReturnArgs>(args?: SelectSubset<T, GrammarMasteryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GrammarMastery.
     * @param {GrammarMasteryDeleteArgs} args - Arguments to delete one GrammarMastery.
     * @example
     * // Delete one GrammarMastery
     * const GrammarMastery = await prisma.grammarMastery.delete({
     *   where: {
     *     // ... filter to delete one GrammarMastery
     *   }
     * })
     * 
     */
    delete<T extends GrammarMasteryDeleteArgs>(args: SelectSubset<T, GrammarMasteryDeleteArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GrammarMastery.
     * @param {GrammarMasteryUpdateArgs} args - Arguments to update one GrammarMastery.
     * @example
     * // Update one GrammarMastery
     * const grammarMastery = await prisma.grammarMastery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrammarMasteryUpdateArgs>(args: SelectSubset<T, GrammarMasteryUpdateArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GrammarMasteries.
     * @param {GrammarMasteryDeleteManyArgs} args - Arguments to filter GrammarMasteries to delete.
     * @example
     * // Delete a few GrammarMasteries
     * const { count } = await prisma.grammarMastery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrammarMasteryDeleteManyArgs>(args?: SelectSubset<T, GrammarMasteryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrammarMasteries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GrammarMasteries
     * const grammarMastery = await prisma.grammarMastery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrammarMasteryUpdateManyArgs>(args: SelectSubset<T, GrammarMasteryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrammarMasteries and returns the data updated in the database.
     * @param {GrammarMasteryUpdateManyAndReturnArgs} args - Arguments to update many GrammarMasteries.
     * @example
     * // Update many GrammarMasteries
     * const grammarMastery = await prisma.grammarMastery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GrammarMasteries and only return the `id`
     * const grammarMasteryWithIdOnly = await prisma.grammarMastery.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GrammarMasteryUpdateManyAndReturnArgs>(args: SelectSubset<T, GrammarMasteryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GrammarMastery.
     * @param {GrammarMasteryUpsertArgs} args - Arguments to update or create a GrammarMastery.
     * @example
     * // Update or create a GrammarMastery
     * const grammarMastery = await prisma.grammarMastery.upsert({
     *   create: {
     *     // ... data to create a GrammarMastery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GrammarMastery we want to update
     *   }
     * })
     */
    upsert<T extends GrammarMasteryUpsertArgs>(args: SelectSubset<T, GrammarMasteryUpsertArgs<ExtArgs>>): Prisma__GrammarMasteryClient<$Result.GetResult<Prisma.$GrammarMasteryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GrammarMasteries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryCountArgs} args - Arguments to filter GrammarMasteries to count.
     * @example
     * // Count the number of GrammarMasteries
     * const count = await prisma.grammarMastery.count({
     *   where: {
     *     // ... the filter for the GrammarMasteries we want to count
     *   }
     * })
    **/
    count<T extends GrammarMasteryCountArgs>(
      args?: Subset<T, GrammarMasteryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrammarMasteryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GrammarMastery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GrammarMasteryAggregateArgs>(args: Subset<T, GrammarMasteryAggregateArgs>): Prisma.PrismaPromise<GetGrammarMasteryAggregateType<T>>

    /**
     * Group by GrammarMastery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrammarMasteryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GrammarMasteryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrammarMasteryGroupByArgs['orderBy'] }
        : { orderBy?: GrammarMasteryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GrammarMasteryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrammarMasteryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GrammarMastery model
   */
  readonly fields: GrammarMasteryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GrammarMastery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrammarMasteryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    grammarPoint<T extends GrammarPointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GrammarPointDefaultArgs<ExtArgs>>): Prisma__GrammarPointClient<$Result.GetResult<Prisma.$GrammarPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GrammarMastery model
   */
  interface GrammarMasteryFieldRefs {
    readonly id: FieldRef<"GrammarMastery", 'String'>
    readonly studentId: FieldRef<"GrammarMastery", 'String'>
    readonly grammarPointId: FieldRef<"GrammarMastery", 'String'>
    readonly status: FieldRef<"GrammarMastery", 'String'>
    readonly updatedAt: FieldRef<"GrammarMastery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GrammarMastery findUnique
   */
  export type GrammarMasteryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * Filter, which GrammarMastery to fetch.
     */
    where: GrammarMasteryWhereUniqueInput
  }

  /**
   * GrammarMastery findUniqueOrThrow
   */
  export type GrammarMasteryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * Filter, which GrammarMastery to fetch.
     */
    where: GrammarMasteryWhereUniqueInput
  }

  /**
   * GrammarMastery findFirst
   */
  export type GrammarMasteryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * Filter, which GrammarMastery to fetch.
     */
    where?: GrammarMasteryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarMasteries to fetch.
     */
    orderBy?: GrammarMasteryOrderByWithRelationInput | GrammarMasteryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrammarMasteries.
     */
    cursor?: GrammarMasteryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarMasteries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarMasteries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrammarMasteries.
     */
    distinct?: GrammarMasteryScalarFieldEnum | GrammarMasteryScalarFieldEnum[]
  }

  /**
   * GrammarMastery findFirstOrThrow
   */
  export type GrammarMasteryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * Filter, which GrammarMastery to fetch.
     */
    where?: GrammarMasteryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarMasteries to fetch.
     */
    orderBy?: GrammarMasteryOrderByWithRelationInput | GrammarMasteryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrammarMasteries.
     */
    cursor?: GrammarMasteryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarMasteries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarMasteries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrammarMasteries.
     */
    distinct?: GrammarMasteryScalarFieldEnum | GrammarMasteryScalarFieldEnum[]
  }

  /**
   * GrammarMastery findMany
   */
  export type GrammarMasteryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * Filter, which GrammarMasteries to fetch.
     */
    where?: GrammarMasteryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrammarMasteries to fetch.
     */
    orderBy?: GrammarMasteryOrderByWithRelationInput | GrammarMasteryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GrammarMasteries.
     */
    cursor?: GrammarMasteryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrammarMasteries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrammarMasteries.
     */
    skip?: number
    distinct?: GrammarMasteryScalarFieldEnum | GrammarMasteryScalarFieldEnum[]
  }

  /**
   * GrammarMastery create
   */
  export type GrammarMasteryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * The data needed to create a GrammarMastery.
     */
    data: XOR<GrammarMasteryCreateInput, GrammarMasteryUncheckedCreateInput>
  }

  /**
   * GrammarMastery createMany
   */
  export type GrammarMasteryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GrammarMasteries.
     */
    data: GrammarMasteryCreateManyInput | GrammarMasteryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GrammarMastery createManyAndReturn
   */
  export type GrammarMasteryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * The data used to create many GrammarMasteries.
     */
    data: GrammarMasteryCreateManyInput | GrammarMasteryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrammarMastery update
   */
  export type GrammarMasteryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * The data needed to update a GrammarMastery.
     */
    data: XOR<GrammarMasteryUpdateInput, GrammarMasteryUncheckedUpdateInput>
    /**
     * Choose, which GrammarMastery to update.
     */
    where: GrammarMasteryWhereUniqueInput
  }

  /**
   * GrammarMastery updateMany
   */
  export type GrammarMasteryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GrammarMasteries.
     */
    data: XOR<GrammarMasteryUpdateManyMutationInput, GrammarMasteryUncheckedUpdateManyInput>
    /**
     * Filter which GrammarMasteries to update
     */
    where?: GrammarMasteryWhereInput
    /**
     * Limit how many GrammarMasteries to update.
     */
    limit?: number
  }

  /**
   * GrammarMastery updateManyAndReturn
   */
  export type GrammarMasteryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * The data used to update GrammarMasteries.
     */
    data: XOR<GrammarMasteryUpdateManyMutationInput, GrammarMasteryUncheckedUpdateManyInput>
    /**
     * Filter which GrammarMasteries to update
     */
    where?: GrammarMasteryWhereInput
    /**
     * Limit how many GrammarMasteries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrammarMastery upsert
   */
  export type GrammarMasteryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * The filter to search for the GrammarMastery to update in case it exists.
     */
    where: GrammarMasteryWhereUniqueInput
    /**
     * In case the GrammarMastery found by the `where` argument doesn't exist, create a new GrammarMastery with this data.
     */
    create: XOR<GrammarMasteryCreateInput, GrammarMasteryUncheckedCreateInput>
    /**
     * In case the GrammarMastery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrammarMasteryUpdateInput, GrammarMasteryUncheckedUpdateInput>
  }

  /**
   * GrammarMastery delete
   */
  export type GrammarMasteryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
    /**
     * Filter which GrammarMastery to delete.
     */
    where: GrammarMasteryWhereUniqueInput
  }

  /**
   * GrammarMastery deleteMany
   */
  export type GrammarMasteryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrammarMasteries to delete
     */
    where?: GrammarMasteryWhereInput
    /**
     * Limit how many GrammarMasteries to delete.
     */
    limit?: number
  }

  /**
   * GrammarMastery without action
   */
  export type GrammarMasteryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrammarMastery
     */
    select?: GrammarMasterySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrammarMastery
     */
    omit?: GrammarMasteryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrammarMasteryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    course: 'course',
    status: 'status',
    lastLesson: 'lastLesson',
    progress: 'progress',
    loginId: 'loginId',
    password: 'password',
    level: 'level',
    target: 'target',
    phone: 'phone',
    joinDate: 'joinDate',
    totalLessons: 'totalLessons',
    internalNote: 'internalNote',
    toeicScore: 'toeicScore',
    cefr: 'cefr',
    vocabScore: 'vocabScore',
    grammarScore: 'grammarScore',
    listeningScore: 'listeningScore',
    speakingScore: 'speakingScore',
    goalTarget: 'goalTarget',
    goalProgress: 'goalProgress',
    biography: 'biography',
    occupation: 'occupation',
    avatarUrl: 'avatarUrl',
    coverUrl: 'coverUrl',
    questLevel: 'questLevel',
    questXP: 'questXP',
    questStreak: 'questStreak',
    lastQuestPlayedAt: 'lastQuestPlayedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    status: 'status',
    role: 'role',
    bio: 'bio',
    joinDate: 'joinDate',
    rating: 'rating',
    loginId: 'loginId',
    password: 'password'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const LessonScheduleScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    studentName: 'studentName',
    teacherName: 'teacherName',
    date: 'date',
    time: 'time',
    duration: 'duration',
    course: 'course',
    type: 'type',
    status: 'status',
    tags: 'tags',
    meetingPassword: 'meetingPassword',
    meetingUrl: 'meetingUrl'
  };

  export type LessonScheduleScalarFieldEnum = (typeof LessonScheduleScalarFieldEnum)[keyof typeof LessonScheduleScalarFieldEnum]


  export const LessonRecordScalarFieldEnum: {
    id: 'id',
    lessonId: 'lessonId',
    studentId: 'studentId',
    date: 'date',
    teacher: 'teacher',
    title: 'title',
    feedback: 'feedback',
    nextScope: 'nextScope',
    importantExpressions: 'importantExpressions',
    homework: 'homework',
    internalNote: 'internalNote',
    grammar: 'grammar',
    vocab: 'vocab',
    pronunciation: 'pronunciation',
    fluency: 'fluency'
  };

  export type LessonRecordScalarFieldEnum = (typeof LessonRecordScalarFieldEnum)[keyof typeof LessonRecordScalarFieldEnum]


  export const TestScoreScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    type: 'type',
    testName: 'testName',
    date: 'date',
    grade: 'grade',
    score: 'score',
    totalScore: 'totalScore',
    trend: 'trend',
    createdAt: 'createdAt'
  };

  export type TestScoreScalarFieldEnum = (typeof TestScoreScalarFieldEnum)[keyof typeof TestScoreScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    teacherId: 'teacherId',
    sender: 'sender',
    text: 'text',
    time: 'time',
    read: 'read'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    date: 'date',
    target: 'target',
    priority: 'priority'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    planName: 'planName',
    amount: 'amount',
    dueDate: 'dueDate',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const SchoolSettingsScalarFieldEnum: {
    id: 'id',
    schoolName: 'schoolName',
    timezone: 'timezone',
    defaultCourseDuration: 'defaultCourseDuration',
    allowStudentCancellation: 'allowStudentCancellation',
    cancellationDeadlineHours: 'cancellationDeadlineHours',
    monthlyGoal: 'monthlyGoal'
  };

  export type SchoolSettingsScalarFieldEnum = (typeof SchoolSettingsScalarFieldEnum)[keyof typeof SchoolSettingsScalarFieldEnum]


  export const VocabProgressScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    level: 'level',
    stageIndex: 'stageIndex',
    completions: 'completions',
    perfectClears: 'perfectClears',
    highestScore: 'highestScore',
    mode: 'mode',
    lastPlayedAt: 'lastPlayedAt'
  };

  export type VocabProgressScalarFieldEnum = (typeof VocabProgressScalarFieldEnum)[keyof typeof VocabProgressScalarFieldEnum]


  export const GrammarProgressScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    level: 'level',
    stageIndex: 'stageIndex',
    completions: 'completions',
    perfectClears: 'perfectClears',
    highestScore: 'highestScore',
    lastPlayedAt: 'lastPlayedAt'
  };

  export type GrammarProgressScalarFieldEnum = (typeof GrammarProgressScalarFieldEnum)[keyof typeof GrammarProgressScalarFieldEnum]


  export const GrammarPointScalarFieldEnum: {
    id: 'id',
    label: 'label',
    category: 'category',
    order: 'order'
  };

  export type GrammarPointScalarFieldEnum = (typeof GrammarPointScalarFieldEnum)[keyof typeof GrammarPointScalarFieldEnum]


  export const GrammarMasteryScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    grammarPointId: 'grammarPointId',
    status: 'status',
    updatedAt: 'updatedAt'
  };

  export type GrammarMasteryScalarFieldEnum = (typeof GrammarMasteryScalarFieldEnum)[keyof typeof GrammarMasteryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    course?: StringFilter<"Student"> | string
    status?: StringFilter<"Student"> | string
    lastLesson?: StringNullableFilter<"Student"> | string | null
    progress?: IntFilter<"Student"> | number
    loginId?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    level?: IntFilter<"Student"> | number
    target?: StringNullableFilter<"Student"> | string | null
    phone?: StringNullableFilter<"Student"> | string | null
    joinDate?: StringNullableFilter<"Student"> | string | null
    totalLessons?: IntFilter<"Student"> | number
    internalNote?: StringNullableFilter<"Student"> | string | null
    toeicScore?: StringNullableFilter<"Student"> | string | null
    cefr?: StringNullableFilter<"Student"> | string | null
    vocabScore?: IntNullableFilter<"Student"> | number | null
    grammarScore?: IntNullableFilter<"Student"> | number | null
    listeningScore?: IntNullableFilter<"Student"> | number | null
    speakingScore?: IntNullableFilter<"Student"> | number | null
    goalTarget?: StringNullableFilter<"Student"> | string | null
    goalProgress?: IntNullableFilter<"Student"> | number | null
    biography?: StringNullableFilter<"Student"> | string | null
    occupation?: StringNullableFilter<"Student"> | string | null
    avatarUrl?: StringNullableFilter<"Student"> | string | null
    coverUrl?: StringNullableFilter<"Student"> | string | null
    questLevel?: IntFilter<"Student"> | number
    questXP?: IntFilter<"Student"> | number
    questStreak?: IntFilter<"Student"> | number
    lastQuestPlayedAt?: DateTimeNullableFilter<"Student"> | Date | string | null
    grammarProgresses?: GrammarProgressListRelationFilter
    grammarMasteries?: GrammarMasteryListRelationFilter
    invoices?: InvoiceListRelationFilter
    records?: LessonRecordListRelationFilter
    schedules?: LessonScheduleListRelationFilter
    messages?: MessageListRelationFilter
    testScores?: TestScoreListRelationFilter
    vocabProgresses?: VocabProgressListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    course?: SortOrder
    status?: SortOrder
    lastLesson?: SortOrderInput | SortOrder
    progress?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
    level?: SortOrder
    target?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    joinDate?: SortOrderInput | SortOrder
    totalLessons?: SortOrder
    internalNote?: SortOrderInput | SortOrder
    toeicScore?: SortOrderInput | SortOrder
    cefr?: SortOrderInput | SortOrder
    vocabScore?: SortOrderInput | SortOrder
    grammarScore?: SortOrderInput | SortOrder
    listeningScore?: SortOrderInput | SortOrder
    speakingScore?: SortOrderInput | SortOrder
    goalTarget?: SortOrderInput | SortOrder
    goalProgress?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
    lastQuestPlayedAt?: SortOrderInput | SortOrder
    grammarProgresses?: GrammarProgressOrderByRelationAggregateInput
    grammarMasteries?: GrammarMasteryOrderByRelationAggregateInput
    invoices?: InvoiceOrderByRelationAggregateInput
    records?: LessonRecordOrderByRelationAggregateInput
    schedules?: LessonScheduleOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    testScores?: TestScoreOrderByRelationAggregateInput
    vocabProgresses?: VocabProgressOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    loginId?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    course?: StringFilter<"Student"> | string
    status?: StringFilter<"Student"> | string
    lastLesson?: StringNullableFilter<"Student"> | string | null
    progress?: IntFilter<"Student"> | number
    password?: StringFilter<"Student"> | string
    level?: IntFilter<"Student"> | number
    target?: StringNullableFilter<"Student"> | string | null
    phone?: StringNullableFilter<"Student"> | string | null
    joinDate?: StringNullableFilter<"Student"> | string | null
    totalLessons?: IntFilter<"Student"> | number
    internalNote?: StringNullableFilter<"Student"> | string | null
    toeicScore?: StringNullableFilter<"Student"> | string | null
    cefr?: StringNullableFilter<"Student"> | string | null
    vocabScore?: IntNullableFilter<"Student"> | number | null
    grammarScore?: IntNullableFilter<"Student"> | number | null
    listeningScore?: IntNullableFilter<"Student"> | number | null
    speakingScore?: IntNullableFilter<"Student"> | number | null
    goalTarget?: StringNullableFilter<"Student"> | string | null
    goalProgress?: IntNullableFilter<"Student"> | number | null
    biography?: StringNullableFilter<"Student"> | string | null
    occupation?: StringNullableFilter<"Student"> | string | null
    avatarUrl?: StringNullableFilter<"Student"> | string | null
    coverUrl?: StringNullableFilter<"Student"> | string | null
    questLevel?: IntFilter<"Student"> | number
    questXP?: IntFilter<"Student"> | number
    questStreak?: IntFilter<"Student"> | number
    lastQuestPlayedAt?: DateTimeNullableFilter<"Student"> | Date | string | null
    grammarProgresses?: GrammarProgressListRelationFilter
    grammarMasteries?: GrammarMasteryListRelationFilter
    invoices?: InvoiceListRelationFilter
    records?: LessonRecordListRelationFilter
    schedules?: LessonScheduleListRelationFilter
    messages?: MessageListRelationFilter
    testScores?: TestScoreListRelationFilter
    vocabProgresses?: VocabProgressListRelationFilter
  }, "id" | "email" | "loginId">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    course?: SortOrder
    status?: SortOrder
    lastLesson?: SortOrderInput | SortOrder
    progress?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
    level?: SortOrder
    target?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    joinDate?: SortOrderInput | SortOrder
    totalLessons?: SortOrder
    internalNote?: SortOrderInput | SortOrder
    toeicScore?: SortOrderInput | SortOrder
    cefr?: SortOrderInput | SortOrder
    vocabScore?: SortOrderInput | SortOrder
    grammarScore?: SortOrderInput | SortOrder
    listeningScore?: SortOrderInput | SortOrder
    speakingScore?: SortOrderInput | SortOrder
    goalTarget?: SortOrderInput | SortOrder
    goalProgress?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
    lastQuestPlayedAt?: SortOrderInput | SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    email?: StringWithAggregatesFilter<"Student"> | string
    course?: StringWithAggregatesFilter<"Student"> | string
    status?: StringWithAggregatesFilter<"Student"> | string
    lastLesson?: StringNullableWithAggregatesFilter<"Student"> | string | null
    progress?: IntWithAggregatesFilter<"Student"> | number
    loginId?: StringWithAggregatesFilter<"Student"> | string
    password?: StringWithAggregatesFilter<"Student"> | string
    level?: IntWithAggregatesFilter<"Student"> | number
    target?: StringNullableWithAggregatesFilter<"Student"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Student"> | string | null
    joinDate?: StringNullableWithAggregatesFilter<"Student"> | string | null
    totalLessons?: IntWithAggregatesFilter<"Student"> | number
    internalNote?: StringNullableWithAggregatesFilter<"Student"> | string | null
    toeicScore?: StringNullableWithAggregatesFilter<"Student"> | string | null
    cefr?: StringNullableWithAggregatesFilter<"Student"> | string | null
    vocabScore?: IntNullableWithAggregatesFilter<"Student"> | number | null
    grammarScore?: IntNullableWithAggregatesFilter<"Student"> | number | null
    listeningScore?: IntNullableWithAggregatesFilter<"Student"> | number | null
    speakingScore?: IntNullableWithAggregatesFilter<"Student"> | number | null
    goalTarget?: StringNullableWithAggregatesFilter<"Student"> | string | null
    goalProgress?: IntNullableWithAggregatesFilter<"Student"> | number | null
    biography?: StringNullableWithAggregatesFilter<"Student"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"Student"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Student"> | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Student"> | string | null
    questLevel?: IntWithAggregatesFilter<"Student"> | number
    questXP?: IntWithAggregatesFilter<"Student"> | number
    questStreak?: IntWithAggregatesFilter<"Student"> | number
    lastQuestPlayedAt?: DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: StringFilter<"Teacher"> | string
    name?: StringFilter<"Teacher"> | string
    email?: StringFilter<"Teacher"> | string
    status?: StringFilter<"Teacher"> | string
    role?: StringFilter<"Teacher"> | string
    bio?: StringNullableFilter<"Teacher"> | string | null
    joinDate?: StringFilter<"Teacher"> | string
    rating?: FloatNullableFilter<"Teacher"> | number | null
    loginId?: StringNullableFilter<"Teacher"> | string | null
    password?: StringNullableFilter<"Teacher"> | string | null
    messages?: MessageListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    bio?: SortOrderInput | SortOrder
    joinDate?: SortOrder
    rating?: SortOrderInput | SortOrder
    loginId?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    messages?: MessageOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    loginId?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    name?: StringFilter<"Teacher"> | string
    status?: StringFilter<"Teacher"> | string
    role?: StringFilter<"Teacher"> | string
    bio?: StringNullableFilter<"Teacher"> | string | null
    joinDate?: StringFilter<"Teacher"> | string
    rating?: FloatNullableFilter<"Teacher"> | number | null
    password?: StringNullableFilter<"Teacher"> | string | null
    messages?: MessageListRelationFilter
  }, "id" | "email" | "loginId">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    bio?: SortOrderInput | SortOrder
    joinDate?: SortOrder
    rating?: SortOrderInput | SortOrder
    loginId?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Teacher"> | string
    name?: StringWithAggregatesFilter<"Teacher"> | string
    email?: StringWithAggregatesFilter<"Teacher"> | string
    status?: StringWithAggregatesFilter<"Teacher"> | string
    role?: StringWithAggregatesFilter<"Teacher"> | string
    bio?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    joinDate?: StringWithAggregatesFilter<"Teacher"> | string
    rating?: FloatNullableWithAggregatesFilter<"Teacher"> | number | null
    loginId?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    password?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
  }

  export type LessonScheduleWhereInput = {
    AND?: LessonScheduleWhereInput | LessonScheduleWhereInput[]
    OR?: LessonScheduleWhereInput[]
    NOT?: LessonScheduleWhereInput | LessonScheduleWhereInput[]
    id?: StringFilter<"LessonSchedule"> | string
    studentId?: StringFilter<"LessonSchedule"> | string
    studentName?: StringFilter<"LessonSchedule"> | string
    teacherName?: StringFilter<"LessonSchedule"> | string
    date?: StringFilter<"LessonSchedule"> | string
    time?: StringFilter<"LessonSchedule"> | string
    duration?: StringFilter<"LessonSchedule"> | string
    course?: StringFilter<"LessonSchedule"> | string
    type?: StringFilter<"LessonSchedule"> | string
    status?: StringFilter<"LessonSchedule"> | string
    tags?: StringNullableFilter<"LessonSchedule"> | string | null
    meetingPassword?: StringNullableFilter<"LessonSchedule"> | string | null
    meetingUrl?: StringNullableFilter<"LessonSchedule"> | string | null
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type LessonScheduleOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    teacherName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    course?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tags?: SortOrderInput | SortOrder
    meetingPassword?: SortOrderInput | SortOrder
    meetingUrl?: SortOrderInput | SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type LessonScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LessonScheduleWhereInput | LessonScheduleWhereInput[]
    OR?: LessonScheduleWhereInput[]
    NOT?: LessonScheduleWhereInput | LessonScheduleWhereInput[]
    studentId?: StringFilter<"LessonSchedule"> | string
    studentName?: StringFilter<"LessonSchedule"> | string
    teacherName?: StringFilter<"LessonSchedule"> | string
    date?: StringFilter<"LessonSchedule"> | string
    time?: StringFilter<"LessonSchedule"> | string
    duration?: StringFilter<"LessonSchedule"> | string
    course?: StringFilter<"LessonSchedule"> | string
    type?: StringFilter<"LessonSchedule"> | string
    status?: StringFilter<"LessonSchedule"> | string
    tags?: StringNullableFilter<"LessonSchedule"> | string | null
    meetingPassword?: StringNullableFilter<"LessonSchedule"> | string | null
    meetingUrl?: StringNullableFilter<"LessonSchedule"> | string | null
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type LessonScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    teacherName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    course?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tags?: SortOrderInput | SortOrder
    meetingPassword?: SortOrderInput | SortOrder
    meetingUrl?: SortOrderInput | SortOrder
    _count?: LessonScheduleCountOrderByAggregateInput
    _max?: LessonScheduleMaxOrderByAggregateInput
    _min?: LessonScheduleMinOrderByAggregateInput
  }

  export type LessonScheduleScalarWhereWithAggregatesInput = {
    AND?: LessonScheduleScalarWhereWithAggregatesInput | LessonScheduleScalarWhereWithAggregatesInput[]
    OR?: LessonScheduleScalarWhereWithAggregatesInput[]
    NOT?: LessonScheduleScalarWhereWithAggregatesInput | LessonScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonSchedule"> | string
    studentId?: StringWithAggregatesFilter<"LessonSchedule"> | string
    studentName?: StringWithAggregatesFilter<"LessonSchedule"> | string
    teacherName?: StringWithAggregatesFilter<"LessonSchedule"> | string
    date?: StringWithAggregatesFilter<"LessonSchedule"> | string
    time?: StringWithAggregatesFilter<"LessonSchedule"> | string
    duration?: StringWithAggregatesFilter<"LessonSchedule"> | string
    course?: StringWithAggregatesFilter<"LessonSchedule"> | string
    type?: StringWithAggregatesFilter<"LessonSchedule"> | string
    status?: StringWithAggregatesFilter<"LessonSchedule"> | string
    tags?: StringNullableWithAggregatesFilter<"LessonSchedule"> | string | null
    meetingPassword?: StringNullableWithAggregatesFilter<"LessonSchedule"> | string | null
    meetingUrl?: StringNullableWithAggregatesFilter<"LessonSchedule"> | string | null
  }

  export type LessonRecordWhereInput = {
    AND?: LessonRecordWhereInput | LessonRecordWhereInput[]
    OR?: LessonRecordWhereInput[]
    NOT?: LessonRecordWhereInput | LessonRecordWhereInput[]
    id?: StringFilter<"LessonRecord"> | string
    lessonId?: StringNullableFilter<"LessonRecord"> | string | null
    studentId?: StringFilter<"LessonRecord"> | string
    date?: StringFilter<"LessonRecord"> | string
    teacher?: StringFilter<"LessonRecord"> | string
    title?: StringFilter<"LessonRecord"> | string
    feedback?: StringFilter<"LessonRecord"> | string
    nextScope?: StringNullableFilter<"LessonRecord"> | string | null
    importantExpressions?: StringNullableFilter<"LessonRecord"> | string | null
    homework?: StringNullableFilter<"LessonRecord"> | string | null
    internalNote?: StringNullableFilter<"LessonRecord"> | string | null
    grammar?: IntFilter<"LessonRecord"> | number
    vocab?: IntFilter<"LessonRecord"> | number
    pronunciation?: IntFilter<"LessonRecord"> | number
    fluency?: IntFilter<"LessonRecord"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type LessonRecordOrderByWithRelationInput = {
    id?: SortOrder
    lessonId?: SortOrderInput | SortOrder
    studentId?: SortOrder
    date?: SortOrder
    teacher?: SortOrder
    title?: SortOrder
    feedback?: SortOrder
    nextScope?: SortOrderInput | SortOrder
    importantExpressions?: SortOrderInput | SortOrder
    homework?: SortOrderInput | SortOrder
    internalNote?: SortOrderInput | SortOrder
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type LessonRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    lessonId?: string
    AND?: LessonRecordWhereInput | LessonRecordWhereInput[]
    OR?: LessonRecordWhereInput[]
    NOT?: LessonRecordWhereInput | LessonRecordWhereInput[]
    studentId?: StringFilter<"LessonRecord"> | string
    date?: StringFilter<"LessonRecord"> | string
    teacher?: StringFilter<"LessonRecord"> | string
    title?: StringFilter<"LessonRecord"> | string
    feedback?: StringFilter<"LessonRecord"> | string
    nextScope?: StringNullableFilter<"LessonRecord"> | string | null
    importantExpressions?: StringNullableFilter<"LessonRecord"> | string | null
    homework?: StringNullableFilter<"LessonRecord"> | string | null
    internalNote?: StringNullableFilter<"LessonRecord"> | string | null
    grammar?: IntFilter<"LessonRecord"> | number
    vocab?: IntFilter<"LessonRecord"> | number
    pronunciation?: IntFilter<"LessonRecord"> | number
    fluency?: IntFilter<"LessonRecord"> | number
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id" | "lessonId">

  export type LessonRecordOrderByWithAggregationInput = {
    id?: SortOrder
    lessonId?: SortOrderInput | SortOrder
    studentId?: SortOrder
    date?: SortOrder
    teacher?: SortOrder
    title?: SortOrder
    feedback?: SortOrder
    nextScope?: SortOrderInput | SortOrder
    importantExpressions?: SortOrderInput | SortOrder
    homework?: SortOrderInput | SortOrder
    internalNote?: SortOrderInput | SortOrder
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
    _count?: LessonRecordCountOrderByAggregateInput
    _avg?: LessonRecordAvgOrderByAggregateInput
    _max?: LessonRecordMaxOrderByAggregateInput
    _min?: LessonRecordMinOrderByAggregateInput
    _sum?: LessonRecordSumOrderByAggregateInput
  }

  export type LessonRecordScalarWhereWithAggregatesInput = {
    AND?: LessonRecordScalarWhereWithAggregatesInput | LessonRecordScalarWhereWithAggregatesInput[]
    OR?: LessonRecordScalarWhereWithAggregatesInput[]
    NOT?: LessonRecordScalarWhereWithAggregatesInput | LessonRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LessonRecord"> | string
    lessonId?: StringNullableWithAggregatesFilter<"LessonRecord"> | string | null
    studentId?: StringWithAggregatesFilter<"LessonRecord"> | string
    date?: StringWithAggregatesFilter<"LessonRecord"> | string
    teacher?: StringWithAggregatesFilter<"LessonRecord"> | string
    title?: StringWithAggregatesFilter<"LessonRecord"> | string
    feedback?: StringWithAggregatesFilter<"LessonRecord"> | string
    nextScope?: StringNullableWithAggregatesFilter<"LessonRecord"> | string | null
    importantExpressions?: StringNullableWithAggregatesFilter<"LessonRecord"> | string | null
    homework?: StringNullableWithAggregatesFilter<"LessonRecord"> | string | null
    internalNote?: StringNullableWithAggregatesFilter<"LessonRecord"> | string | null
    grammar?: IntWithAggregatesFilter<"LessonRecord"> | number
    vocab?: IntWithAggregatesFilter<"LessonRecord"> | number
    pronunciation?: IntWithAggregatesFilter<"LessonRecord"> | number
    fluency?: IntWithAggregatesFilter<"LessonRecord"> | number
  }

  export type TestScoreWhereInput = {
    AND?: TestScoreWhereInput | TestScoreWhereInput[]
    OR?: TestScoreWhereInput[]
    NOT?: TestScoreWhereInput | TestScoreWhereInput[]
    id?: StringFilter<"TestScore"> | string
    studentId?: StringFilter<"TestScore"> | string
    type?: StringFilter<"TestScore"> | string
    testName?: StringFilter<"TestScore"> | string
    date?: StringFilter<"TestScore"> | string
    grade?: StringNullableFilter<"TestScore"> | string | null
    score?: StringFilter<"TestScore"> | string
    totalScore?: StringNullableFilter<"TestScore"> | string | null
    trend?: StringFilter<"TestScore"> | string
    createdAt?: DateTimeFilter<"TestScore"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type TestScoreOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    testName?: SortOrder
    date?: SortOrder
    grade?: SortOrderInput | SortOrder
    score?: SortOrder
    totalScore?: SortOrderInput | SortOrder
    trend?: SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type TestScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestScoreWhereInput | TestScoreWhereInput[]
    OR?: TestScoreWhereInput[]
    NOT?: TestScoreWhereInput | TestScoreWhereInput[]
    studentId?: StringFilter<"TestScore"> | string
    type?: StringFilter<"TestScore"> | string
    testName?: StringFilter<"TestScore"> | string
    date?: StringFilter<"TestScore"> | string
    grade?: StringNullableFilter<"TestScore"> | string | null
    score?: StringFilter<"TestScore"> | string
    totalScore?: StringNullableFilter<"TestScore"> | string | null
    trend?: StringFilter<"TestScore"> | string
    createdAt?: DateTimeFilter<"TestScore"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type TestScoreOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    testName?: SortOrder
    date?: SortOrder
    grade?: SortOrderInput | SortOrder
    score?: SortOrder
    totalScore?: SortOrderInput | SortOrder
    trend?: SortOrder
    createdAt?: SortOrder
    _count?: TestScoreCountOrderByAggregateInput
    _max?: TestScoreMaxOrderByAggregateInput
    _min?: TestScoreMinOrderByAggregateInput
  }

  export type TestScoreScalarWhereWithAggregatesInput = {
    AND?: TestScoreScalarWhereWithAggregatesInput | TestScoreScalarWhereWithAggregatesInput[]
    OR?: TestScoreScalarWhereWithAggregatesInput[]
    NOT?: TestScoreScalarWhereWithAggregatesInput | TestScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestScore"> | string
    studentId?: StringWithAggregatesFilter<"TestScore"> | string
    type?: StringWithAggregatesFilter<"TestScore"> | string
    testName?: StringWithAggregatesFilter<"TestScore"> | string
    date?: StringWithAggregatesFilter<"TestScore"> | string
    grade?: StringNullableWithAggregatesFilter<"TestScore"> | string | null
    score?: StringWithAggregatesFilter<"TestScore"> | string
    totalScore?: StringNullableWithAggregatesFilter<"TestScore"> | string | null
    trend?: StringWithAggregatesFilter<"TestScore"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TestScore"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    studentId?: StringFilter<"Message"> | string
    teacherId?: StringNullableFilter<"Message"> | string | null
    sender?: StringFilter<"Message"> | string
    text?: StringFilter<"Message"> | string
    time?: DateTimeFilter<"Message"> | Date | string
    read?: BoolFilter<"Message"> | boolean
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrderInput | SortOrder
    sender?: SortOrder
    text?: SortOrder
    time?: SortOrder
    read?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    studentId?: StringFilter<"Message"> | string
    teacherId?: StringNullableFilter<"Message"> | string | null
    sender?: StringFilter<"Message"> | string
    text?: StringFilter<"Message"> | string
    time?: DateTimeFilter<"Message"> | Date | string
    read?: BoolFilter<"Message"> | boolean
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrderInput | SortOrder
    sender?: SortOrder
    text?: SortOrder
    time?: SortOrder
    read?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    studentId?: StringWithAggregatesFilter<"Message"> | string
    teacherId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    sender?: StringWithAggregatesFilter<"Message"> | string
    text?: StringWithAggregatesFilter<"Message"> | string
    time?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    read?: BoolWithAggregatesFilter<"Message"> | boolean
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    id?: StringFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    date?: StringFilter<"Announcement"> | string
    target?: StringFilter<"Announcement"> | string
    priority?: StringFilter<"Announcement"> | string
  }

  export type AnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    date?: SortOrder
    target?: SortOrder
    priority?: SortOrder
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    date?: StringFilter<"Announcement"> | string
    target?: StringFilter<"Announcement"> | string
    priority?: StringFilter<"Announcement"> | string
  }, "id">

  export type AnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    date?: SortOrder
    target?: SortOrder
    priority?: SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Announcement"> | string
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    date?: StringWithAggregatesFilter<"Announcement"> | string
    target?: StringWithAggregatesFilter<"Announcement"> | string
    priority?: StringWithAggregatesFilter<"Announcement"> | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    studentId?: StringFilter<"Invoice"> | string
    planName?: StringFilter<"Invoice"> | string
    amount?: IntFilter<"Invoice"> | number
    dueDate?: StringFilter<"Invoice"> | string
    status?: StringFilter<"Invoice"> | string
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    studentId?: StringFilter<"Invoice"> | string
    planName?: StringFilter<"Invoice"> | string
    amount?: IntFilter<"Invoice"> | number
    dueDate?: StringFilter<"Invoice"> | string
    status?: StringFilter<"Invoice"> | string
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    studentId?: StringWithAggregatesFilter<"Invoice"> | string
    planName?: StringWithAggregatesFilter<"Invoice"> | string
    amount?: IntWithAggregatesFilter<"Invoice"> | number
    dueDate?: StringWithAggregatesFilter<"Invoice"> | string
    status?: StringWithAggregatesFilter<"Invoice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type SchoolSettingsWhereInput = {
    AND?: SchoolSettingsWhereInput | SchoolSettingsWhereInput[]
    OR?: SchoolSettingsWhereInput[]
    NOT?: SchoolSettingsWhereInput | SchoolSettingsWhereInput[]
    id?: IntFilter<"SchoolSettings"> | number
    schoolName?: StringFilter<"SchoolSettings"> | string
    timezone?: StringFilter<"SchoolSettings"> | string
    defaultCourseDuration?: IntFilter<"SchoolSettings"> | number
    allowStudentCancellation?: BoolFilter<"SchoolSettings"> | boolean
    cancellationDeadlineHours?: IntFilter<"SchoolSettings"> | number
    monthlyGoal?: IntFilter<"SchoolSettings"> | number
  }

  export type SchoolSettingsOrderByWithRelationInput = {
    id?: SortOrder
    schoolName?: SortOrder
    timezone?: SortOrder
    defaultCourseDuration?: SortOrder
    allowStudentCancellation?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
  }

  export type SchoolSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SchoolSettingsWhereInput | SchoolSettingsWhereInput[]
    OR?: SchoolSettingsWhereInput[]
    NOT?: SchoolSettingsWhereInput | SchoolSettingsWhereInput[]
    schoolName?: StringFilter<"SchoolSettings"> | string
    timezone?: StringFilter<"SchoolSettings"> | string
    defaultCourseDuration?: IntFilter<"SchoolSettings"> | number
    allowStudentCancellation?: BoolFilter<"SchoolSettings"> | boolean
    cancellationDeadlineHours?: IntFilter<"SchoolSettings"> | number
    monthlyGoal?: IntFilter<"SchoolSettings"> | number
  }, "id">

  export type SchoolSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    schoolName?: SortOrder
    timezone?: SortOrder
    defaultCourseDuration?: SortOrder
    allowStudentCancellation?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
    _count?: SchoolSettingsCountOrderByAggregateInput
    _avg?: SchoolSettingsAvgOrderByAggregateInput
    _max?: SchoolSettingsMaxOrderByAggregateInput
    _min?: SchoolSettingsMinOrderByAggregateInput
    _sum?: SchoolSettingsSumOrderByAggregateInput
  }

  export type SchoolSettingsScalarWhereWithAggregatesInput = {
    AND?: SchoolSettingsScalarWhereWithAggregatesInput | SchoolSettingsScalarWhereWithAggregatesInput[]
    OR?: SchoolSettingsScalarWhereWithAggregatesInput[]
    NOT?: SchoolSettingsScalarWhereWithAggregatesInput | SchoolSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SchoolSettings"> | number
    schoolName?: StringWithAggregatesFilter<"SchoolSettings"> | string
    timezone?: StringWithAggregatesFilter<"SchoolSettings"> | string
    defaultCourseDuration?: IntWithAggregatesFilter<"SchoolSettings"> | number
    allowStudentCancellation?: BoolWithAggregatesFilter<"SchoolSettings"> | boolean
    cancellationDeadlineHours?: IntWithAggregatesFilter<"SchoolSettings"> | number
    monthlyGoal?: IntWithAggregatesFilter<"SchoolSettings"> | number
  }

  export type VocabProgressWhereInput = {
    AND?: VocabProgressWhereInput | VocabProgressWhereInput[]
    OR?: VocabProgressWhereInput[]
    NOT?: VocabProgressWhereInput | VocabProgressWhereInput[]
    id?: StringFilter<"VocabProgress"> | string
    studentId?: StringFilter<"VocabProgress"> | string
    level?: StringFilter<"VocabProgress"> | string
    stageIndex?: IntFilter<"VocabProgress"> | number
    completions?: IntFilter<"VocabProgress"> | number
    perfectClears?: IntFilter<"VocabProgress"> | number
    highestScore?: IntFilter<"VocabProgress"> | number
    mode?: StringFilter<"VocabProgress"> | string
    lastPlayedAt?: DateTimeFilter<"VocabProgress"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type VocabProgressOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    mode?: SortOrder
    lastPlayedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type VocabProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_level_stageIndex_mode?: VocabProgressStudentIdLevelStageIndexModeCompoundUniqueInput
    AND?: VocabProgressWhereInput | VocabProgressWhereInput[]
    OR?: VocabProgressWhereInput[]
    NOT?: VocabProgressWhereInput | VocabProgressWhereInput[]
    studentId?: StringFilter<"VocabProgress"> | string
    level?: StringFilter<"VocabProgress"> | string
    stageIndex?: IntFilter<"VocabProgress"> | number
    completions?: IntFilter<"VocabProgress"> | number
    perfectClears?: IntFilter<"VocabProgress"> | number
    highestScore?: IntFilter<"VocabProgress"> | number
    mode?: StringFilter<"VocabProgress"> | string
    lastPlayedAt?: DateTimeFilter<"VocabProgress"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id" | "studentId_level_stageIndex_mode">

  export type VocabProgressOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    mode?: SortOrder
    lastPlayedAt?: SortOrder
    _count?: VocabProgressCountOrderByAggregateInput
    _avg?: VocabProgressAvgOrderByAggregateInput
    _max?: VocabProgressMaxOrderByAggregateInput
    _min?: VocabProgressMinOrderByAggregateInput
    _sum?: VocabProgressSumOrderByAggregateInput
  }

  export type VocabProgressScalarWhereWithAggregatesInput = {
    AND?: VocabProgressScalarWhereWithAggregatesInput | VocabProgressScalarWhereWithAggregatesInput[]
    OR?: VocabProgressScalarWhereWithAggregatesInput[]
    NOT?: VocabProgressScalarWhereWithAggregatesInput | VocabProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VocabProgress"> | string
    studentId?: StringWithAggregatesFilter<"VocabProgress"> | string
    level?: StringWithAggregatesFilter<"VocabProgress"> | string
    stageIndex?: IntWithAggregatesFilter<"VocabProgress"> | number
    completions?: IntWithAggregatesFilter<"VocabProgress"> | number
    perfectClears?: IntWithAggregatesFilter<"VocabProgress"> | number
    highestScore?: IntWithAggregatesFilter<"VocabProgress"> | number
    mode?: StringWithAggregatesFilter<"VocabProgress"> | string
    lastPlayedAt?: DateTimeWithAggregatesFilter<"VocabProgress"> | Date | string
  }

  export type GrammarProgressWhereInput = {
    AND?: GrammarProgressWhereInput | GrammarProgressWhereInput[]
    OR?: GrammarProgressWhereInput[]
    NOT?: GrammarProgressWhereInput | GrammarProgressWhereInput[]
    id?: StringFilter<"GrammarProgress"> | string
    studentId?: StringFilter<"GrammarProgress"> | string
    level?: StringFilter<"GrammarProgress"> | string
    stageIndex?: IntFilter<"GrammarProgress"> | number
    completions?: IntFilter<"GrammarProgress"> | number
    perfectClears?: IntFilter<"GrammarProgress"> | number
    highestScore?: IntFilter<"GrammarProgress"> | number
    lastPlayedAt?: DateTimeFilter<"GrammarProgress"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type GrammarProgressOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    lastPlayedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type GrammarProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_level_stageIndex?: GrammarProgressStudentIdLevelStageIndexCompoundUniqueInput
    AND?: GrammarProgressWhereInput | GrammarProgressWhereInput[]
    OR?: GrammarProgressWhereInput[]
    NOT?: GrammarProgressWhereInput | GrammarProgressWhereInput[]
    studentId?: StringFilter<"GrammarProgress"> | string
    level?: StringFilter<"GrammarProgress"> | string
    stageIndex?: IntFilter<"GrammarProgress"> | number
    completions?: IntFilter<"GrammarProgress"> | number
    perfectClears?: IntFilter<"GrammarProgress"> | number
    highestScore?: IntFilter<"GrammarProgress"> | number
    lastPlayedAt?: DateTimeFilter<"GrammarProgress"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id" | "studentId_level_stageIndex">

  export type GrammarProgressOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    lastPlayedAt?: SortOrder
    _count?: GrammarProgressCountOrderByAggregateInput
    _avg?: GrammarProgressAvgOrderByAggregateInput
    _max?: GrammarProgressMaxOrderByAggregateInput
    _min?: GrammarProgressMinOrderByAggregateInput
    _sum?: GrammarProgressSumOrderByAggregateInput
  }

  export type GrammarProgressScalarWhereWithAggregatesInput = {
    AND?: GrammarProgressScalarWhereWithAggregatesInput | GrammarProgressScalarWhereWithAggregatesInput[]
    OR?: GrammarProgressScalarWhereWithAggregatesInput[]
    NOT?: GrammarProgressScalarWhereWithAggregatesInput | GrammarProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GrammarProgress"> | string
    studentId?: StringWithAggregatesFilter<"GrammarProgress"> | string
    level?: StringWithAggregatesFilter<"GrammarProgress"> | string
    stageIndex?: IntWithAggregatesFilter<"GrammarProgress"> | number
    completions?: IntWithAggregatesFilter<"GrammarProgress"> | number
    perfectClears?: IntWithAggregatesFilter<"GrammarProgress"> | number
    highestScore?: IntWithAggregatesFilter<"GrammarProgress"> | number
    lastPlayedAt?: DateTimeWithAggregatesFilter<"GrammarProgress"> | Date | string
  }

  export type GrammarPointWhereInput = {
    AND?: GrammarPointWhereInput | GrammarPointWhereInput[]
    OR?: GrammarPointWhereInput[]
    NOT?: GrammarPointWhereInput | GrammarPointWhereInput[]
    id?: StringFilter<"GrammarPoint"> | string
    label?: StringFilter<"GrammarPoint"> | string
    category?: StringFilter<"GrammarPoint"> | string
    order?: IntFilter<"GrammarPoint"> | number
    masteries?: GrammarMasteryListRelationFilter
  }

  export type GrammarPointOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    category?: SortOrder
    order?: SortOrder
    masteries?: GrammarMasteryOrderByRelationAggregateInput
  }

  export type GrammarPointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GrammarPointWhereInput | GrammarPointWhereInput[]
    OR?: GrammarPointWhereInput[]
    NOT?: GrammarPointWhereInput | GrammarPointWhereInput[]
    label?: StringFilter<"GrammarPoint"> | string
    category?: StringFilter<"GrammarPoint"> | string
    order?: IntFilter<"GrammarPoint"> | number
    masteries?: GrammarMasteryListRelationFilter
  }, "id">

  export type GrammarPointOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    category?: SortOrder
    order?: SortOrder
    _count?: GrammarPointCountOrderByAggregateInput
    _avg?: GrammarPointAvgOrderByAggregateInput
    _max?: GrammarPointMaxOrderByAggregateInput
    _min?: GrammarPointMinOrderByAggregateInput
    _sum?: GrammarPointSumOrderByAggregateInput
  }

  export type GrammarPointScalarWhereWithAggregatesInput = {
    AND?: GrammarPointScalarWhereWithAggregatesInput | GrammarPointScalarWhereWithAggregatesInput[]
    OR?: GrammarPointScalarWhereWithAggregatesInput[]
    NOT?: GrammarPointScalarWhereWithAggregatesInput | GrammarPointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GrammarPoint"> | string
    label?: StringWithAggregatesFilter<"GrammarPoint"> | string
    category?: StringWithAggregatesFilter<"GrammarPoint"> | string
    order?: IntWithAggregatesFilter<"GrammarPoint"> | number
  }

  export type GrammarMasteryWhereInput = {
    AND?: GrammarMasteryWhereInput | GrammarMasteryWhereInput[]
    OR?: GrammarMasteryWhereInput[]
    NOT?: GrammarMasteryWhereInput | GrammarMasteryWhereInput[]
    id?: StringFilter<"GrammarMastery"> | string
    studentId?: StringFilter<"GrammarMastery"> | string
    grammarPointId?: StringFilter<"GrammarMastery"> | string
    status?: StringFilter<"GrammarMastery"> | string
    updatedAt?: DateTimeFilter<"GrammarMastery"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    grammarPoint?: XOR<GrammarPointScalarRelationFilter, GrammarPointWhereInput>
  }

  export type GrammarMasteryOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    grammarPointId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    grammarPoint?: GrammarPointOrderByWithRelationInput
  }

  export type GrammarMasteryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_grammarPointId?: GrammarMasteryStudentIdGrammarPointIdCompoundUniqueInput
    AND?: GrammarMasteryWhereInput | GrammarMasteryWhereInput[]
    OR?: GrammarMasteryWhereInput[]
    NOT?: GrammarMasteryWhereInput | GrammarMasteryWhereInput[]
    studentId?: StringFilter<"GrammarMastery"> | string
    grammarPointId?: StringFilter<"GrammarMastery"> | string
    status?: StringFilter<"GrammarMastery"> | string
    updatedAt?: DateTimeFilter<"GrammarMastery"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    grammarPoint?: XOR<GrammarPointScalarRelationFilter, GrammarPointWhereInput>
  }, "id" | "studentId_grammarPointId">

  export type GrammarMasteryOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    grammarPointId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    _count?: GrammarMasteryCountOrderByAggregateInput
    _max?: GrammarMasteryMaxOrderByAggregateInput
    _min?: GrammarMasteryMinOrderByAggregateInput
  }

  export type GrammarMasteryScalarWhereWithAggregatesInput = {
    AND?: GrammarMasteryScalarWhereWithAggregatesInput | GrammarMasteryScalarWhereWithAggregatesInput[]
    OR?: GrammarMasteryScalarWhereWithAggregatesInput[]
    NOT?: GrammarMasteryScalarWhereWithAggregatesInput | GrammarMasteryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GrammarMastery"> | string
    studentId?: StringWithAggregatesFilter<"GrammarMastery"> | string
    grammarPointId?: StringWithAggregatesFilter<"GrammarMastery"> | string
    status?: StringWithAggregatesFilter<"GrammarMastery"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"GrammarMastery"> | Date | string
  }

  export type StudentCreateInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeacherCreateInput = {
    id?: string
    name: string
    email: string
    status?: string
    role?: string
    bio?: string | null
    joinDate: string
    rating?: number | null
    loginId?: string | null
    password?: string | null
    messages?: MessageCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    status?: string
    role?: string
    bio?: string | null
    joinDate: string
    rating?: number | null
    loginId?: string | null
    password?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    loginId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    loginId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: string
    name: string
    email: string
    status?: string
    role?: string
    bio?: string | null
    joinDate: string
    rating?: number | null
    loginId?: string | null
    password?: string | null
  }

  export type TeacherUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    loginId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    loginId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonScheduleCreateInput = {
    id?: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status?: string
    tags?: string | null
    meetingPassword?: string | null
    meetingUrl?: string | null
    student: StudentCreateNestedOneWithoutSchedulesInput
  }

  export type LessonScheduleUncheckedCreateInput = {
    id?: string
    studentId: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status?: string
    tags?: string | null
    meetingPassword?: string | null
    meetingUrl?: string | null
  }

  export type LessonScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student?: StudentUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type LessonScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonScheduleCreateManyInput = {
    id?: string
    studentId: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status?: string
    tags?: string | null
    meetingPassword?: string | null
    meetingUrl?: string | null
  }

  export type LessonScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonRecordCreateInput = {
    id?: string
    lessonId?: string | null
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope?: string | null
    importantExpressions?: string | null
    homework?: string | null
    internalNote?: string | null
    grammar?: number
    vocab?: number
    pronunciation?: number
    fluency?: number
    student: StudentCreateNestedOneWithoutRecordsInput
  }

  export type LessonRecordUncheckedCreateInput = {
    id?: string
    lessonId?: string | null
    studentId: string
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope?: string | null
    importantExpressions?: string | null
    homework?: string | null
    internalNote?: string | null
    grammar?: number
    vocab?: number
    pronunciation?: number
    fluency?: number
  }

  export type LessonRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
    student?: StudentUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type LessonRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
  }

  export type LessonRecordCreateManyInput = {
    id?: string
    lessonId?: string | null
    studentId: string
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope?: string | null
    importantExpressions?: string | null
    homework?: string | null
    internalNote?: string | null
    grammar?: number
    vocab?: number
    pronunciation?: number
    fluency?: number
  }

  export type LessonRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
  }

  export type LessonRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
  }

  export type TestScoreCreateInput = {
    id?: string
    type: string
    testName: string
    date: string
    grade?: string | null
    score: string
    totalScore?: string | null
    trend?: string
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutTestScoresInput
  }

  export type TestScoreUncheckedCreateInput = {
    id?: string
    studentId: string
    type: string
    testName: string
    date: string
    grade?: string | null
    score: string
    totalScore?: string | null
    trend?: string
    createdAt?: Date | string
  }

  export type TestScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutTestScoresNestedInput
  }

  export type TestScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreCreateManyInput = {
    id?: string
    studentId: string
    type: string
    testName: string
    date: string
    grade?: string | null
    score: string
    totalScore?: string | null
    trend?: string
    createdAt?: Date | string
  }

  export type TestScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    sender: string
    text: string
    time?: Date | string
    read?: boolean
    teacher?: TeacherCreateNestedOneWithoutMessagesInput
    student: StudentCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    studentId: string
    teacherId?: string | null
    sender: string
    text: string
    time?: Date | string
    read?: boolean
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    teacher?: TeacherUpdateOneWithoutMessagesNestedInput
    student?: StudentUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageCreateManyInput = {
    id?: string
    studentId: string
    teacherId?: string | null
    sender: string
    text: string
    time?: Date | string
    read?: boolean
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementCreateInput = {
    id?: string
    title: string
    content: string
    date: string
    target?: string
    priority?: string
  }

  export type AnnouncementUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    date: string
    target?: string
    priority?: string
  }

  export type AnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementCreateManyInput = {
    id?: string
    title: string
    content: string
    date: string
    target?: string
    priority?: string
  }

  export type AnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
  }

  export type InvoiceCreateInput = {
    id?: string
    planName: string
    amount: number
    dueDate: string
    status?: string
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutInvoicesInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    studentId: string
    planName: string
    amount: number
    dueDate: string
    status?: string
    createdAt?: Date | string
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutInvoicesNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyInput = {
    id?: string
    studentId: string
    planName: string
    amount: number
    dueDate: string
    status?: string
    createdAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolSettingsCreateInput = {
    schoolName: string
    timezone: string
    defaultCourseDuration: number
    allowStudentCancellation: boolean
    cancellationDeadlineHours: number
    monthlyGoal: number
  }

  export type SchoolSettingsUncheckedCreateInput = {
    id?: number
    schoolName: string
    timezone: string
    defaultCourseDuration: number
    allowStudentCancellation: boolean
    cancellationDeadlineHours: number
    monthlyGoal: number
  }

  export type SchoolSettingsUpdateInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCourseDuration?: IntFieldUpdateOperationsInput | number
    allowStudentCancellation?: BoolFieldUpdateOperationsInput | boolean
    cancellationDeadlineHours?: IntFieldUpdateOperationsInput | number
    monthlyGoal?: IntFieldUpdateOperationsInput | number
  }

  export type SchoolSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCourseDuration?: IntFieldUpdateOperationsInput | number
    allowStudentCancellation?: BoolFieldUpdateOperationsInput | boolean
    cancellationDeadlineHours?: IntFieldUpdateOperationsInput | number
    monthlyGoal?: IntFieldUpdateOperationsInput | number
  }

  export type SchoolSettingsCreateManyInput = {
    id?: number
    schoolName: string
    timezone: string
    defaultCourseDuration: number
    allowStudentCancellation: boolean
    cancellationDeadlineHours: number
    monthlyGoal: number
  }

  export type SchoolSettingsUpdateManyMutationInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCourseDuration?: IntFieldUpdateOperationsInput | number
    allowStudentCancellation?: BoolFieldUpdateOperationsInput | boolean
    cancellationDeadlineHours?: IntFieldUpdateOperationsInput | number
    monthlyGoal?: IntFieldUpdateOperationsInput | number
  }

  export type SchoolSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    defaultCourseDuration?: IntFieldUpdateOperationsInput | number
    allowStudentCancellation?: BoolFieldUpdateOperationsInput | boolean
    cancellationDeadlineHours?: IntFieldUpdateOperationsInput | number
    monthlyGoal?: IntFieldUpdateOperationsInput | number
  }

  export type VocabProgressCreateInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    mode?: string
    lastPlayedAt?: Date | string
    student: StudentCreateNestedOneWithoutVocabProgressesInput
  }

  export type VocabProgressUncheckedCreateInput = {
    id?: string
    studentId: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    mode?: string
    lastPlayedAt?: Date | string
  }

  export type VocabProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutVocabProgressesNestedInput
  }

  export type VocabProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabProgressCreateManyInput = {
    id?: string
    studentId: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    mode?: string
    lastPlayedAt?: Date | string
  }

  export type VocabProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarProgressCreateInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    lastPlayedAt?: Date | string
    student: StudentCreateNestedOneWithoutGrammarProgressesInput
  }

  export type GrammarProgressUncheckedCreateInput = {
    id?: string
    studentId: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    lastPlayedAt?: Date | string
  }

  export type GrammarProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutGrammarProgressesNestedInput
  }

  export type GrammarProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarProgressCreateManyInput = {
    id?: string
    studentId: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    lastPlayedAt?: Date | string
  }

  export type GrammarProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarPointCreateInput = {
    id?: string
    label: string
    category: string
    order?: number
    masteries?: GrammarMasteryCreateNestedManyWithoutGrammarPointInput
  }

  export type GrammarPointUncheckedCreateInput = {
    id?: string
    label: string
    category: string
    order?: number
    masteries?: GrammarMasteryUncheckedCreateNestedManyWithoutGrammarPointInput
  }

  export type GrammarPointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    masteries?: GrammarMasteryUpdateManyWithoutGrammarPointNestedInput
  }

  export type GrammarPointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    masteries?: GrammarMasteryUncheckedUpdateManyWithoutGrammarPointNestedInput
  }

  export type GrammarPointCreateManyInput = {
    id?: string
    label: string
    category: string
    order?: number
  }

  export type GrammarPointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type GrammarPointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type GrammarMasteryCreateInput = {
    id?: string
    status?: string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutGrammarMasteriesInput
    grammarPoint: GrammarPointCreateNestedOneWithoutMasteriesInput
  }

  export type GrammarMasteryUncheckedCreateInput = {
    id?: string
    studentId: string
    grammarPointId: string
    status?: string
    updatedAt?: Date | string
  }

  export type GrammarMasteryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutGrammarMasteriesNestedInput
    grammarPoint?: GrammarPointUpdateOneRequiredWithoutMasteriesNestedInput
  }

  export type GrammarMasteryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    grammarPointId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarMasteryCreateManyInput = {
    id?: string
    studentId: string
    grammarPointId: string
    status?: string
    updatedAt?: Date | string
  }

  export type GrammarMasteryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarMasteryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    grammarPointId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type GrammarProgressListRelationFilter = {
    every?: GrammarProgressWhereInput
    some?: GrammarProgressWhereInput
    none?: GrammarProgressWhereInput
  }

  export type GrammarMasteryListRelationFilter = {
    every?: GrammarMasteryWhereInput
    some?: GrammarMasteryWhereInput
    none?: GrammarMasteryWhereInput
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type LessonRecordListRelationFilter = {
    every?: LessonRecordWhereInput
    some?: LessonRecordWhereInput
    none?: LessonRecordWhereInput
  }

  export type LessonScheduleListRelationFilter = {
    every?: LessonScheduleWhereInput
    some?: LessonScheduleWhereInput
    none?: LessonScheduleWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type TestScoreListRelationFilter = {
    every?: TestScoreWhereInput
    some?: TestScoreWhereInput
    none?: TestScoreWhereInput
  }

  export type VocabProgressListRelationFilter = {
    every?: VocabProgressWhereInput
    some?: VocabProgressWhereInput
    none?: VocabProgressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GrammarProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GrammarMasteryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LessonRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LessonScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VocabProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    course?: SortOrder
    status?: SortOrder
    lastLesson?: SortOrder
    progress?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
    level?: SortOrder
    target?: SortOrder
    phone?: SortOrder
    joinDate?: SortOrder
    totalLessons?: SortOrder
    internalNote?: SortOrder
    toeicScore?: SortOrder
    cefr?: SortOrder
    vocabScore?: SortOrder
    grammarScore?: SortOrder
    listeningScore?: SortOrder
    speakingScore?: SortOrder
    goalTarget?: SortOrder
    goalProgress?: SortOrder
    biography?: SortOrder
    occupation?: SortOrder
    avatarUrl?: SortOrder
    coverUrl?: SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
    lastQuestPlayedAt?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    progress?: SortOrder
    level?: SortOrder
    totalLessons?: SortOrder
    vocabScore?: SortOrder
    grammarScore?: SortOrder
    listeningScore?: SortOrder
    speakingScore?: SortOrder
    goalProgress?: SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    course?: SortOrder
    status?: SortOrder
    lastLesson?: SortOrder
    progress?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
    level?: SortOrder
    target?: SortOrder
    phone?: SortOrder
    joinDate?: SortOrder
    totalLessons?: SortOrder
    internalNote?: SortOrder
    toeicScore?: SortOrder
    cefr?: SortOrder
    vocabScore?: SortOrder
    grammarScore?: SortOrder
    listeningScore?: SortOrder
    speakingScore?: SortOrder
    goalTarget?: SortOrder
    goalProgress?: SortOrder
    biography?: SortOrder
    occupation?: SortOrder
    avatarUrl?: SortOrder
    coverUrl?: SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
    lastQuestPlayedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    course?: SortOrder
    status?: SortOrder
    lastLesson?: SortOrder
    progress?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
    level?: SortOrder
    target?: SortOrder
    phone?: SortOrder
    joinDate?: SortOrder
    totalLessons?: SortOrder
    internalNote?: SortOrder
    toeicScore?: SortOrder
    cefr?: SortOrder
    vocabScore?: SortOrder
    grammarScore?: SortOrder
    listeningScore?: SortOrder
    speakingScore?: SortOrder
    goalTarget?: SortOrder
    goalProgress?: SortOrder
    biography?: SortOrder
    occupation?: SortOrder
    avatarUrl?: SortOrder
    coverUrl?: SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
    lastQuestPlayedAt?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    progress?: SortOrder
    level?: SortOrder
    totalLessons?: SortOrder
    vocabScore?: SortOrder
    grammarScore?: SortOrder
    listeningScore?: SortOrder
    speakingScore?: SortOrder
    goalProgress?: SortOrder
    questLevel?: SortOrder
    questXP?: SortOrder
    questStreak?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    joinDate?: SortOrder
    rating?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    joinDate?: SortOrder
    rating?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    joinDate?: SortOrder
    rating?: SortOrder
    loginId?: SortOrder
    password?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type LessonScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    teacherName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    course?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tags?: SortOrder
    meetingPassword?: SortOrder
    meetingUrl?: SortOrder
  }

  export type LessonScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    teacherName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    course?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tags?: SortOrder
    meetingPassword?: SortOrder
    meetingUrl?: SortOrder
  }

  export type LessonScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentName?: SortOrder
    teacherName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    course?: SortOrder
    type?: SortOrder
    status?: SortOrder
    tags?: SortOrder
    meetingPassword?: SortOrder
    meetingUrl?: SortOrder
  }

  export type LessonRecordCountOrderByAggregateInput = {
    id?: SortOrder
    lessonId?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    teacher?: SortOrder
    title?: SortOrder
    feedback?: SortOrder
    nextScope?: SortOrder
    importantExpressions?: SortOrder
    homework?: SortOrder
    internalNote?: SortOrder
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
  }

  export type LessonRecordAvgOrderByAggregateInput = {
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
  }

  export type LessonRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    lessonId?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    teacher?: SortOrder
    title?: SortOrder
    feedback?: SortOrder
    nextScope?: SortOrder
    importantExpressions?: SortOrder
    homework?: SortOrder
    internalNote?: SortOrder
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
  }

  export type LessonRecordMinOrderByAggregateInput = {
    id?: SortOrder
    lessonId?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    teacher?: SortOrder
    title?: SortOrder
    feedback?: SortOrder
    nextScope?: SortOrder
    importantExpressions?: SortOrder
    homework?: SortOrder
    internalNote?: SortOrder
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
  }

  export type LessonRecordSumOrderByAggregateInput = {
    grammar?: SortOrder
    vocab?: SortOrder
    pronunciation?: SortOrder
    fluency?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TestScoreCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    testName?: SortOrder
    date?: SortOrder
    grade?: SortOrder
    score?: SortOrder
    totalScore?: SortOrder
    trend?: SortOrder
    createdAt?: SortOrder
  }

  export type TestScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    testName?: SortOrder
    date?: SortOrder
    grade?: SortOrder
    score?: SortOrder
    totalScore?: SortOrder
    trend?: SortOrder
    createdAt?: SortOrder
  }

  export type TestScoreMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    type?: SortOrder
    testName?: SortOrder
    date?: SortOrder
    grade?: SortOrder
    score?: SortOrder
    totalScore?: SortOrder
    trend?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TeacherNullableScalarRelationFilter = {
    is?: TeacherWhereInput | null
    isNot?: TeacherWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    sender?: SortOrder
    text?: SortOrder
    time?: SortOrder
    read?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    sender?: SortOrder
    text?: SortOrder
    time?: SortOrder
    read?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    sender?: SortOrder
    text?: SortOrder
    time?: SortOrder
    read?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    date?: SortOrder
    target?: SortOrder
    priority?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    date?: SortOrder
    target?: SortOrder
    priority?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    date?: SortOrder
    target?: SortOrder
    priority?: SortOrder
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type SchoolSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    timezone?: SortOrder
    defaultCourseDuration?: SortOrder
    allowStudentCancellation?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
  }

  export type SchoolSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    defaultCourseDuration?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
  }

  export type SchoolSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    timezone?: SortOrder
    defaultCourseDuration?: SortOrder
    allowStudentCancellation?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
  }

  export type SchoolSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    timezone?: SortOrder
    defaultCourseDuration?: SortOrder
    allowStudentCancellation?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
  }

  export type SchoolSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    defaultCourseDuration?: SortOrder
    cancellationDeadlineHours?: SortOrder
    monthlyGoal?: SortOrder
  }

  export type VocabProgressStudentIdLevelStageIndexModeCompoundUniqueInput = {
    studentId: string
    level: string
    stageIndex: number
    mode: string
  }

  export type VocabProgressCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    mode?: SortOrder
    lastPlayedAt?: SortOrder
  }

  export type VocabProgressAvgOrderByAggregateInput = {
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
  }

  export type VocabProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    mode?: SortOrder
    lastPlayedAt?: SortOrder
  }

  export type VocabProgressMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    mode?: SortOrder
    lastPlayedAt?: SortOrder
  }

  export type VocabProgressSumOrderByAggregateInput = {
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
  }

  export type GrammarProgressStudentIdLevelStageIndexCompoundUniqueInput = {
    studentId: string
    level: string
    stageIndex: number
  }

  export type GrammarProgressCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    lastPlayedAt?: SortOrder
  }

  export type GrammarProgressAvgOrderByAggregateInput = {
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
  }

  export type GrammarProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    lastPlayedAt?: SortOrder
  }

  export type GrammarProgressMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    level?: SortOrder
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
    lastPlayedAt?: SortOrder
  }

  export type GrammarProgressSumOrderByAggregateInput = {
    stageIndex?: SortOrder
    completions?: SortOrder
    perfectClears?: SortOrder
    highestScore?: SortOrder
  }

  export type GrammarPointCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    category?: SortOrder
    order?: SortOrder
  }

  export type GrammarPointAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type GrammarPointMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    category?: SortOrder
    order?: SortOrder
  }

  export type GrammarPointMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    category?: SortOrder
    order?: SortOrder
  }

  export type GrammarPointSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type GrammarPointScalarRelationFilter = {
    is?: GrammarPointWhereInput
    isNot?: GrammarPointWhereInput
  }

  export type GrammarMasteryStudentIdGrammarPointIdCompoundUniqueInput = {
    studentId: string
    grammarPointId: string
  }

  export type GrammarMasteryCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    grammarPointId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrammarMasteryMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    grammarPointId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrammarMasteryMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    grammarPointId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrammarProgressCreateNestedManyWithoutStudentInput = {
    create?: XOR<GrammarProgressCreateWithoutStudentInput, GrammarProgressUncheckedCreateWithoutStudentInput> | GrammarProgressCreateWithoutStudentInput[] | GrammarProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarProgressCreateOrConnectWithoutStudentInput | GrammarProgressCreateOrConnectWithoutStudentInput[]
    createMany?: GrammarProgressCreateManyStudentInputEnvelope
    connect?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
  }

  export type GrammarMasteryCreateNestedManyWithoutStudentInput = {
    create?: XOR<GrammarMasteryCreateWithoutStudentInput, GrammarMasteryUncheckedCreateWithoutStudentInput> | GrammarMasteryCreateWithoutStudentInput[] | GrammarMasteryUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutStudentInput | GrammarMasteryCreateOrConnectWithoutStudentInput[]
    createMany?: GrammarMasteryCreateManyStudentInputEnvelope
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutStudentInput = {
    create?: XOR<InvoiceCreateWithoutStudentInput, InvoiceUncheckedCreateWithoutStudentInput> | InvoiceCreateWithoutStudentInput[] | InvoiceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutStudentInput | InvoiceCreateOrConnectWithoutStudentInput[]
    createMany?: InvoiceCreateManyStudentInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type LessonRecordCreateNestedManyWithoutStudentInput = {
    create?: XOR<LessonRecordCreateWithoutStudentInput, LessonRecordUncheckedCreateWithoutStudentInput> | LessonRecordCreateWithoutStudentInput[] | LessonRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonRecordCreateOrConnectWithoutStudentInput | LessonRecordCreateOrConnectWithoutStudentInput[]
    createMany?: LessonRecordCreateManyStudentInputEnvelope
    connect?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
  }

  export type LessonScheduleCreateNestedManyWithoutStudentInput = {
    create?: XOR<LessonScheduleCreateWithoutStudentInput, LessonScheduleUncheckedCreateWithoutStudentInput> | LessonScheduleCreateWithoutStudentInput[] | LessonScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonScheduleCreateOrConnectWithoutStudentInput | LessonScheduleCreateOrConnectWithoutStudentInput[]
    createMany?: LessonScheduleCreateManyStudentInputEnvelope
    connect?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutStudentInput = {
    create?: XOR<MessageCreateWithoutStudentInput, MessageUncheckedCreateWithoutStudentInput> | MessageCreateWithoutStudentInput[] | MessageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStudentInput | MessageCreateOrConnectWithoutStudentInput[]
    createMany?: MessageCreateManyStudentInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TestScoreCreateNestedManyWithoutStudentInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type VocabProgressCreateNestedManyWithoutStudentInput = {
    create?: XOR<VocabProgressCreateWithoutStudentInput, VocabProgressUncheckedCreateWithoutStudentInput> | VocabProgressCreateWithoutStudentInput[] | VocabProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: VocabProgressCreateOrConnectWithoutStudentInput | VocabProgressCreateOrConnectWithoutStudentInput[]
    createMany?: VocabProgressCreateManyStudentInputEnvelope
    connect?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
  }

  export type GrammarProgressUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<GrammarProgressCreateWithoutStudentInput, GrammarProgressUncheckedCreateWithoutStudentInput> | GrammarProgressCreateWithoutStudentInput[] | GrammarProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarProgressCreateOrConnectWithoutStudentInput | GrammarProgressCreateOrConnectWithoutStudentInput[]
    createMany?: GrammarProgressCreateManyStudentInputEnvelope
    connect?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
  }

  export type GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<GrammarMasteryCreateWithoutStudentInput, GrammarMasteryUncheckedCreateWithoutStudentInput> | GrammarMasteryCreateWithoutStudentInput[] | GrammarMasteryUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutStudentInput | GrammarMasteryCreateOrConnectWithoutStudentInput[]
    createMany?: GrammarMasteryCreateManyStudentInputEnvelope
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<InvoiceCreateWithoutStudentInput, InvoiceUncheckedCreateWithoutStudentInput> | InvoiceCreateWithoutStudentInput[] | InvoiceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutStudentInput | InvoiceCreateOrConnectWithoutStudentInput[]
    createMany?: InvoiceCreateManyStudentInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type LessonRecordUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<LessonRecordCreateWithoutStudentInput, LessonRecordUncheckedCreateWithoutStudentInput> | LessonRecordCreateWithoutStudentInput[] | LessonRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonRecordCreateOrConnectWithoutStudentInput | LessonRecordCreateOrConnectWithoutStudentInput[]
    createMany?: LessonRecordCreateManyStudentInputEnvelope
    connect?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
  }

  export type LessonScheduleUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<LessonScheduleCreateWithoutStudentInput, LessonScheduleUncheckedCreateWithoutStudentInput> | LessonScheduleCreateWithoutStudentInput[] | LessonScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonScheduleCreateOrConnectWithoutStudentInput | LessonScheduleCreateOrConnectWithoutStudentInput[]
    createMany?: LessonScheduleCreateManyStudentInputEnvelope
    connect?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<MessageCreateWithoutStudentInput, MessageUncheckedCreateWithoutStudentInput> | MessageCreateWithoutStudentInput[] | MessageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStudentInput | MessageCreateOrConnectWithoutStudentInput[]
    createMany?: MessageCreateManyStudentInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TestScoreUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type VocabProgressUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<VocabProgressCreateWithoutStudentInput, VocabProgressUncheckedCreateWithoutStudentInput> | VocabProgressCreateWithoutStudentInput[] | VocabProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: VocabProgressCreateOrConnectWithoutStudentInput | VocabProgressCreateOrConnectWithoutStudentInput[]
    createMany?: VocabProgressCreateManyStudentInputEnvelope
    connect?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GrammarProgressUpdateManyWithoutStudentNestedInput = {
    create?: XOR<GrammarProgressCreateWithoutStudentInput, GrammarProgressUncheckedCreateWithoutStudentInput> | GrammarProgressCreateWithoutStudentInput[] | GrammarProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarProgressCreateOrConnectWithoutStudentInput | GrammarProgressCreateOrConnectWithoutStudentInput[]
    upsert?: GrammarProgressUpsertWithWhereUniqueWithoutStudentInput | GrammarProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: GrammarProgressCreateManyStudentInputEnvelope
    set?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    disconnect?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    delete?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    connect?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    update?: GrammarProgressUpdateWithWhereUniqueWithoutStudentInput | GrammarProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: GrammarProgressUpdateManyWithWhereWithoutStudentInput | GrammarProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: GrammarProgressScalarWhereInput | GrammarProgressScalarWhereInput[]
  }

  export type GrammarMasteryUpdateManyWithoutStudentNestedInput = {
    create?: XOR<GrammarMasteryCreateWithoutStudentInput, GrammarMasteryUncheckedCreateWithoutStudentInput> | GrammarMasteryCreateWithoutStudentInput[] | GrammarMasteryUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutStudentInput | GrammarMasteryCreateOrConnectWithoutStudentInput[]
    upsert?: GrammarMasteryUpsertWithWhereUniqueWithoutStudentInput | GrammarMasteryUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: GrammarMasteryCreateManyStudentInputEnvelope
    set?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    disconnect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    delete?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    update?: GrammarMasteryUpdateWithWhereUniqueWithoutStudentInput | GrammarMasteryUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: GrammarMasteryUpdateManyWithWhereWithoutStudentInput | GrammarMasteryUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: GrammarMasteryScalarWhereInput | GrammarMasteryScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<InvoiceCreateWithoutStudentInput, InvoiceUncheckedCreateWithoutStudentInput> | InvoiceCreateWithoutStudentInput[] | InvoiceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutStudentInput | InvoiceCreateOrConnectWithoutStudentInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutStudentInput | InvoiceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: InvoiceCreateManyStudentInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutStudentInput | InvoiceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutStudentInput | InvoiceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type LessonRecordUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LessonRecordCreateWithoutStudentInput, LessonRecordUncheckedCreateWithoutStudentInput> | LessonRecordCreateWithoutStudentInput[] | LessonRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonRecordCreateOrConnectWithoutStudentInput | LessonRecordCreateOrConnectWithoutStudentInput[]
    upsert?: LessonRecordUpsertWithWhereUniqueWithoutStudentInput | LessonRecordUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LessonRecordCreateManyStudentInputEnvelope
    set?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    disconnect?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    delete?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    connect?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    update?: LessonRecordUpdateWithWhereUniqueWithoutStudentInput | LessonRecordUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LessonRecordUpdateManyWithWhereWithoutStudentInput | LessonRecordUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LessonRecordScalarWhereInput | LessonRecordScalarWhereInput[]
  }

  export type LessonScheduleUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LessonScheduleCreateWithoutStudentInput, LessonScheduleUncheckedCreateWithoutStudentInput> | LessonScheduleCreateWithoutStudentInput[] | LessonScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonScheduleCreateOrConnectWithoutStudentInput | LessonScheduleCreateOrConnectWithoutStudentInput[]
    upsert?: LessonScheduleUpsertWithWhereUniqueWithoutStudentInput | LessonScheduleUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LessonScheduleCreateManyStudentInputEnvelope
    set?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    disconnect?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    delete?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    connect?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    update?: LessonScheduleUpdateWithWhereUniqueWithoutStudentInput | LessonScheduleUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LessonScheduleUpdateManyWithWhereWithoutStudentInput | LessonScheduleUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LessonScheduleScalarWhereInput | LessonScheduleScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutStudentNestedInput = {
    create?: XOR<MessageCreateWithoutStudentInput, MessageUncheckedCreateWithoutStudentInput> | MessageCreateWithoutStudentInput[] | MessageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStudentInput | MessageCreateOrConnectWithoutStudentInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutStudentInput | MessageUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: MessageCreateManyStudentInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutStudentInput | MessageUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutStudentInput | MessageUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TestScoreUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutStudentInput | TestScoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutStudentInput | TestScoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutStudentInput | TestScoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type VocabProgressUpdateManyWithoutStudentNestedInput = {
    create?: XOR<VocabProgressCreateWithoutStudentInput, VocabProgressUncheckedCreateWithoutStudentInput> | VocabProgressCreateWithoutStudentInput[] | VocabProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: VocabProgressCreateOrConnectWithoutStudentInput | VocabProgressCreateOrConnectWithoutStudentInput[]
    upsert?: VocabProgressUpsertWithWhereUniqueWithoutStudentInput | VocabProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: VocabProgressCreateManyStudentInputEnvelope
    set?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    disconnect?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    delete?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    connect?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    update?: VocabProgressUpdateWithWhereUniqueWithoutStudentInput | VocabProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: VocabProgressUpdateManyWithWhereWithoutStudentInput | VocabProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: VocabProgressScalarWhereInput | VocabProgressScalarWhereInput[]
  }

  export type GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<GrammarProgressCreateWithoutStudentInput, GrammarProgressUncheckedCreateWithoutStudentInput> | GrammarProgressCreateWithoutStudentInput[] | GrammarProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarProgressCreateOrConnectWithoutStudentInput | GrammarProgressCreateOrConnectWithoutStudentInput[]
    upsert?: GrammarProgressUpsertWithWhereUniqueWithoutStudentInput | GrammarProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: GrammarProgressCreateManyStudentInputEnvelope
    set?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    disconnect?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    delete?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    connect?: GrammarProgressWhereUniqueInput | GrammarProgressWhereUniqueInput[]
    update?: GrammarProgressUpdateWithWhereUniqueWithoutStudentInput | GrammarProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: GrammarProgressUpdateManyWithWhereWithoutStudentInput | GrammarProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: GrammarProgressScalarWhereInput | GrammarProgressScalarWhereInput[]
  }

  export type GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<GrammarMasteryCreateWithoutStudentInput, GrammarMasteryUncheckedCreateWithoutStudentInput> | GrammarMasteryCreateWithoutStudentInput[] | GrammarMasteryUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutStudentInput | GrammarMasteryCreateOrConnectWithoutStudentInput[]
    upsert?: GrammarMasteryUpsertWithWhereUniqueWithoutStudentInput | GrammarMasteryUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: GrammarMasteryCreateManyStudentInputEnvelope
    set?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    disconnect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    delete?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    update?: GrammarMasteryUpdateWithWhereUniqueWithoutStudentInput | GrammarMasteryUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: GrammarMasteryUpdateManyWithWhereWithoutStudentInput | GrammarMasteryUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: GrammarMasteryScalarWhereInput | GrammarMasteryScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<InvoiceCreateWithoutStudentInput, InvoiceUncheckedCreateWithoutStudentInput> | InvoiceCreateWithoutStudentInput[] | InvoiceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutStudentInput | InvoiceCreateOrConnectWithoutStudentInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutStudentInput | InvoiceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: InvoiceCreateManyStudentInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutStudentInput | InvoiceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutStudentInput | InvoiceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type LessonRecordUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LessonRecordCreateWithoutStudentInput, LessonRecordUncheckedCreateWithoutStudentInput> | LessonRecordCreateWithoutStudentInput[] | LessonRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonRecordCreateOrConnectWithoutStudentInput | LessonRecordCreateOrConnectWithoutStudentInput[]
    upsert?: LessonRecordUpsertWithWhereUniqueWithoutStudentInput | LessonRecordUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LessonRecordCreateManyStudentInputEnvelope
    set?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    disconnect?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    delete?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    connect?: LessonRecordWhereUniqueInput | LessonRecordWhereUniqueInput[]
    update?: LessonRecordUpdateWithWhereUniqueWithoutStudentInput | LessonRecordUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LessonRecordUpdateManyWithWhereWithoutStudentInput | LessonRecordUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LessonRecordScalarWhereInput | LessonRecordScalarWhereInput[]
  }

  export type LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LessonScheduleCreateWithoutStudentInput, LessonScheduleUncheckedCreateWithoutStudentInput> | LessonScheduleCreateWithoutStudentInput[] | LessonScheduleUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LessonScheduleCreateOrConnectWithoutStudentInput | LessonScheduleCreateOrConnectWithoutStudentInput[]
    upsert?: LessonScheduleUpsertWithWhereUniqueWithoutStudentInput | LessonScheduleUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LessonScheduleCreateManyStudentInputEnvelope
    set?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    disconnect?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    delete?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    connect?: LessonScheduleWhereUniqueInput | LessonScheduleWhereUniqueInput[]
    update?: LessonScheduleUpdateWithWhereUniqueWithoutStudentInput | LessonScheduleUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LessonScheduleUpdateManyWithWhereWithoutStudentInput | LessonScheduleUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LessonScheduleScalarWhereInput | LessonScheduleScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<MessageCreateWithoutStudentInput, MessageUncheckedCreateWithoutStudentInput> | MessageCreateWithoutStudentInput[] | MessageUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutStudentInput | MessageCreateOrConnectWithoutStudentInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutStudentInput | MessageUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: MessageCreateManyStudentInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutStudentInput | MessageUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutStudentInput | MessageUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TestScoreUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutStudentInput | TestScoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutStudentInput | TestScoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutStudentInput | TestScoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type VocabProgressUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<VocabProgressCreateWithoutStudentInput, VocabProgressUncheckedCreateWithoutStudentInput> | VocabProgressCreateWithoutStudentInput[] | VocabProgressUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: VocabProgressCreateOrConnectWithoutStudentInput | VocabProgressCreateOrConnectWithoutStudentInput[]
    upsert?: VocabProgressUpsertWithWhereUniqueWithoutStudentInput | VocabProgressUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: VocabProgressCreateManyStudentInputEnvelope
    set?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    disconnect?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    delete?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    connect?: VocabProgressWhereUniqueInput | VocabProgressWhereUniqueInput[]
    update?: VocabProgressUpdateWithWhereUniqueWithoutStudentInput | VocabProgressUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: VocabProgressUpdateManyWithWhereWithoutStudentInput | VocabProgressUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: VocabProgressScalarWhereInput | VocabProgressScalarWhereInput[]
  }

  export type MessageCreateNestedManyWithoutTeacherInput = {
    create?: XOR<MessageCreateWithoutTeacherInput, MessageUncheckedCreateWithoutTeacherInput> | MessageCreateWithoutTeacherInput[] | MessageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTeacherInput | MessageCreateOrConnectWithoutTeacherInput[]
    createMany?: MessageCreateManyTeacherInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<MessageCreateWithoutTeacherInput, MessageUncheckedCreateWithoutTeacherInput> | MessageCreateWithoutTeacherInput[] | MessageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTeacherInput | MessageCreateOrConnectWithoutTeacherInput[]
    createMany?: MessageCreateManyTeacherInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MessageUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<MessageCreateWithoutTeacherInput, MessageUncheckedCreateWithoutTeacherInput> | MessageCreateWithoutTeacherInput[] | MessageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTeacherInput | MessageCreateOrConnectWithoutTeacherInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTeacherInput | MessageUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: MessageCreateManyTeacherInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTeacherInput | MessageUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTeacherInput | MessageUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<MessageCreateWithoutTeacherInput, MessageUncheckedCreateWithoutTeacherInput> | MessageCreateWithoutTeacherInput[] | MessageUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTeacherInput | MessageCreateOrConnectWithoutTeacherInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTeacherInput | MessageUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: MessageCreateManyTeacherInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTeacherInput | MessageUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTeacherInput | MessageUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<StudentCreateWithoutSchedulesInput, StudentUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutSchedulesInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<StudentCreateWithoutSchedulesInput, StudentUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutSchedulesInput
    upsert?: StudentUpsertWithoutSchedulesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutSchedulesInput, StudentUpdateWithoutSchedulesInput>, StudentUncheckedUpdateWithoutSchedulesInput>
  }

  export type StudentCreateNestedOneWithoutRecordsInput = {
    create?: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutRecordsInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutRecordsInput
    upsert?: StudentUpsertWithoutRecordsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutRecordsInput, StudentUpdateWithoutRecordsInput>, StudentUncheckedUpdateWithoutRecordsInput>
  }

  export type StudentCreateNestedOneWithoutTestScoresInput = {
    create?: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTestScoresInput
    connect?: StudentWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentUpdateOneRequiredWithoutTestScoresNestedInput = {
    create?: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTestScoresInput
    upsert?: StudentUpsertWithoutTestScoresInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTestScoresInput, StudentUpdateWithoutTestScoresInput>, StudentUncheckedUpdateWithoutTestScoresInput>
  }

  export type TeacherCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TeacherCreateWithoutMessagesInput, TeacherUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutMessagesInput
    connect?: TeacherWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutMessagesInput = {
    create?: XOR<StudentCreateWithoutMessagesInput, StudentUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutMessagesInput
    connect?: StudentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TeacherUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<TeacherCreateWithoutMessagesInput, TeacherUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutMessagesInput
    upsert?: TeacherUpsertWithoutMessagesInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutMessagesInput, TeacherUpdateWithoutMessagesInput>, TeacherUncheckedUpdateWithoutMessagesInput>
  }

  export type StudentUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<StudentCreateWithoutMessagesInput, StudentUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutMessagesInput
    upsert?: StudentUpsertWithoutMessagesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutMessagesInput, StudentUpdateWithoutMessagesInput>, StudentUncheckedUpdateWithoutMessagesInput>
  }

  export type StudentCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<StudentCreateWithoutInvoicesInput, StudentUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutInvoicesInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<StudentCreateWithoutInvoicesInput, StudentUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutInvoicesInput
    upsert?: StudentUpsertWithoutInvoicesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutInvoicesInput, StudentUpdateWithoutInvoicesInput>, StudentUncheckedUpdateWithoutInvoicesInput>
  }

  export type StudentCreateNestedOneWithoutVocabProgressesInput = {
    create?: XOR<StudentCreateWithoutVocabProgressesInput, StudentUncheckedCreateWithoutVocabProgressesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutVocabProgressesInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutVocabProgressesNestedInput = {
    create?: XOR<StudentCreateWithoutVocabProgressesInput, StudentUncheckedCreateWithoutVocabProgressesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutVocabProgressesInput
    upsert?: StudentUpsertWithoutVocabProgressesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutVocabProgressesInput, StudentUpdateWithoutVocabProgressesInput>, StudentUncheckedUpdateWithoutVocabProgressesInput>
  }

  export type StudentCreateNestedOneWithoutGrammarProgressesInput = {
    create?: XOR<StudentCreateWithoutGrammarProgressesInput, StudentUncheckedCreateWithoutGrammarProgressesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutGrammarProgressesInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutGrammarProgressesNestedInput = {
    create?: XOR<StudentCreateWithoutGrammarProgressesInput, StudentUncheckedCreateWithoutGrammarProgressesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutGrammarProgressesInput
    upsert?: StudentUpsertWithoutGrammarProgressesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutGrammarProgressesInput, StudentUpdateWithoutGrammarProgressesInput>, StudentUncheckedUpdateWithoutGrammarProgressesInput>
  }

  export type GrammarMasteryCreateNestedManyWithoutGrammarPointInput = {
    create?: XOR<GrammarMasteryCreateWithoutGrammarPointInput, GrammarMasteryUncheckedCreateWithoutGrammarPointInput> | GrammarMasteryCreateWithoutGrammarPointInput[] | GrammarMasteryUncheckedCreateWithoutGrammarPointInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutGrammarPointInput | GrammarMasteryCreateOrConnectWithoutGrammarPointInput[]
    createMany?: GrammarMasteryCreateManyGrammarPointInputEnvelope
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
  }

  export type GrammarMasteryUncheckedCreateNestedManyWithoutGrammarPointInput = {
    create?: XOR<GrammarMasteryCreateWithoutGrammarPointInput, GrammarMasteryUncheckedCreateWithoutGrammarPointInput> | GrammarMasteryCreateWithoutGrammarPointInput[] | GrammarMasteryUncheckedCreateWithoutGrammarPointInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutGrammarPointInput | GrammarMasteryCreateOrConnectWithoutGrammarPointInput[]
    createMany?: GrammarMasteryCreateManyGrammarPointInputEnvelope
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
  }

  export type GrammarMasteryUpdateManyWithoutGrammarPointNestedInput = {
    create?: XOR<GrammarMasteryCreateWithoutGrammarPointInput, GrammarMasteryUncheckedCreateWithoutGrammarPointInput> | GrammarMasteryCreateWithoutGrammarPointInput[] | GrammarMasteryUncheckedCreateWithoutGrammarPointInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutGrammarPointInput | GrammarMasteryCreateOrConnectWithoutGrammarPointInput[]
    upsert?: GrammarMasteryUpsertWithWhereUniqueWithoutGrammarPointInput | GrammarMasteryUpsertWithWhereUniqueWithoutGrammarPointInput[]
    createMany?: GrammarMasteryCreateManyGrammarPointInputEnvelope
    set?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    disconnect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    delete?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    update?: GrammarMasteryUpdateWithWhereUniqueWithoutGrammarPointInput | GrammarMasteryUpdateWithWhereUniqueWithoutGrammarPointInput[]
    updateMany?: GrammarMasteryUpdateManyWithWhereWithoutGrammarPointInput | GrammarMasteryUpdateManyWithWhereWithoutGrammarPointInput[]
    deleteMany?: GrammarMasteryScalarWhereInput | GrammarMasteryScalarWhereInput[]
  }

  export type GrammarMasteryUncheckedUpdateManyWithoutGrammarPointNestedInput = {
    create?: XOR<GrammarMasteryCreateWithoutGrammarPointInput, GrammarMasteryUncheckedCreateWithoutGrammarPointInput> | GrammarMasteryCreateWithoutGrammarPointInput[] | GrammarMasteryUncheckedCreateWithoutGrammarPointInput[]
    connectOrCreate?: GrammarMasteryCreateOrConnectWithoutGrammarPointInput | GrammarMasteryCreateOrConnectWithoutGrammarPointInput[]
    upsert?: GrammarMasteryUpsertWithWhereUniqueWithoutGrammarPointInput | GrammarMasteryUpsertWithWhereUniqueWithoutGrammarPointInput[]
    createMany?: GrammarMasteryCreateManyGrammarPointInputEnvelope
    set?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    disconnect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    delete?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    connect?: GrammarMasteryWhereUniqueInput | GrammarMasteryWhereUniqueInput[]
    update?: GrammarMasteryUpdateWithWhereUniqueWithoutGrammarPointInput | GrammarMasteryUpdateWithWhereUniqueWithoutGrammarPointInput[]
    updateMany?: GrammarMasteryUpdateManyWithWhereWithoutGrammarPointInput | GrammarMasteryUpdateManyWithWhereWithoutGrammarPointInput[]
    deleteMany?: GrammarMasteryScalarWhereInput | GrammarMasteryScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutGrammarMasteriesInput = {
    create?: XOR<StudentCreateWithoutGrammarMasteriesInput, StudentUncheckedCreateWithoutGrammarMasteriesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutGrammarMasteriesInput
    connect?: StudentWhereUniqueInput
  }

  export type GrammarPointCreateNestedOneWithoutMasteriesInput = {
    create?: XOR<GrammarPointCreateWithoutMasteriesInput, GrammarPointUncheckedCreateWithoutMasteriesInput>
    connectOrCreate?: GrammarPointCreateOrConnectWithoutMasteriesInput
    connect?: GrammarPointWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutGrammarMasteriesNestedInput = {
    create?: XOR<StudentCreateWithoutGrammarMasteriesInput, StudentUncheckedCreateWithoutGrammarMasteriesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutGrammarMasteriesInput
    upsert?: StudentUpsertWithoutGrammarMasteriesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutGrammarMasteriesInput, StudentUpdateWithoutGrammarMasteriesInput>, StudentUncheckedUpdateWithoutGrammarMasteriesInput>
  }

  export type GrammarPointUpdateOneRequiredWithoutMasteriesNestedInput = {
    create?: XOR<GrammarPointCreateWithoutMasteriesInput, GrammarPointUncheckedCreateWithoutMasteriesInput>
    connectOrCreate?: GrammarPointCreateOrConnectWithoutMasteriesInput
    upsert?: GrammarPointUpsertWithoutMasteriesInput
    connect?: GrammarPointWhereUniqueInput
    update?: XOR<XOR<GrammarPointUpdateToOneWithWhereWithoutMasteriesInput, GrammarPointUpdateWithoutMasteriesInput>, GrammarPointUncheckedUpdateWithoutMasteriesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GrammarProgressCreateWithoutStudentInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    lastPlayedAt?: Date | string
  }

  export type GrammarProgressUncheckedCreateWithoutStudentInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    lastPlayedAt?: Date | string
  }

  export type GrammarProgressCreateOrConnectWithoutStudentInput = {
    where: GrammarProgressWhereUniqueInput
    create: XOR<GrammarProgressCreateWithoutStudentInput, GrammarProgressUncheckedCreateWithoutStudentInput>
  }

  export type GrammarProgressCreateManyStudentInputEnvelope = {
    data: GrammarProgressCreateManyStudentInput | GrammarProgressCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type GrammarMasteryCreateWithoutStudentInput = {
    id?: string
    status?: string
    updatedAt?: Date | string
    grammarPoint: GrammarPointCreateNestedOneWithoutMasteriesInput
  }

  export type GrammarMasteryUncheckedCreateWithoutStudentInput = {
    id?: string
    grammarPointId: string
    status?: string
    updatedAt?: Date | string
  }

  export type GrammarMasteryCreateOrConnectWithoutStudentInput = {
    where: GrammarMasteryWhereUniqueInput
    create: XOR<GrammarMasteryCreateWithoutStudentInput, GrammarMasteryUncheckedCreateWithoutStudentInput>
  }

  export type GrammarMasteryCreateManyStudentInputEnvelope = {
    data: GrammarMasteryCreateManyStudentInput | GrammarMasteryCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutStudentInput = {
    id?: string
    planName: string
    amount: number
    dueDate: string
    status?: string
    createdAt?: Date | string
  }

  export type InvoiceUncheckedCreateWithoutStudentInput = {
    id?: string
    planName: string
    amount: number
    dueDate: string
    status?: string
    createdAt?: Date | string
  }

  export type InvoiceCreateOrConnectWithoutStudentInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutStudentInput, InvoiceUncheckedCreateWithoutStudentInput>
  }

  export type InvoiceCreateManyStudentInputEnvelope = {
    data: InvoiceCreateManyStudentInput | InvoiceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type LessonRecordCreateWithoutStudentInput = {
    id?: string
    lessonId?: string | null
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope?: string | null
    importantExpressions?: string | null
    homework?: string | null
    internalNote?: string | null
    grammar?: number
    vocab?: number
    pronunciation?: number
    fluency?: number
  }

  export type LessonRecordUncheckedCreateWithoutStudentInput = {
    id?: string
    lessonId?: string | null
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope?: string | null
    importantExpressions?: string | null
    homework?: string | null
    internalNote?: string | null
    grammar?: number
    vocab?: number
    pronunciation?: number
    fluency?: number
  }

  export type LessonRecordCreateOrConnectWithoutStudentInput = {
    where: LessonRecordWhereUniqueInput
    create: XOR<LessonRecordCreateWithoutStudentInput, LessonRecordUncheckedCreateWithoutStudentInput>
  }

  export type LessonRecordCreateManyStudentInputEnvelope = {
    data: LessonRecordCreateManyStudentInput | LessonRecordCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type LessonScheduleCreateWithoutStudentInput = {
    id?: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status?: string
    tags?: string | null
    meetingPassword?: string | null
    meetingUrl?: string | null
  }

  export type LessonScheduleUncheckedCreateWithoutStudentInput = {
    id?: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status?: string
    tags?: string | null
    meetingPassword?: string | null
    meetingUrl?: string | null
  }

  export type LessonScheduleCreateOrConnectWithoutStudentInput = {
    where: LessonScheduleWhereUniqueInput
    create: XOR<LessonScheduleCreateWithoutStudentInput, LessonScheduleUncheckedCreateWithoutStudentInput>
  }

  export type LessonScheduleCreateManyStudentInputEnvelope = {
    data: LessonScheduleCreateManyStudentInput | LessonScheduleCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutStudentInput = {
    id?: string
    sender: string
    text: string
    time?: Date | string
    read?: boolean
    teacher?: TeacherCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutStudentInput = {
    id?: string
    teacherId?: string | null
    sender: string
    text: string
    time?: Date | string
    read?: boolean
  }

  export type MessageCreateOrConnectWithoutStudentInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutStudentInput, MessageUncheckedCreateWithoutStudentInput>
  }

  export type MessageCreateManyStudentInputEnvelope = {
    data: MessageCreateManyStudentInput | MessageCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type TestScoreCreateWithoutStudentInput = {
    id?: string
    type: string
    testName: string
    date: string
    grade?: string | null
    score: string
    totalScore?: string | null
    trend?: string
    createdAt?: Date | string
  }

  export type TestScoreUncheckedCreateWithoutStudentInput = {
    id?: string
    type: string
    testName: string
    date: string
    grade?: string | null
    score: string
    totalScore?: string | null
    trend?: string
    createdAt?: Date | string
  }

  export type TestScoreCreateOrConnectWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    create: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput>
  }

  export type TestScoreCreateManyStudentInputEnvelope = {
    data: TestScoreCreateManyStudentInput | TestScoreCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type VocabProgressCreateWithoutStudentInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    mode?: string
    lastPlayedAt?: Date | string
  }

  export type VocabProgressUncheckedCreateWithoutStudentInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    mode?: string
    lastPlayedAt?: Date | string
  }

  export type VocabProgressCreateOrConnectWithoutStudentInput = {
    where: VocabProgressWhereUniqueInput
    create: XOR<VocabProgressCreateWithoutStudentInput, VocabProgressUncheckedCreateWithoutStudentInput>
  }

  export type VocabProgressCreateManyStudentInputEnvelope = {
    data: VocabProgressCreateManyStudentInput | VocabProgressCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type GrammarProgressUpsertWithWhereUniqueWithoutStudentInput = {
    where: GrammarProgressWhereUniqueInput
    update: XOR<GrammarProgressUpdateWithoutStudentInput, GrammarProgressUncheckedUpdateWithoutStudentInput>
    create: XOR<GrammarProgressCreateWithoutStudentInput, GrammarProgressUncheckedCreateWithoutStudentInput>
  }

  export type GrammarProgressUpdateWithWhereUniqueWithoutStudentInput = {
    where: GrammarProgressWhereUniqueInput
    data: XOR<GrammarProgressUpdateWithoutStudentInput, GrammarProgressUncheckedUpdateWithoutStudentInput>
  }

  export type GrammarProgressUpdateManyWithWhereWithoutStudentInput = {
    where: GrammarProgressScalarWhereInput
    data: XOR<GrammarProgressUpdateManyMutationInput, GrammarProgressUncheckedUpdateManyWithoutStudentInput>
  }

  export type GrammarProgressScalarWhereInput = {
    AND?: GrammarProgressScalarWhereInput | GrammarProgressScalarWhereInput[]
    OR?: GrammarProgressScalarWhereInput[]
    NOT?: GrammarProgressScalarWhereInput | GrammarProgressScalarWhereInput[]
    id?: StringFilter<"GrammarProgress"> | string
    studentId?: StringFilter<"GrammarProgress"> | string
    level?: StringFilter<"GrammarProgress"> | string
    stageIndex?: IntFilter<"GrammarProgress"> | number
    completions?: IntFilter<"GrammarProgress"> | number
    perfectClears?: IntFilter<"GrammarProgress"> | number
    highestScore?: IntFilter<"GrammarProgress"> | number
    lastPlayedAt?: DateTimeFilter<"GrammarProgress"> | Date | string
  }

  export type GrammarMasteryUpsertWithWhereUniqueWithoutStudentInput = {
    where: GrammarMasteryWhereUniqueInput
    update: XOR<GrammarMasteryUpdateWithoutStudentInput, GrammarMasteryUncheckedUpdateWithoutStudentInput>
    create: XOR<GrammarMasteryCreateWithoutStudentInput, GrammarMasteryUncheckedCreateWithoutStudentInput>
  }

  export type GrammarMasteryUpdateWithWhereUniqueWithoutStudentInput = {
    where: GrammarMasteryWhereUniqueInput
    data: XOR<GrammarMasteryUpdateWithoutStudentInput, GrammarMasteryUncheckedUpdateWithoutStudentInput>
  }

  export type GrammarMasteryUpdateManyWithWhereWithoutStudentInput = {
    where: GrammarMasteryScalarWhereInput
    data: XOR<GrammarMasteryUpdateManyMutationInput, GrammarMasteryUncheckedUpdateManyWithoutStudentInput>
  }

  export type GrammarMasteryScalarWhereInput = {
    AND?: GrammarMasteryScalarWhereInput | GrammarMasteryScalarWhereInput[]
    OR?: GrammarMasteryScalarWhereInput[]
    NOT?: GrammarMasteryScalarWhereInput | GrammarMasteryScalarWhereInput[]
    id?: StringFilter<"GrammarMastery"> | string
    studentId?: StringFilter<"GrammarMastery"> | string
    grammarPointId?: StringFilter<"GrammarMastery"> | string
    status?: StringFilter<"GrammarMastery"> | string
    updatedAt?: DateTimeFilter<"GrammarMastery"> | Date | string
  }

  export type InvoiceUpsertWithWhereUniqueWithoutStudentInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutStudentInput, InvoiceUncheckedUpdateWithoutStudentInput>
    create: XOR<InvoiceCreateWithoutStudentInput, InvoiceUncheckedCreateWithoutStudentInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutStudentInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutStudentInput, InvoiceUncheckedUpdateWithoutStudentInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutStudentInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutStudentInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    studentId?: StringFilter<"Invoice"> | string
    planName?: StringFilter<"Invoice"> | string
    amount?: IntFilter<"Invoice"> | number
    dueDate?: StringFilter<"Invoice"> | string
    status?: StringFilter<"Invoice"> | string
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type LessonRecordUpsertWithWhereUniqueWithoutStudentInput = {
    where: LessonRecordWhereUniqueInput
    update: XOR<LessonRecordUpdateWithoutStudentInput, LessonRecordUncheckedUpdateWithoutStudentInput>
    create: XOR<LessonRecordCreateWithoutStudentInput, LessonRecordUncheckedCreateWithoutStudentInput>
  }

  export type LessonRecordUpdateWithWhereUniqueWithoutStudentInput = {
    where: LessonRecordWhereUniqueInput
    data: XOR<LessonRecordUpdateWithoutStudentInput, LessonRecordUncheckedUpdateWithoutStudentInput>
  }

  export type LessonRecordUpdateManyWithWhereWithoutStudentInput = {
    where: LessonRecordScalarWhereInput
    data: XOR<LessonRecordUpdateManyMutationInput, LessonRecordUncheckedUpdateManyWithoutStudentInput>
  }

  export type LessonRecordScalarWhereInput = {
    AND?: LessonRecordScalarWhereInput | LessonRecordScalarWhereInput[]
    OR?: LessonRecordScalarWhereInput[]
    NOT?: LessonRecordScalarWhereInput | LessonRecordScalarWhereInput[]
    id?: StringFilter<"LessonRecord"> | string
    lessonId?: StringNullableFilter<"LessonRecord"> | string | null
    studentId?: StringFilter<"LessonRecord"> | string
    date?: StringFilter<"LessonRecord"> | string
    teacher?: StringFilter<"LessonRecord"> | string
    title?: StringFilter<"LessonRecord"> | string
    feedback?: StringFilter<"LessonRecord"> | string
    nextScope?: StringNullableFilter<"LessonRecord"> | string | null
    importantExpressions?: StringNullableFilter<"LessonRecord"> | string | null
    homework?: StringNullableFilter<"LessonRecord"> | string | null
    internalNote?: StringNullableFilter<"LessonRecord"> | string | null
    grammar?: IntFilter<"LessonRecord"> | number
    vocab?: IntFilter<"LessonRecord"> | number
    pronunciation?: IntFilter<"LessonRecord"> | number
    fluency?: IntFilter<"LessonRecord"> | number
  }

  export type LessonScheduleUpsertWithWhereUniqueWithoutStudentInput = {
    where: LessonScheduleWhereUniqueInput
    update: XOR<LessonScheduleUpdateWithoutStudentInput, LessonScheduleUncheckedUpdateWithoutStudentInput>
    create: XOR<LessonScheduleCreateWithoutStudentInput, LessonScheduleUncheckedCreateWithoutStudentInput>
  }

  export type LessonScheduleUpdateWithWhereUniqueWithoutStudentInput = {
    where: LessonScheduleWhereUniqueInput
    data: XOR<LessonScheduleUpdateWithoutStudentInput, LessonScheduleUncheckedUpdateWithoutStudentInput>
  }

  export type LessonScheduleUpdateManyWithWhereWithoutStudentInput = {
    where: LessonScheduleScalarWhereInput
    data: XOR<LessonScheduleUpdateManyMutationInput, LessonScheduleUncheckedUpdateManyWithoutStudentInput>
  }

  export type LessonScheduleScalarWhereInput = {
    AND?: LessonScheduleScalarWhereInput | LessonScheduleScalarWhereInput[]
    OR?: LessonScheduleScalarWhereInput[]
    NOT?: LessonScheduleScalarWhereInput | LessonScheduleScalarWhereInput[]
    id?: StringFilter<"LessonSchedule"> | string
    studentId?: StringFilter<"LessonSchedule"> | string
    studentName?: StringFilter<"LessonSchedule"> | string
    teacherName?: StringFilter<"LessonSchedule"> | string
    date?: StringFilter<"LessonSchedule"> | string
    time?: StringFilter<"LessonSchedule"> | string
    duration?: StringFilter<"LessonSchedule"> | string
    course?: StringFilter<"LessonSchedule"> | string
    type?: StringFilter<"LessonSchedule"> | string
    status?: StringFilter<"LessonSchedule"> | string
    tags?: StringNullableFilter<"LessonSchedule"> | string | null
    meetingPassword?: StringNullableFilter<"LessonSchedule"> | string | null
    meetingUrl?: StringNullableFilter<"LessonSchedule"> | string | null
  }

  export type MessageUpsertWithWhereUniqueWithoutStudentInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutStudentInput, MessageUncheckedUpdateWithoutStudentInput>
    create: XOR<MessageCreateWithoutStudentInput, MessageUncheckedCreateWithoutStudentInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutStudentInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutStudentInput, MessageUncheckedUpdateWithoutStudentInput>
  }

  export type MessageUpdateManyWithWhereWithoutStudentInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutStudentInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    studentId?: StringFilter<"Message"> | string
    teacherId?: StringNullableFilter<"Message"> | string | null
    sender?: StringFilter<"Message"> | string
    text?: StringFilter<"Message"> | string
    time?: DateTimeFilter<"Message"> | Date | string
    read?: BoolFilter<"Message"> | boolean
  }

  export type TestScoreUpsertWithWhereUniqueWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    update: XOR<TestScoreUpdateWithoutStudentInput, TestScoreUncheckedUpdateWithoutStudentInput>
    create: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput>
  }

  export type TestScoreUpdateWithWhereUniqueWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    data: XOR<TestScoreUpdateWithoutStudentInput, TestScoreUncheckedUpdateWithoutStudentInput>
  }

  export type TestScoreUpdateManyWithWhereWithoutStudentInput = {
    where: TestScoreScalarWhereInput
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyWithoutStudentInput>
  }

  export type TestScoreScalarWhereInput = {
    AND?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
    OR?: TestScoreScalarWhereInput[]
    NOT?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
    id?: StringFilter<"TestScore"> | string
    studentId?: StringFilter<"TestScore"> | string
    type?: StringFilter<"TestScore"> | string
    testName?: StringFilter<"TestScore"> | string
    date?: StringFilter<"TestScore"> | string
    grade?: StringNullableFilter<"TestScore"> | string | null
    score?: StringFilter<"TestScore"> | string
    totalScore?: StringNullableFilter<"TestScore"> | string | null
    trend?: StringFilter<"TestScore"> | string
    createdAt?: DateTimeFilter<"TestScore"> | Date | string
  }

  export type VocabProgressUpsertWithWhereUniqueWithoutStudentInput = {
    where: VocabProgressWhereUniqueInput
    update: XOR<VocabProgressUpdateWithoutStudentInput, VocabProgressUncheckedUpdateWithoutStudentInput>
    create: XOR<VocabProgressCreateWithoutStudentInput, VocabProgressUncheckedCreateWithoutStudentInput>
  }

  export type VocabProgressUpdateWithWhereUniqueWithoutStudentInput = {
    where: VocabProgressWhereUniqueInput
    data: XOR<VocabProgressUpdateWithoutStudentInput, VocabProgressUncheckedUpdateWithoutStudentInput>
  }

  export type VocabProgressUpdateManyWithWhereWithoutStudentInput = {
    where: VocabProgressScalarWhereInput
    data: XOR<VocabProgressUpdateManyMutationInput, VocabProgressUncheckedUpdateManyWithoutStudentInput>
  }

  export type VocabProgressScalarWhereInput = {
    AND?: VocabProgressScalarWhereInput | VocabProgressScalarWhereInput[]
    OR?: VocabProgressScalarWhereInput[]
    NOT?: VocabProgressScalarWhereInput | VocabProgressScalarWhereInput[]
    id?: StringFilter<"VocabProgress"> | string
    studentId?: StringFilter<"VocabProgress"> | string
    level?: StringFilter<"VocabProgress"> | string
    stageIndex?: IntFilter<"VocabProgress"> | number
    completions?: IntFilter<"VocabProgress"> | number
    perfectClears?: IntFilter<"VocabProgress"> | number
    highestScore?: IntFilter<"VocabProgress"> | number
    mode?: StringFilter<"VocabProgress"> | string
    lastPlayedAt?: DateTimeFilter<"VocabProgress"> | Date | string
  }

  export type MessageCreateWithoutTeacherInput = {
    id?: string
    sender: string
    text: string
    time?: Date | string
    read?: boolean
    student: StudentCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutTeacherInput = {
    id?: string
    studentId: string
    sender: string
    text: string
    time?: Date | string
    read?: boolean
  }

  export type MessageCreateOrConnectWithoutTeacherInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutTeacherInput, MessageUncheckedCreateWithoutTeacherInput>
  }

  export type MessageCreateManyTeacherInputEnvelope = {
    data: MessageCreateManyTeacherInput | MessageCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutTeacherInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutTeacherInput, MessageUncheckedUpdateWithoutTeacherInput>
    create: XOR<MessageCreateWithoutTeacherInput, MessageUncheckedCreateWithoutTeacherInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutTeacherInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutTeacherInput, MessageUncheckedUpdateWithoutTeacherInput>
  }

  export type MessageUpdateManyWithWhereWithoutTeacherInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutTeacherInput>
  }

  export type StudentCreateWithoutSchedulesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutSchedulesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutSchedulesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutSchedulesInput, StudentUncheckedCreateWithoutSchedulesInput>
  }

  export type StudentUpsertWithoutSchedulesInput = {
    update: XOR<StudentUpdateWithoutSchedulesInput, StudentUncheckedUpdateWithoutSchedulesInput>
    create: XOR<StudentCreateWithoutSchedulesInput, StudentUncheckedCreateWithoutSchedulesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutSchedulesInput, StudentUncheckedUpdateWithoutSchedulesInput>
  }

  export type StudentUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutRecordsInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutRecordsInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutRecordsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
  }

  export type StudentUpsertWithoutRecordsInput = {
    update: XOR<StudentUpdateWithoutRecordsInput, StudentUncheckedUpdateWithoutRecordsInput>
    create: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutRecordsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutRecordsInput, StudentUncheckedUpdateWithoutRecordsInput>
  }

  export type StudentUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutTestScoresInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTestScoresInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTestScoresInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
  }

  export type StudentUpsertWithoutTestScoresInput = {
    update: XOR<StudentUpdateWithoutTestScoresInput, StudentUncheckedUpdateWithoutTestScoresInput>
    create: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTestScoresInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTestScoresInput, StudentUncheckedUpdateWithoutTestScoresInput>
  }

  export type StudentUpdateWithoutTestScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTestScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TeacherCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    status?: string
    role?: string
    bio?: string | null
    joinDate: string
    rating?: number | null
    loginId?: string | null
    password?: string | null
  }

  export type TeacherUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    status?: string
    role?: string
    bio?: string | null
    joinDate: string
    rating?: number | null
    loginId?: string | null
    password?: string | null
  }

  export type TeacherCreateOrConnectWithoutMessagesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutMessagesInput, TeacherUncheckedCreateWithoutMessagesInput>
  }

  export type StudentCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutMessagesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutMessagesInput, StudentUncheckedCreateWithoutMessagesInput>
  }

  export type TeacherUpsertWithoutMessagesInput = {
    update: XOR<TeacherUpdateWithoutMessagesInput, TeacherUncheckedUpdateWithoutMessagesInput>
    create: XOR<TeacherCreateWithoutMessagesInput, TeacherUncheckedCreateWithoutMessagesInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutMessagesInput, TeacherUncheckedUpdateWithoutMessagesInput>
  }

  export type TeacherUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    loginId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeacherUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    loginId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentUpsertWithoutMessagesInput = {
    update: XOR<StudentUpdateWithoutMessagesInput, StudentUncheckedUpdateWithoutMessagesInput>
    create: XOR<StudentCreateWithoutMessagesInput, StudentUncheckedCreateWithoutMessagesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutMessagesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutMessagesInput, StudentUncheckedUpdateWithoutMessagesInput>
  }

  export type StudentUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutInvoicesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutInvoicesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutInvoicesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutInvoicesInput, StudentUncheckedCreateWithoutInvoicesInput>
  }

  export type StudentUpsertWithoutInvoicesInput = {
    update: XOR<StudentUpdateWithoutInvoicesInput, StudentUncheckedUpdateWithoutInvoicesInput>
    create: XOR<StudentCreateWithoutInvoicesInput, StudentUncheckedCreateWithoutInvoicesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutInvoicesInput, StudentUncheckedUpdateWithoutInvoicesInput>
  }

  export type StudentUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutVocabProgressesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutVocabProgressesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutVocabProgressesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutVocabProgressesInput, StudentUncheckedCreateWithoutVocabProgressesInput>
  }

  export type StudentUpsertWithoutVocabProgressesInput = {
    update: XOR<StudentUpdateWithoutVocabProgressesInput, StudentUncheckedUpdateWithoutVocabProgressesInput>
    create: XOR<StudentCreateWithoutVocabProgressesInput, StudentUncheckedCreateWithoutVocabProgressesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutVocabProgressesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutVocabProgressesInput, StudentUncheckedUpdateWithoutVocabProgressesInput>
  }

  export type StudentUpdateWithoutVocabProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutVocabProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutGrammarProgressesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarMasteries?: GrammarMasteryCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutGrammarProgressesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarMasteries?: GrammarMasteryUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutGrammarProgressesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutGrammarProgressesInput, StudentUncheckedCreateWithoutGrammarProgressesInput>
  }

  export type StudentUpsertWithoutGrammarProgressesInput = {
    update: XOR<StudentUpdateWithoutGrammarProgressesInput, StudentUncheckedUpdateWithoutGrammarProgressesInput>
    create: XOR<StudentCreateWithoutGrammarProgressesInput, StudentUncheckedCreateWithoutGrammarProgressesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutGrammarProgressesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutGrammarProgressesInput, StudentUncheckedUpdateWithoutGrammarProgressesInput>
  }

  export type StudentUpdateWithoutGrammarProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarMasteries?: GrammarMasteryUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutGrammarProgressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarMasteries?: GrammarMasteryUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type GrammarMasteryCreateWithoutGrammarPointInput = {
    id?: string
    status?: string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutGrammarMasteriesInput
  }

  export type GrammarMasteryUncheckedCreateWithoutGrammarPointInput = {
    id?: string
    studentId: string
    status?: string
    updatedAt?: Date | string
  }

  export type GrammarMasteryCreateOrConnectWithoutGrammarPointInput = {
    where: GrammarMasteryWhereUniqueInput
    create: XOR<GrammarMasteryCreateWithoutGrammarPointInput, GrammarMasteryUncheckedCreateWithoutGrammarPointInput>
  }

  export type GrammarMasteryCreateManyGrammarPointInputEnvelope = {
    data: GrammarMasteryCreateManyGrammarPointInput | GrammarMasteryCreateManyGrammarPointInput[]
    skipDuplicates?: boolean
  }

  export type GrammarMasteryUpsertWithWhereUniqueWithoutGrammarPointInput = {
    where: GrammarMasteryWhereUniqueInput
    update: XOR<GrammarMasteryUpdateWithoutGrammarPointInput, GrammarMasteryUncheckedUpdateWithoutGrammarPointInput>
    create: XOR<GrammarMasteryCreateWithoutGrammarPointInput, GrammarMasteryUncheckedCreateWithoutGrammarPointInput>
  }

  export type GrammarMasteryUpdateWithWhereUniqueWithoutGrammarPointInput = {
    where: GrammarMasteryWhereUniqueInput
    data: XOR<GrammarMasteryUpdateWithoutGrammarPointInput, GrammarMasteryUncheckedUpdateWithoutGrammarPointInput>
  }

  export type GrammarMasteryUpdateManyWithWhereWithoutGrammarPointInput = {
    where: GrammarMasteryScalarWhereInput
    data: XOR<GrammarMasteryUpdateManyMutationInput, GrammarMasteryUncheckedUpdateManyWithoutGrammarPointInput>
  }

  export type StudentCreateWithoutGrammarMasteriesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressCreateNestedManyWithoutStudentInput
    invoices?: InvoiceCreateNestedManyWithoutStudentInput
    records?: LessonRecordCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleCreateNestedManyWithoutStudentInput
    messages?: MessageCreateNestedManyWithoutStudentInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutGrammarMasteriesInput = {
    id?: string
    name: string
    email: string
    course: string
    status?: string
    lastLesson?: string | null
    progress?: number
    loginId: string
    password: string
    level?: number
    target?: string | null
    phone?: string | null
    joinDate?: string | null
    totalLessons?: number
    internalNote?: string | null
    toeicScore?: string | null
    cefr?: string | null
    vocabScore?: number | null
    grammarScore?: number | null
    listeningScore?: number | null
    speakingScore?: number | null
    goalTarget?: string | null
    goalProgress?: number | null
    biography?: string | null
    occupation?: string | null
    avatarUrl?: string | null
    coverUrl?: string | null
    questLevel?: number
    questXP?: number
    questStreak?: number
    lastQuestPlayedAt?: Date | string | null
    grammarProgresses?: GrammarProgressUncheckedCreateNestedManyWithoutStudentInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutStudentInput
    records?: LessonRecordUncheckedCreateNestedManyWithoutStudentInput
    schedules?: LessonScheduleUncheckedCreateNestedManyWithoutStudentInput
    messages?: MessageUncheckedCreateNestedManyWithoutStudentInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    vocabProgresses?: VocabProgressUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutGrammarMasteriesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutGrammarMasteriesInput, StudentUncheckedCreateWithoutGrammarMasteriesInput>
  }

  export type GrammarPointCreateWithoutMasteriesInput = {
    id?: string
    label: string
    category: string
    order?: number
  }

  export type GrammarPointUncheckedCreateWithoutMasteriesInput = {
    id?: string
    label: string
    category: string
    order?: number
  }

  export type GrammarPointCreateOrConnectWithoutMasteriesInput = {
    where: GrammarPointWhereUniqueInput
    create: XOR<GrammarPointCreateWithoutMasteriesInput, GrammarPointUncheckedCreateWithoutMasteriesInput>
  }

  export type StudentUpsertWithoutGrammarMasteriesInput = {
    update: XOR<StudentUpdateWithoutGrammarMasteriesInput, StudentUncheckedUpdateWithoutGrammarMasteriesInput>
    create: XOR<StudentCreateWithoutGrammarMasteriesInput, StudentUncheckedCreateWithoutGrammarMasteriesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutGrammarMasteriesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutGrammarMasteriesInput, StudentUncheckedUpdateWithoutGrammarMasteriesInput>
  }

  export type StudentUpdateWithoutGrammarMasteriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUpdateManyWithoutStudentNestedInput
    messages?: MessageUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutGrammarMasteriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lastLesson?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: IntFieldUpdateOperationsInput | number
    loginId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    target?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: NullableStringFieldUpdateOperationsInput | string | null
    totalLessons?: IntFieldUpdateOperationsInput | number
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    toeicScore?: NullableStringFieldUpdateOperationsInput | string | null
    cefr?: NullableStringFieldUpdateOperationsInput | string | null
    vocabScore?: NullableIntFieldUpdateOperationsInput | number | null
    grammarScore?: NullableIntFieldUpdateOperationsInput | number | null
    listeningScore?: NullableIntFieldUpdateOperationsInput | number | null
    speakingScore?: NullableIntFieldUpdateOperationsInput | number | null
    goalTarget?: NullableStringFieldUpdateOperationsInput | string | null
    goalProgress?: NullableIntFieldUpdateOperationsInput | number | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    questLevel?: IntFieldUpdateOperationsInput | number
    questXP?: IntFieldUpdateOperationsInput | number
    questStreak?: IntFieldUpdateOperationsInput | number
    lastQuestPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grammarProgresses?: GrammarProgressUncheckedUpdateManyWithoutStudentNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutStudentNestedInput
    records?: LessonRecordUncheckedUpdateManyWithoutStudentNestedInput
    schedules?: LessonScheduleUncheckedUpdateManyWithoutStudentNestedInput
    messages?: MessageUncheckedUpdateManyWithoutStudentNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    vocabProgresses?: VocabProgressUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type GrammarPointUpsertWithoutMasteriesInput = {
    update: XOR<GrammarPointUpdateWithoutMasteriesInput, GrammarPointUncheckedUpdateWithoutMasteriesInput>
    create: XOR<GrammarPointCreateWithoutMasteriesInput, GrammarPointUncheckedCreateWithoutMasteriesInput>
    where?: GrammarPointWhereInput
  }

  export type GrammarPointUpdateToOneWithWhereWithoutMasteriesInput = {
    where?: GrammarPointWhereInput
    data: XOR<GrammarPointUpdateWithoutMasteriesInput, GrammarPointUncheckedUpdateWithoutMasteriesInput>
  }

  export type GrammarPointUpdateWithoutMasteriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type GrammarPointUncheckedUpdateWithoutMasteriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type GrammarProgressCreateManyStudentInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    lastPlayedAt?: Date | string
  }

  export type GrammarMasteryCreateManyStudentInput = {
    id?: string
    grammarPointId: string
    status?: string
    updatedAt?: Date | string
  }

  export type InvoiceCreateManyStudentInput = {
    id?: string
    planName: string
    amount: number
    dueDate: string
    status?: string
    createdAt?: Date | string
  }

  export type LessonRecordCreateManyStudentInput = {
    id?: string
    lessonId?: string | null
    date: string
    teacher: string
    title: string
    feedback: string
    nextScope?: string | null
    importantExpressions?: string | null
    homework?: string | null
    internalNote?: string | null
    grammar?: number
    vocab?: number
    pronunciation?: number
    fluency?: number
  }

  export type LessonScheduleCreateManyStudentInput = {
    id?: string
    studentName: string
    teacherName: string
    date: string
    time: string
    duration: string
    course: string
    type: string
    status?: string
    tags?: string | null
    meetingPassword?: string | null
    meetingUrl?: string | null
  }

  export type MessageCreateManyStudentInput = {
    id?: string
    teacherId?: string | null
    sender: string
    text: string
    time?: Date | string
    read?: boolean
  }

  export type TestScoreCreateManyStudentInput = {
    id?: string
    type: string
    testName: string
    date: string
    grade?: string | null
    score: string
    totalScore?: string | null
    trend?: string
    createdAt?: Date | string
  }

  export type VocabProgressCreateManyStudentInput = {
    id?: string
    level: string
    stageIndex: number
    completions?: number
    perfectClears?: number
    highestScore?: number
    mode?: string
    lastPlayedAt?: Date | string
  }

  export type GrammarProgressUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarProgressUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarProgressUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarMasteryUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grammarPoint?: GrammarPointUpdateOneRequiredWithoutMasteriesNestedInput
  }

  export type GrammarMasteryUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    grammarPointId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarMasteryUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    grammarPointId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    dueDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonRecordUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
  }

  export type LessonRecordUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
  }

  export type LessonRecordUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lessonId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    teacher?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    feedback?: StringFieldUpdateOperationsInput | string
    nextScope?: NullableStringFieldUpdateOperationsInput | string | null
    importantExpressions?: NullableStringFieldUpdateOperationsInput | string | null
    homework?: NullableStringFieldUpdateOperationsInput | string | null
    internalNote?: NullableStringFieldUpdateOperationsInput | string | null
    grammar?: IntFieldUpdateOperationsInput | number
    vocab?: IntFieldUpdateOperationsInput | number
    pronunciation?: IntFieldUpdateOperationsInput | number
    fluency?: IntFieldUpdateOperationsInput | number
  }

  export type LessonScheduleUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonScheduleUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonScheduleUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentName?: StringFieldUpdateOperationsInput | string
    teacherName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    meetingPassword?: NullableStringFieldUpdateOperationsInput | string | null
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    teacher?: TeacherUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestScoreUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    score?: StringFieldUpdateOperationsInput | string
    totalScore?: NullableStringFieldUpdateOperationsInput | string | null
    trend?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabProgressUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabProgressUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabProgressUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    stageIndex?: IntFieldUpdateOperationsInput | number
    completions?: IntFieldUpdateOperationsInput | number
    perfectClears?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    lastPlayedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyTeacherInput = {
    id?: string
    studentId: string
    sender: string
    text: string
    time?: Date | string
    read?: boolean
  }

  export type MessageUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
    student?: StudentUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GrammarMasteryCreateManyGrammarPointInput = {
    id?: string
    studentId: string
    status?: string
    updatedAt?: Date | string
  }

  export type GrammarMasteryUpdateWithoutGrammarPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutGrammarMasteriesNestedInput
  }

  export type GrammarMasteryUncheckedUpdateWithoutGrammarPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrammarMasteryUncheckedUpdateManyWithoutGrammarPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}