import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../common/alert/alert.service';
import { LoginService } from './login.service';
import { UserLogin } from './user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: UserLogin = new UserLogin();
	username = new FormControl('');
	password = new FormControl('');
	hide = true;
	isLoggedIn = false;

	constructor(private loginService: LoginService, private alertService: AlertService,
		private router: Router
	) { }

	ngOnInit(): void {

	}
	onSubmit() {
		this.loginService.getUserByUserNameAndPassword(this.username.value, this.password.value).subscribe(
			(data: any) => {
				console.log(data)
				console.log(this.username.value, this.password.value)
				if (data == null) {
					this.alertService.error("UserId and Password Invalid!!")
				}
				else if (data.userName == this.username.value && data.password == this.password.value) {
					this.loginService.setLoggedIn(data)
					this.router.navigate(['/dashboard'])
						.then(() => {
							window.location.reload();
						});
					/*if(data.role = "EDUser"){
					this.router.navigate(['/dashboard/vehicle-details'])
					}
					else if(data.role = "TollUser"){
						this.router.navigate(['/dashboard/department-user'])
					}*/
				}
				else {
					this.alertService.error("UserId and Password Invalid!!!")
				}
			},
			(err: any) => this.alertService.error(err.message)
		)
	}

}
