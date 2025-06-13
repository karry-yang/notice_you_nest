import { Db, Collection, Filter, InsertOneResult, Document, OptionalUnlessRequiredId } from 'mongodb';

export interface IMongoDBService {
  /**
   * 获取指定名称的 MongoDB 集合实例。
   * @param name 集合名称
   * @returns 对应名称的 Collection<T> 实例，可用于操作该集合
   */
  getCollection<T extends Document>(name: string): Collection<T>;

  /**
   * 获取当前数据库实例（Db）。
   * @returns MongoDB 数据库实例
   */
  getDb(): Db;

  /**
   * 在指定集合中查找符合条件的一条文档。
   * @param collectionName 集合名称
   * @param query 查询条件，支持 MongoDB 的 Filter 语法
   * @returns 匹配到的文档对象或 null
   */
  findOne<T extends Document>(collectionName: string, query: Filter<T>): Promise<T | null>;

  /**
   * 向指定集合插入一条文档。
   * @param collectionName 集合名称
   * @param doc 要插入的文档对象，可自动生成或自定义 _id
   * @returns 插入操作的结果对象，包含 acknowledged 和 insertedId
   */
  insertOne<T extends Document>(collectionName: string, doc: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>>;
}
