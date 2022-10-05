import React from 'react';
const ExcelJS = require('exceljs');

const exportexcel = () => {
  const exportExcelTest = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Workbookの作成
    const workbook = new ExcelJS.Workbook();
    // Workbookに新しいWorksheetを追加
    workbook.addWorksheet('My Sheet');
    // ↑で追加したWorksheetを参照し変数に代入
    const worksheet = workbook.getWorksheet('My Sheet');
    // 列を定義
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: '名称', key: 'name' },
      { header: '価格', key: 'price' },
    ];
    // 行を定義
    worksheet.addRow({id: 1001, name: 'みかん', price: 170});
    worksheet.addRow({id: 1002, name: 'バナナ', price: 200});
    worksheet.addRow({id: 1003, name: 'りんご', price: 260});
    worksheet.addRow({id: 1004, name: 'トマト', price: 190});
    // UInt8Arrayを生成
    const uint8Array = await workbook.xlsx.writeBuffer();
    // Blob
    const blob = new Blob([uint8Array], {type: 'application/octet-binary'});
    const url = window.URL.createObjectURL(blob);
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
    </div>
  )
}

export default exportexcel