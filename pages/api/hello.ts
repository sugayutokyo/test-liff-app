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
  console.log("🚀 ~ file: hello.ts ~ line 16 ~ req", req)
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db('upbond')
    insertDocuments(db, req.body.imgSrc)
  })

  res.status(200).json({ name: 'John Doe' })
}

const insertDocuments = (db, imgsrc) => {
  const document = { id: Math.floor(Math.random() * 1000), img_src: imgsrc };
  db.collection('tobishima-test').insertMany([document], (err, result) => {
      console.log("🚀 ~ file: hello.ts ~ line 34 ~ db.collection ~ result", result)
      console.log("Inserted 3 documents into the collection")
  })
}