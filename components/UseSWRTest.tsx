import React from 'react'
import useSWR from 'swr'
const fetcher = (url: string): Promise<any> => fetch(url, {headers: {
  'bote-api-key': 'abc'
}}).then(res => res.json());

const UseSWRTest = () => {
  const { data, error } = useSWR('https://loyalty.dev.upbond.io/v1/store_search/allstores', fetcher)
  console.log("🚀 ~ file: index.tsx ~ line 22 ~ data", data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    // <div>teetet</div>
    <div>
    {data.data.map((store: any, index: number) => {
      if (index>=  3) {
        return;
      }
      return <div>{store.area}</div>
    })}
    </div>
  )
}

export default UseSWRTest