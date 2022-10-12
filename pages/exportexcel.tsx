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
    // add image to workbook by base64
    const myBase64Image = "data:image/png;base64,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";
    const imageId2 = workbook.addImage({
      base64: myBase64Image,
      extension: 'png',
    });
    worksheet.getCell('B9').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("B9").value = "統責者サイン";
    worksheet.mergeCells('B9:B10');
    worksheet.mergeCells('C9:C10');
    worksheet.addImage(imageId2,  {
      tl: { col: 2.3, row: 8.1 },
      ext: { width: 56.63, height: 35 }
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