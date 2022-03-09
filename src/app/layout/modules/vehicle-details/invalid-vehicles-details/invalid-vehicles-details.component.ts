import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/alert/alert.service';
import { EChallan } from '../models/echallan';
import { VehicleDetails } from '../models/vehicle-details';
import { EchallanService } from '../service/echallan.service';
import { VehicleDetailsService } from '../service/vehicle-details.service';
import { VehicleTransactionHistoryService } from '../service/vehicle-transaction-history.service';

@Component({
  selector: 'app-invalid-vehicles-details',
  templateUrl: './invalid-vehicles-details.component.html',
  styleUrls: ['./invalid-vehicles-details.component.css'],
})
export class InvalidVehiclesDetailsComponent implements OnInit {
  items = [
    { name: 'Tax', value: 'tax_upto' },
    { name: 'FitUpto', value: 'fit_upto' },
    { name: 'Insurance Upto', value: 'ins_upto' },
    { name: 'NonUse Stat', value: 'nonusestat' },
  ];
  vehicleDetailsList: Array<VehicleDetails> = new Array<VehicleDetails>();
  vehicleDetails: VehicleDetails = new VehicleDetails();
  displayedColumns = ['id', 'vehicleNo', 'vtClass', 'vhClass'];
  dataSource!: MatTableDataSource<VehicleDetails>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSearch: boolean = false;
  date!: Date;
  type!: string;
  echallans: Array<EChallan> = [];
  opDate!: Date;
  challanNo!: string;
  echallan: EChallan = new EChallan();
  constructor(
    private vehicleTransactionHistoryService: VehicleTransactionHistoryService,
    private alertService: AlertService,
    private vehicleDetailsService: VehicleDetailsService,
    private echallanService: EchallanService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.vehicleTransactionHistoryService
      .getVehicleTransactionHistoryServiceList()
      .subscribe(
        (data: any) => {
          //this.vehicleDetailsList = data;
          //this.dataSource = new MatTableDataSource(data);
          //this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
          //this.alertService.success("Drink 3 glass of water everyday..");
          console.log(data);
        },
        (err: any) => {
          this.alertService.error(err.msg);
        }
      );
    this.vehicleDetailsService.getInvalidVehicleDetailsList().subscribe(
      (data: any) => {
        this.vehicleDetailsList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.alertService.success("Drink 3 glass of water everyday..");
        //console.log(data);
      },
      (err: any) => {
        this.alertService.error(err.message);
      }
    );
  }
  showView() {
    this.isSearch = !this.isSearch;
  }
  public doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showDate(date: any) {
    console.log(date);
    this.date = date;
  }
  selectType(type: any) {
    this.isSearch = true;
    if (this.displayedColumns.length > 4) {
      this.displayedColumns.pop();
    }
    this.displayedColumns.push(type);
    let fromDt = this.datePipe.transform(this.date, 'dd-MM-YYYY');
    this.vehicleDetailsService
      .getInvalidVehicleListByDateAndType(type, fromDt || '')
      .subscribe(
        (data: any) => {
          //console.log(data),
           (this.dataSource = new MatTableDataSource(data));
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );

    /*this.vehicleDetailsService.getInvalidVehicleDetailsByType(type).subscribe(
			(data: any) => {
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
			},
			(err: any) => { this.alertService.error(err.msg) }
		)*/
    //console.log(type)
  }

 

}
