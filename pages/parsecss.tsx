import React, { useState } from 'react';
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Image from 'next/image';
import styles from "../styles/Parsecss.module.css";
import Select, { SingleValue } from "react-select";

const parsecss: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [percent, setPercent] = useState(0);
  let maeBackgroundcss = '';
  const options = [
    { value: 0, label: "0%" },
    { value: 20, label: "20%" },
    { value: 50, label: "50%" },
    { value: 100, label: "100%" },
  ];

  switch (percent) {
    case 0:
      maeBackgroundcss = `${styles.maeBackground} ${styles.linear0}`;
      break;
    case 20:
      maeBackgroundcss = `${styles.maeBackground} ${styles.linear20}`;
      break;
    case 50:
      maeBackgroundcss = `${styles.maeBackground} ${styles.linear50}`;
      break;
    default:
      break;
  }

  const handlePercent = (e: SingleValue<{ value: number; label: string; }>) => {
    if (e != null) {
      setPercent(e.value);
    }
  }
  return (
    <div>
      <div className={styles.contents}>
        <Image src='/img/test_koji.jpeg' alt='logo' width={300} height={300}/>
        <div className={maeBackgroundcss}></div>
      </div>
      <Select options={options} defaultValue={{value: 0, label: "0%"}} onChange={(t) => handlePercent(t)} className={styles.selcetbox}/>
    </div>
  )
}

export default parsecss