import type { NextApiRequest, NextApiResponse } from 'next'

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const assert = require('assert')

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result = [];
  const mongouri = process.env.NEXT_PUBLIC_MONGO_STRING
  
  {/* @ts-ignore */} // 一旦ts無視
  MongoClient.connect(mongouri, async (err, client) => {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db('upbond')
    result = await getDocuments(db)
    {/* @ts-ignore */} // 一旦ts無視
    res.status(200).json({resultArray: result})
  })
}

{/* @ts-ignore */} // 一旦ts無視
const getDocuments = async (db) => {
  const test = await db.collection("tobishima-test").find().toArray();
  console.log("🚀 ~ file: hello.ts ~ line 16 ~ getDocuments ~ test", test)
  return test;
  // db.collection("tobishima-test").find().toArray(function(err, result) {
  //   if (err) throw err;
  //   return result;
  // });
}