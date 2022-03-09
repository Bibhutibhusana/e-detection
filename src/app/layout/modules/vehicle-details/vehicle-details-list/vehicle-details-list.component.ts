import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/common/alert/alert.service';
import { TableUtils } from 'src/app/common/utils/table-utils';
import { LoginService } from 'src/app/login/login.service';
import { UserLogin } from 'src/app/login/user';
import { EChallan } from '../models/echallan';
import { VehicleDetails } from '../models/vehicle-details';
import { EchallanService } from '../service/echallan.service';
import { VehicleDetailsService } from '../service/vehicle-details.service';
import { VehicleTransactionHistoryService } from '../service/vehicle-transaction-history.service';

@Component({
  selector: 'app-vehicle-details-list',
  templateUrl: './vehicle-details-list.component.html',
  styleUrls: ['./vehicle-details-list.component.css'],
})
export class VehicleDetailsListComponent implements OnInit {
  //items = [{ 'name': 'Tax', 'value': 'tax' }, { 'name': 'FitUpto', 'value': 'fitupto' }, { 'name': 'Insurance Upto', 'value': 'ins_upto' }, { 'name': 'NonUse Stat', 'value': 'nonusestat' }];
  vehicleDetailsList: Array<VehicleDetails> = new Array<VehicleDetails>();
  vehicleDetails: VehicleDetails = new VehicleDetails();
  displayedColumns = [
    'id',
    'vehicleNo',
    'vtClass',
    'vhClass',
    'taxUpto',
    'fitUpto',
    'insUpto',
    'nonUseStat',
    'action',
  ];
  isChallanIssued: Boolean = true;
  dataSource: MatTableDataSource<VehicleDetails> =
    new MatTableDataSource<VehicleDetails>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showView: boolean = false;
  date!: Date;
  challanNo!: string;
  echallan: EChallan = new EChallan();
  echallans: Array<EChallan> = new Array<EChallan>();
  opDate!: Date;
  isLoading: boolean = false;
  user = new UserLogin();
  constructor(
    private vehicleTransactionHistoryService: VehicleTransactionHistoryService,
    private alertService: AlertService,
    private vehicleDetailsService: VehicleDetailsService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private echallanService: EchallanService,
    private loginService: LoginService,
    private router: Router,
    private tableUtils: TableUtils
  ) {}

  ngOnInit(): void {
    try {
      this.user = this.loginService.getLoggedInUser();
      console.log(this.user);
    } catch {
      this.loginService.deleteLoggedIn();
      this.router.navigate(['/login']);
    }

    this.reloadData();
  }

  reloadData() {
    this.vehicleDetailsService.getInvalidVehicleDetailsList().subscribe(
      (data: any) => {
        this.vehicleDetailsList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => {
        this.alertService.error(err.message);
      }
    );
  }

  toShowView() {
    this.showView = !this.showView;
    this.showDate(this.date);
  }
  public doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showDate(date: any) {
    //console.log(date);
    this.showView = true;
    let fromDt = this.datePipe.transform(date, 'dd-MM-YYYY');
    this.isLoading = true;
    this.vehicleDetailsService.getVehicleDetailsByDate(fromDt || '').subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
        this.isLoading = false;
        this.vehicleDetailsList = data;
      },
      (err: any) => {
        this.alertService.error(err.msg), (this.isLoading = false);
      }
    );
  }

  selectChallan(value: any) {
    this.echallan = new EChallan();
    this.echallan.id = value.id;
    this.echallan.opDate = new Date();
    this.echallan.transactionDate = value.transactionDate;
    this.echallan.vehicleNo = value.vehicleNo;
    this.echallan.vhClass = value.vhClass;
    this.echallan.vtClass = value.vtClass;
    let fromDt = this.datePipe.transform(value.transactionDate, 'dd-MM-YYYY');
    this.echallan.challanTrackId = value.vehicleNo + '/' + fromDt;

    if (this.echallan.transactionDate > value.taxUpto) {
      this.echallan.taxUpto = true;
    }
    if (this.echallan.transactionDate > value.fitUpto) {
      this.echallan.fitUpto = true;
    }
    if (this.echallan.transactionDate > value.insUpto) {
      this.echallan.insUpto = true;
    }
    if (value.nonUseStat == 'Non-Use') {
      this.echallan.nonUseStat = true;
    }
    this.echallan.createdBy = this.user.id;
    this.echallan.createdDate = new Date();
    this.echallanService.createEChallan(this.echallan).subscribe(
      (data: any) => {
        this.alertService.success('Successfullly Challan Inserted');
      },
      (err: any) => {
        if (
          err.error.message.includes(
            'nested exception is org.hibernate.exception.ConstraintViolationException'
          )
        ) {
          this.alertService.error('Already Have a Challan For the same Date'),
            console.log(err);
        } else {
          this.alertService.error(err.error.message);
        }
      }
    );
    this.echallans.push(this.echallan);
    console.log(this.echallans);
    /* this.echallanService.saveAllEChallan(this.echallans).subscribe(
		(data:any) => console.log(data),
		(err:any) => this.alertService.error(err.message)
	)*/
  }

  checkIssuedChallan(element: any) {
    let found = false;
    this.echallans.forEach((value) => {
      if (value.vehicleNo == element.vehicleNo) {
        found = true;
      }
    });
    if (found) {
      return false;
    } else {
      return true;
    }
  }

  exportVehicleDetailsToPDF() {
    this.tableUtils.exportVehicleDetailsToPDF(this.dataSource.data);
  }
}
