// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const mongouri = process.env.NEXT_PUBLIC_MONGO_STRING
  {/* @ts-ignore */} // 一旦ts無視
  MongoClient.connect(mongouri, (err, client) => {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db('upbond')
    insertDocuments(db, req.body.imgSrc)
  })

  res.status(200).json({ name: 'John Doe' })
}

{/* @ts-ignore */} // 一旦ts無視
const insertDocuments = (db, imgsrc) => {
  const document = { id: Math.floor(Math.random() * 1000), img_src: imgsrc };
  {/* @ts-ignore */} // 一旦ts無視
  db.collection('tobishima-test').insertMany([document], (err, result) => {
      console.log("🚀 ~ file: hello.ts ~ line 34 ~ db.collection ~ result", result)
      console.log("Inserted 3 documents into the collection")
  })
}