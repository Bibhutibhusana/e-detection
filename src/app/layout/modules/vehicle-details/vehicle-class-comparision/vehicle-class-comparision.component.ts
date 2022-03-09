import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/common/alert/alert.service';
import { VehicleDetails } from '../models/vehicle-details';
import { VehicleDetailsService } from '../service/vehicle-details.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUtils } from 'src/app/common/utils/table-utils';

@Component({
  selector: 'app-vehicle-class-comparision',
  templateUrl: './vehicle-class-comparision.component.html',
  styleUrls: ['./vehicle-class-comparision.component.css'],
})
export class VehicleClassComparisionComponent implements OnInit {
  vehicleDetailsList = new Array<VehicleDetails>();
  date!: Date;
  dataSource: MatTableDataSource<VehicleDetails> =  new MatTableDataSource<VehicleDetails>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showView: boolean = false;
  displayedColumns = [
    'id',
    'vehicleNo',
    'vtClass',
    'vhClass',
    'action',
  ];
  constructor(
    private vehicleDetailsService: VehicleDetailsService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private tableUtils: TableUtils,
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {}
  public doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchByDate() {
    let fromDt = this.datePipe.transform(this.date, 'dd-MM-YYYY');
    this.vehicleDetailsService.getVehicleDetailsByDate(fromDt || '').subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.vehicleDetailsList = data;
      },
      (err: any) => {
        this.alertService.error(err.msg);
      }
    );
  }
  toShowView(){
    this.showView = !this.showView;
    this.searchByDate();
  }
  exportVehicleDetailsToPDF() {
    this.tableUtils.exportVehicleDetailsToPDF(this.dataSource.data);
  }
  checkValidation(vehicleInfo:VehicleDetails){
    if(vehicleInfo.vtClass =='Car' && vehicleInfo.vhClass =='Motor Car'){
      return true;
    }
    if(vehicleInfo.vtClass =='MAV 4-Axle' && vehicleInfo.vhClass =='Motor Car'){}
    return false;
  }
}
