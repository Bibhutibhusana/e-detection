import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
	providedIn: 'root'
})
export class VehicleDetailsService {
	
	baseUrl = this.commonService.getBaseUrl();
	constructor(private http: HttpClient, private commonService: CommonService) { }

	getVehicleDetailsList(): any {
		return this.http.get(`${this.baseUrl}/vehicle-details`);
	}
	getInvalidVehicleDetailsList(): any {
		return this.http.get(`${this.baseUrl}/invalid-vehicle-details`);
	}
	
	getInvalidVehicleDetailsByType(type:string){
		return this.http.get(`${this.baseUrl}/invalid-vehicle-details-by-type/${type}`)
	}
	getVehicleDetailsByDate(date: string){
		return this.http.post(`${this.baseUrl}/vehicle-details-by-date`,date)
	}
	getInvalidVehicleListByDateAndType(type: any, date: string) {
		return this.http.post(`${this.baseUrl}/vehicle-details-by-date-type`,{offenseType:type,tDate:date})
	}
	
}
