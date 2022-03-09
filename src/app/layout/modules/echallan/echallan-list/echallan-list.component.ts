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
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-echallan-list',
  templateUrl: './echallan-list.component.html',
  styleUrls: ['./echallan-list.component.css'],
})
export class EchallanListComponent implements OnInit {
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
    'challanIssueDate',
    'action',
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
  challanNo = new FormControl('',{validators: [Validators.required,Validators.pattern(`[A-Z0-9]{14,17}`)]});
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
      .getEChallanByFromToDate(fromDt || '', toDt || '')
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
  selectChallan(value: EChallan, dialog: any) {
    this.echallan = new EChallan();
    this.echallan = value;
    this.echallans.push(this.echallan);
    //console.log(this.echallan)
    // console.log(this.echallans.indexOf(value))
    // if (checked.checked == true) {
    // 	this.echallans.push(value);
    // }
    // else {
    // 	this.echallans = this.echallans.filter(echallan => {

    // 		if (echallan == value) {
    // 			return false;
    // 		}
    // 		return true;
    // 	});
    // }
    let dialogRef = this.dialog.open(dialog, {
      width: '350px',
    });
  }

  closeDialog(echallan: any) {
    this.dialog.closeAll();
  }

  chooseChallanIssueDate(date: any) {
    this.challanIssueDate = date;
  }
  issueChallan() {
    //this.echallan.purposeCode = this.type;
    this.echallan.challanIssueDate = this.challanIssueDate;
    this.echallan.challanNo = this.challanNo.value;
    this.echallan.updatedBy = this.user.id;
    this.echallan.updatedDate = new Date();
    this.echallanService.createEChallan(this.echallan).subscribe(
      (data: any) => {
        this.alertService.success('Challan Saved Successfully..');
      },
      (err: any) => {
        this.echallan.challanNo = '';
        this.echallan.challanIssueDate ;
        console.log(err)
        if(err.error.message.includes('constraint [uk_ke9wx6pfxveode41g4pchon56];')){

          this.alertService.error("ChallanNo Already Exist!!!");
        }
        else{
          this.alertService.error('Error occured during challan creation..');
        }

      }
    );
    this.dialog.closeAll();
  }

  exportArrayToExcel(arr: any[], name: string) {
    this.tableUtils.exportArrayToExcel(arr, name);
  }
  exportToPDF() {
    this.tableUtils.exportIssuedChallanToPDf(this.dataSource.data, 'challan');
  }
}
