import { MongooseModuleOptions } from '@nestjs/mongoose'
require('dotenv').config()

export const mongooseUri: string = process.env.MONGODB_URI

export const mongooseConfig: MongooseModuleOptions = {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DBNAME,
    retryWrites: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}