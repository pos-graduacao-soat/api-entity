import { MongoClient } from 'mongodb'
import { env } from '../../main/env'

export class MongoDbClient {
  private static instance: MongoClient

  static async getInstance(): Promise<MongoClient> {
    if (!this.instance) {
      this.instance = await MongoClient.connect(env.mongoUrl)
    }

    return this.instance
  }
}