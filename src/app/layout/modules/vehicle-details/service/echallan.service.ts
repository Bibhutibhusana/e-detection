import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { EChallan } from '../models/echallan';

@Injectable({
  providedIn: 'root',
})
export class EchallanService {
  baseUrl = this.commonService.getBaseUrl();
  constructor(private http: HttpClient, private commonService: CommonService) {}

  getEChallanList() {
    return this.http.get(`${this.baseUrl}/echallan`);
  }

  getEChallanById(id: number) {
    return this.http.get(`${this.baseUrl}/echallan/${id}`);
  }

  createEChallan(echallan: EChallan) {
    return this.http.post(`${this.baseUrl}/echallan`, echallan);
  }

  saveAllEChallan(echallans: Array<EChallan>) {
    return this.http.post(`${this.baseUrl}/echallans`, echallans);
  }
  getEChallanByFromToDate(fromDt: string, toDt: string) {
    return this.http.post(`${this.baseUrl}/echallan-get-by-date`, {
      fromDt: fromDt,
      toDt: toDt,
    });
  }
  getIssuedEChallanByFromToDate(fromDt: string, toDt: string) {
    return this.http.post(`${this.baseUrl}/issued-challan-list`, {
      fromDt: fromDt,
      toDt: toDt,
    });
  }
}
