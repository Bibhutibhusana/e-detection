import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/alert/alert.service';
import { EChallan } from '../../vehicle-details/models/echallan';
import { EchallanService } from '../../vehicle-details/service/echallan.service';
import * as XLSX from 'xlsx';
import { TableUtils } from 'src/app/common/utils/table-utils';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/login/user';

@Component({
  selector: 'app-issued-echallans',
  templateUrl: './issued-echallans.component.html',
  styleUrls: ['./issued-echallans.component.css'],
})
export class IssuedEchallansComponent implements OnInit {
  displayedColumns = [
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
    'challanIssueDate'
  ];
  dataSource: MatTableDataSource<EChallan> = new MatTableDataSource<EChallan>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('TABLE') table!: ElementRef;

  echallanList: Array<EChallan> = [];
  echallan: EChallan = new EChallan();
  fromDate!: Date;
  toDate!: Date;
  showView: boolean = false;
  isChallanIssued: boolean = true;
  echallans: Array<EChallan> = [];
  challanNo!: string;
  challanIssueDate!: Date;
  user = new UserLogin();
  constructor(
    private echallanService: EchallanService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private tableUtils: TableUtils,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getLoggedInUser();
    this.reloadData();
  }

  reloadData() {
    this.echallanService.getEChallanList().subscribe((data: any) => {
      this.echallanList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  toShowView() {
    this.showView = !this.showView;
  }
  public doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showDate(toDate: any) {
    this.showView = true;
    let fromDt = this.datePipe.transform(this.fromDate, 'dd-MM-YYYY');
    let toDt = this.datePipe.transform(toDate, 'dd-MM-YYYY');
    console.log(fromDt, toDt);
    this.echallanService
      .getIssuedEChallanByFromToDate(fromDt || '', toDt || '')
      .subscribe(
        (data: any) => {
          console.log(data);
          this.echallanList = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
  checkIssuedChallan(value: any) {
    let isfound = true;
    this.echallans.forEach((data) => {
      if (value == data) {
        isfound = false;
      } else {
        isfound = true;
      }
    });
    return isfound;
  }

  chooseChallanIssueDate(date: any) {
    this.challanIssueDate = date;
  }

  exportArrayToExcel(arr: any[], name: string) {
    this.tableUtils.exportArrayToExcel(arr, name);
  }
  exportToPDf() {
    let printContents;
    printContents = document.getElementById('tableId')!.innerHTML;
    console.log(printContents);
    this.tableUtils.exportToPDF(printContents);
  }
  exportArrayToPDF(){
    // let arrayList:any = [];
    // //console.log(this.dataSource.data)
    // this.dataSource.data.forEach((data,value) =>{
    //     arrayList.push(Object.values(data))
    // })
    // console.log(arrayList);
    this.tableUtils.exportIssuedChallanToPDf(this.dataSource.data,"challans");
  }
}
