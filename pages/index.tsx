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
import UseSWRTest from "../components/UseSWRTest";

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

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      // 取得成功した場合
      (position) => {
        alert("緯度:" + position.coords.latitude+",経度"+ position.coords.longitude);
      },
      // 取得失敗した場合
      function(error) {
        switch(error.code) {
          case 1: //PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: //POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: //TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("その他のエラー(エラーコード:"+error.code+")");
            break;
        }
      }
    );
  }

  const shareTargetPicker = () => {
    liff?.shareTargetPicker([{
      'type': 'text',
      'text': 'Hello, World! from SHare Target Picker App...'
    }]).then(() => {
      alert(liff.getAId());
      alert(liff.id);
    });
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
        <br/>
        {successMessage && (
          <p>{successMessage}</p>
        )}
        {imageUrl && (
          <p>{imageUrl}</p>
        )}
        <Link href={`/exportexcel`} passHref>
          <button className={styles.button}>excel出力ページに移動</button>
        </Link>
        <br/>
        <Link href={`/parsecss`} passHref>
          <button className={styles.button}>パース動的cssサンプルに移動</button>
        </Link>
        <br/>
        <button onClick={getLocation} className={styles.button}>位置情報を取得する</button>
        <br/>
        <button onClick={getIndex} className={styles.button}>一覧を取得する</button>
        <br/>
        <button onClick={shareTargetPicker} className={styles.button}>shareTargetPicker</button>
        <br/>
        <UseSWRTest />
        <a className={styles.button} href="https://line.me/ti/p/5A9GSJ5z9D">監督(佐藤さん)をLINEに追加する</a>
        <br/>
        <a className={styles.button} href="https://line.me/ti/g/yG2w5bkeW5">グループラインに参加する</a>
        <br/>
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
