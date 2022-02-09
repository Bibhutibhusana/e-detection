import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //baseUrl = 'http://localhost:8080/cms/api/v1'
 //private baseUrl = 'http://192.168.137.77:8090/cms/api/v1'
 //private baseUrl = 'http://192.168.43.199:8090/cms/api/v1'
 private baseUrl = 'http://localhost:8090/e-detection/api/v1'
  constructor(private http:HttpClient) { }

  public getBaseUrl(){
    return this.baseUrl;
  }

}
