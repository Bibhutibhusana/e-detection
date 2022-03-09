import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { EChallan } from 'src/app/layout/modules/vehicle-details/models/echallan';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleDetails } from 'src/app/layout/modules/vehicle-details/models/vehicle-details';

const getFileName = (name: string) => {
  let timeSpan = new Date().toISOString();
  let sheetName = name || 'ExportResult';
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName,
  };
};

@Injectable({
  providedIn: 'root',
})
export class TableUtils {
  constructor() {}
  exportArrayToExcel(arr: any[], name: string) {
    let { sheetName, fileName } = getFileName(name);

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  exportToPDF(printContents: any) {
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin!.document.open();
    popupWin!.document.write(`
  <html>
    <head>
      <title>Print tab</title>

    </head>
<body onload="window.print();window.close()"><table class="table table-bordered">${printContents}</table></body>
  </html>`);
    popupWin!.document.close();
  }

  exportIssuedChallanToPDf(arr: any[], name: string) {
    let arrayList: any[][] = [];
    console.log(arr);
    // let header = [Object.keys(arr[0])];
    // arr.forEach((data,value) =>{
    //       arrayList.push(Object.values(data))
    //   })

    let header = [
      [
        'id',
        'vehicleNo',
        'vtClass',
        'vhClass',
        'transactionDate',
        'opDate',
        'taxupto',
        'fitupto',
        'insupto',
        'nonusestat',
        'challanNo',
      ],
    ];
    let prepare: any[][] = [];
    arr.forEach((e) => {
      var tempObj = [];
      tempObj.push(e.id);
      tempObj.push(e.vehicleNo);
      tempObj.push(e.vtClass);
      tempObj.push(e.vhClass);
      let transactionDate = new DatePipe('en-US').transform(
        e.transactionDate,
        'dd-MM-YY hh:mm'
      );
      tempObj.push(transactionDate);
      let opDt = new DatePipe('en-US').transform(e.opDate, 'dd-MM-YY hh:mm');
      tempObj.push(opDt);
      tempObj.push(e.taxUpto);
      tempObj.push(e.fitUpto);
      tempObj.push(e.nonUseStat);
      tempObj.push(e.insUpto);
      tempObj.push(e.challanNo);
      prepare.push(tempObj);
    });
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt' });
    pdf.setFont('helvetica');
    pdf.setFont('bold');
    pdf.setFontSize(24);
    (pdf as any).autoTable({
      head: header,
      body: prepare,
    });
    pdf.save('challan-list' + '.pdf');
  }

  exportVehicleDetailsToPDF(arr: any[]) {
    let arrayList: any[][] = [];
    let header = [
      [
        'id',
        'vehicleNo',
        'vtClass',
        'vhClass',
        'transactionDate',
        'taxupto',
        'fitupto',
        'insupto',
        'nonusestat'
      ],
    ];
    let prepare: any[][] = [];
    arr.forEach((e) => {
      var tempObj = [];
      tempObj.push(e.id);
      tempObj.push(e.vehicleNo);
      tempObj.push(e.vtClass);
      tempObj.push(e.vhClass);
      let transactionDate = new DatePipe('en-US').transform(
        e.transactionDate,
        'dd-MM-YY hh:mm'
      );
      tempObj.push(transactionDate);
      let taxUpto = new DatePipe('en-US').transform(e.taxUpto, 'dd-MM-YY hh:mm');
      tempObj.push(taxUpto);
      let fitUpto = new DatePipe('en-US').transform(e.fitUpto, 'dd-MM-YY hh:mm');
      tempObj.push(fitUpto);
      let insUpto = new DatePipe('en-US').transform(e.insUpto, 'dd-MM-YY hh:mm');
      tempObj.push(insUpto);
      tempObj.push(e.nonUseStat);

      prepare.push(tempObj);
    });
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt' });
    pdf.setFont('helvetica');
    pdf.setFont('bold');
    pdf.setFontSize(24);
    (pdf as any).autoTable({
      head: header,
      body: prepare,
    });
    pdf.save('challan-list' + '.pdf');
  }

  exportArrayToCsv(arr: any[], name: string) {
    let { sheetName, fileName } = getFileName(name);

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
