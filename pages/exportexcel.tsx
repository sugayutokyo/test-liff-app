import React from 'react';
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
const ExcelJS = require('exceljs');

const exportexcel: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [createdUrl, setCreatedUrl] = React.useState('');
  const exportExcelTest = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Workbookの作成
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sugayutokyo';
    workbook.created = new Date(1985, 8, 30);
    // Workbookに新しいWorksheetを追加
    workbook.addWorksheet('My Sheet');
    // ↑で追加したWorksheetを参照し変数に代入
    const worksheet = workbook.getWorksheet('My Sheet');
    // カラムのwidthを全て2にする
    const numToAdustColumn = 100; // widthを調整したいカラム数
    for (let i = 1; i < numToAdustColumn; i++) {
      const nameCol = worksheet.getColumn(i);
      nameCol.width = 14;
    }
    worksheet.pageSetup.paperSize = 8; // A3 size

    // ヘッダー
    worksheet.getCell("B2").font = {
      name: 'MSゴシック',
      size: 16,
      bold: true
    };
    worksheet.getCell("B2").value = "工事・安全衛生日誌 兼 環境・品質日誌";
    worksheet.getCell("CQ2").value = "天候";
    worksheet.getCell("CQ3").value = "晴れ";

    worksheet.getCell("F4").font = {
      name: 'MSゴシック',
      size: 14
    };
    worksheet.mergeCells('B4:H4');
    worksheet.mergeCells('J4:K4');
    worksheet.getCell('B4').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('B6').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("B4").value = "前日記入";

    worksheet.getCell('C4', 'C6').border = {
      top: {style:'thin'},
      left: {style:'dotted'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };

    worksheet.addTable({
      name: '前日記入',
      ref: 'B5',
      headerRow: true,
      // style: {
      //   theme: 'TableStyleDark3',
      //   showRowStripes: true,
      // },
      columns: [
        {name: '業者名'},
        {name: '受理者'},
        {name: '予定人員'},
        {name: 'No.'},
        {name: '予定工事'},
        {name: '責任者'},
        {name: '名称'},
        {name: '選任・資格者'},
        {name: '手順No'},
        {name: '安全衛生指示事項'},
      ],
      rows: [
        [
          '千代田建設', // 業者名
          '田中', // 受理者
          5, // 予定人員
          1, // No.
          'Ａ工区5階部外部足場組み立て', // 予定工事
          '田中', // 責任者
          '主', // 名称
          '田中', // 選任・資格者
          1, // 手順No
          '板付き布枠に乗って枠を運び組立てるとき\nバランスを崩して墜落しない様に\n親綱を先行設置し安全帯を確実に使用の事' // 安全衛生指示事項
        ],
      ],
    });
    // UInt8Arrayを生成
    const uint8Array = await workbook.xlsx.writeBuffer();
    // Blob
    const blob = new Blob([uint8Array], {type: 'application/octet-binary'});
    const url = window.URL.createObjectURL(blob);
    setCreatedUrl(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample.xlsx`;
    a.click();
    // ダウンロード後は不要なのでaタグを除去
    a.remove()
  } 
  return (
    <div>
      <button onClick={(e) => exportExcelTest(e)}>excel 出力</button>
      {createdUrl && <div>{createdUrl}</div>}
      {liff && <div>Liff ok</div>}
      {liffError && <div>Liff Error</div>}
    </div>
  )
}

export default exportexcel