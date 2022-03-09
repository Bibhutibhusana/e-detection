import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { UserLogin } from './user';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private isLoggedIn = false;
	private baseUrl = this.commonService.getBaseUrl();

	constructor(private http: HttpClient, private commonService: CommonService) {
	}
	public getLoggedIn() {
		return localStorage.getItem('isLoggedIn');
	}
	public getLoggedInUser():any{
		return JSON.parse(localStorage.getItem('user') || "");
	}

	public setLoggedIn(data:UserLogin) {
		this.isLoggedIn = true;
		localStorage.setItem('isLoggedIn', "true");
		localStorage.setItem('user',JSON.stringify(data));
	}
	public deleteLoggedIn() {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('user');1
	}

	getUserLoginList() {
		return this.http.get(`${this.baseUrl}/users`)
	}
	getUserById(id:number){
		return this.http.get(`${this.baseUrl}/users/${id}`)
	}
	getUserByUserNameAndPassword(username: String,  password: String){
		return this.http.post(`${this.baseUrl}/user/getByUserIdAndPassword`,{username:username,password:password})
	}
	createUser(user: UserLogin){
		return this.http.post(`${this.baseUrl}/user`,user)
	}

}
