import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { UserLogin } from '../login/user';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {
	user: UserLogin = new UserLogin();
	constructor(private loginService: LoginService) {
		this.user = this.loginService.getLoggedInUser();
	}
	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		console.log(ActivatedRouteSnapshot);
		console.log(state.url,this.user.role)
		if (this.user.role == "TollUser" && state.url == "/dashboard/department-user") {
			return true;
		}
		else if(this.user.role == "EDUser" && !state.url.includes("/department-user")){
			return true;
		}

		return false;
	}

}
