import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
const ExcelJS = require('exceljs');
import { Modal, Button, Group } from '@mantine/core';
import { useState } from "react";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [opened, setOpened] = useState(false);
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
        <div>test modal</div>
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
