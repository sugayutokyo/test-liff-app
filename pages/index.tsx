import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
const ExcelJS = require('exceljs');
import { Modal, Button, Group } from '@mantine/core';
import { useState } from "react";
import SignatureCanvas from 'react-signature-canvas';
import * as htmlToImage from 'html-to-image';

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [opened, setOpened] = useState(false);
  const saveImage = () => {
    const tttt = document.getElementById('test-image-canvas') as HTMLCanvasElement;
    htmlToImage.toSvg(tttt).then(function (dataUrl) {
      // 成功時に実行したい処理を記述する
      // 私の場合はダウンロード処理を実行
      const a = document.createElement('a')
      a.download = 'Image.svg';
      a.href = dataUrl;
      a.click();
    });
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
        onClose={() => setOpened(false)}
      >
        <div className={styles.canavs} id="test-image-canvas">
          <SignatureCanvas
            penColor='green'
            canvasProps={{ width: 400, height: 300 }}
          />
        </div>
        <div className="save-button">
          <button onClick={saveImage}>Save</button>
        </div>
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
        <Link href={`/exportexcel`} passHref>
          <a>excel出力ページに移動</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
