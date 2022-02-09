import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/alert/alert.service';
import { VehicleDetails } from '../models/vehicle-details';
import { VehicleDetailsService } from '../service/vehicle-details.service';
import { VehicleTransactionHistoryService } from '../service/vehicle-transaction-history.service';

@Component({
	selector: 'app-vehicle-details-list',
	templateUrl: './vehicle-details-list.component.html',
	styleUrls: ['./vehicle-details-list.component.css']
})
export class VehicleDetailsListComponent implements OnInit {

	items = [{ 'name': 'Tax', 'value': 'tax' }, { 'name': 'FitUpto', 'value': 'fitupto' }, { 'name': 'Insurance Upto', 'value': 'ins_upto' }, { 'name': 'NonUse Stat', 'value': 'nonusestat' }];
	vehicleDetailsList: Array<VehicleDetails> = new Array<VehicleDetails>();
	vehicleDetails: VehicleDetails = new VehicleDetails();
	displayedColumns = ['id', 'vehicleNo', 'vtClass', 'vhClass', 'taxUpto', 'fitUpto', 'insUpto', 'nonUseStat']
	dataSource: MatTableDataSource<VehicleDetails> = new MatTableDataSource<VehicleDetails>();
	@ViewChild(MatPaginator,{static:false}) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	showView: boolean = false;
	date!: Date;
	constructor(private vehicleTransactionHistoryService: VehicleTransactionHistoryService, private alertService: AlertService,
		private vehicleDetailsService: VehicleDetailsService, private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.reloadData();
	}

	reloadData() {
		
		
		
		/*this.vehicleTransactionHistoryService.getVehicleTransactionHistoryServiceList().subscribe(
			(data: any) => {
				//this.vehicleDetailsList = data;
				//this.dataSource = new MatTableDataSource(data);
				//this.dataSource.sort = this.sort;
				// this.dataSource.paginator = this.paginator;
				//this.alertService.success("Drink 3 glass of water everyday..");
				console.log(data);
			},
			(err: any) => { this.alertService.error(err.msg) }
		);*/
		this.vehicleDetailsService.getInvalidVehicleDetailsList().subscribe(
			(data: any) => {
				this.vehicleDetailsList = data;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
				//this.alertService.success("Drink 3 glass of water everyday..");
				console.log(data)
			},
			(err: any) => { this.alertService.error(err.msg) }
		)
	}
	 

	toShowView(){
		this.showView = ! this.showView;
	}
	public doFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
	}
	showDate(date:any){
		console.log(date);
		 let fromDt = this.datePipe.transform(date,"dd-MM-YYYY");
		this.vehicleDetailsService.getVehicleDetailsByDate(fromDt || '').subscribe( 
			(data:any) => {console.log(data)
			this.vehicleDetailsList = data;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				
			},
			(err:any) => {this.alertService.error(err.msg)}
		)
		
	}


}
