import { MongoClient } from 'mongodb'

export class MongoClinet {
  private static instance: MongoClient

  private constructor() { }

  static async getInstance(): Promise<MongoClient> {
    if (!MongoClinet.instance) {
      MongoClinet.instance = await MongoClient.connect('mongodb://localhost:27017', {


      })
    }
    return MongoClinet.instance
  }
}