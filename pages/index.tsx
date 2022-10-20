import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
const ExcelJS = require('exceljs');
import { Modal, Button, Group } from '@mantine/core';
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from 'react-signature-canvas';
import * as htmlToImage from 'html-to-image';
import ReactSignatureCanvas from "react-signature-canvas";
import pointGroupArray from "react-signature-canvas";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [opened, setOpened] = useState(false);
  const canvasRef = useRef<ReactSignatureCanvas | null>();
  const [imageUrl, setImageUrl] = useState('');
  const [index, setIndex] = useState(new Array());
  const [successMessage, setSuccessMessage] = useState('');
  
  const getIndex = async () => {
    const response = await fetch("/api/getIndex");
    const data = await response.json();
    console.log("🚀 ~ file: index.tsx ~ line 23 ~ getIndex ~ data", data)
    setIndex(data.resultArray)
  }

  const saveImage = async () => {
    // const tttt = document.getElementById('test-image-canvas') as HTMLCanvasElement;
    // htmlToImageはios safariで動かなかったため使用しない
    // htmlToImage.toPng(tttt).then(async function (dataUrl) {
    //   // 成功時に実行したい処理を記述する
    //   // 私の場合はダウンロード処理を実行
    //   const a = document.createElement('a')
    //   a.download = 'Image.png';
    //   console.log(1234, dataUrl);
    //   // a.href = dataUrl;
    //   // a.click();
    //   setImageUrl(dataUrl);
    //   const response = await fetch("/api/hello", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       imgSrc: dataUrl
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // });
    const response = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({
        imgSrc: imageUrl
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    (canvasRef.current as pointGroupArray).clear();// キャンバスのクリア
    setOpened(false);
    setSuccessMessage('画像を送信しました');
  }
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => {setOpened(false);setSuccessMessage('')}}
      >
        <div className={styles.canavs} id="test-image-canvas">
          <SignatureCanvas
            ref={(ref) => {
              canvasRef.current = ref;
            }}
            canvasProps={{ width: 350, height: 216.32}}
            penColor='black'
            backgroundColor="white"
            onEnd={() => {
              setImageUrl((canvasRef.current as pointGroupArray).toDataURL());
            }}
          />
        </div>
        <button className={styles.save_button} onClick={saveImage}>Save</button>
      </Modal>

      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>
        <br/>
        {successMessage && (
          <p>{successMessage}</p>
        )}
        {imageUrl && (
          <p>{imageUrl}</p>
        )}
        <Link href={`/exportexcel`} passHref>
          <a>excel出力ページに移動</a>
        </Link>
        <br/>
        <Link href={`/parsecss`} passHref>
          <a>パース動的cssサンプルに移動</a>
        </Link>
        <br/>
        <button onClick={getIndex}>一覧を取得する</button>
        {index.length > 0 && (
          <>
            <table border={1} className={styles.table_contents}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>image</th>
                </tr>
              </thead>
              <tbody>
                {index.map((i, indexForkey) => (
                  <tr key={indexForkey}>
                    <td>{i.id}</td>
                    <td>
                      <img src={i.img_src} alt="img" width={150} height={100} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
