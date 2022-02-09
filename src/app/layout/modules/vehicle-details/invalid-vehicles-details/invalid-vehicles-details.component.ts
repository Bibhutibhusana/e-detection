import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/alert/alert.service';
import { VehicleDetails } from '../models/vehicle-details';
import { VehicleDetailsService } from '../service/vehicle-details.service';
import { VehicleTransactionHistoryService } from '../service/vehicle-transaction-history.service';

@Component({
	selector: 'app-invalid-vehicles-details',
	templateUrl: './invalid-vehicles-details.component.html',
	styleUrls: ['./invalid-vehicles-details.component.css']
})
export class InvalidVehiclesDetailsComponent implements OnInit,AfterViewInit {
	items = [{ 'name': 'Tax', 'value': 'tax_upto' }, { 'name': 'FitUpto', 'value': 'fit_upto' }, { 'name': 'Insurance Upto', 'value': 'ins_upto' }, { 'name': 'NonUse Stat', 'value': 'nonusestat' }];
	vehicleDetailsList: Array<VehicleDetails> = new Array<VehicleDetails>();
	vehicleDetails: VehicleDetails = new VehicleDetails();
	displayedColumns = ['id', 'vehicleNo', 'vtClass', 'vhClass','action']
	dataSource!: MatTableDataSource<VehicleDetails>;
	@ViewChild(MatPaginator,{static:false}) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	isSearch: boolean = false;
	date!: Date;
	type!: string;
	constructor(private vehicleTransactionHistoryService: VehicleTransactionHistoryService, private alertService: AlertService,
		private vehicleDetailsService: VehicleDetailsService
	) { }

	ngOnInit(): void {
		this.reloadData();
	}
	ngAfterViewInit():void{
		this.dataSource.paginator = this.paginator;
		
	}

	reloadData() {
		this.vehicleTransactionHistoryService.getVehicleTransactionHistoryServiceList().subscribe(
			(data: any) => {
				//this.vehicleDetailsList = data;
				//this.dataSource = new MatTableDataSource(data);
				//this.dataSource.sort = this.sort;
				// this.dataSource.paginator = this.paginator;
				//this.alertService.success("Drink 3 glass of water everyday..");
				console.log(data);
			},
			(err: any) => { this.alertService.error(err.msg) }
		);
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
	showView() {
		this.isSearch = !this.isSearch;
	}
	public doFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	showDate(date: any) {
		console.log(date)
	}
	selectType(type: any) {
		if(this.displayedColumns.length > 4){
			this.displayedColumns.pop()
			this.displayedColumns.pop()
		};
		this.displayedColumns.push(type)
		this.displayedColumns.push("action")
		this.vehicleDetailsService.getInvalidVehicleDetailsByType(type).subscribe( 
			(data:any) => {
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
				},
			(err:any)=>{this.alertService.error(err.msg)}
		)
		console.log(type)
	}
}
