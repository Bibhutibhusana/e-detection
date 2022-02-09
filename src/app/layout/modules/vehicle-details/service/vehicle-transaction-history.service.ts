import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleTransactionHistoryService {
baseUrl = this.commonService.getBaseUrl();
  constructor(private http:HttpClient, private commonService:CommonService) { }
  
  getVehicleTransactionHistoryServiceList():any{
	return this.http.get(`${this.baseUrl}/vehicle-transaction-history`);
}

}
