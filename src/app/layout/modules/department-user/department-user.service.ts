import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
	providedIn: 'root'
})
export class DepartmentUserService {
	baseUrl = this.commonService.getBaseUrl();
	constructor(private commonService: CommonService,
		private http: HttpClient
	) { }

	uploadVehiclesData(file: any) {
		return this.http.post(`${this.baseUrl}/upload`, file)
	}
	viewUploadedFiles(){
		return this.http.get(`${this.baseUrl}/files`);
	}
	viewFileByName(url:any){
		return this.http.get(`${url}`)
	}
}
