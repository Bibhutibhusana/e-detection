import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserLogin } from '../login/user';
import { LoaderService } from '../main/loader/loader.service';
import { SpinnerService } from '../main/loader/spinner.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
	btnName = 'show'
	toggle = false;
	language = true;
	isLoading: any;
	showFiller = false;
	user: UserLogin = new UserLogin();
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map((result: any) => result.matches),
			shareReplay()
		);
	showMenu!: string;
	constructor(private breakpointObserver: BreakpointObserver,
		private translate: TranslateService,

		public spinnerService: SpinnerService,
		public loginService: LoginService,
		private router: Router) { }

	ngOnInit(): void {
		this.showMenu = '';
		//this.isLoading = this.loaderService.isLoading;
		this.user = this.loginService.getLoggedInUser();
		/*this.loginService.getLoggedInUser().subscribe(
			(data:any) => {this.user = data,console.log(data)},
			(err:any) => {this.router.navigate(['/login'])}
		)*/
		console.log(this.user)
	}
	toggleBtn() {
		this.toggle = !this.toggle;
		if (this.toggle === true) {
			this.btnName = 'show';
		}
		else {
			this.btnName = 'hide'
		}
	}

	changeLang() {
		this.language = !this.language;
		if  (this.language == true) {
			this.translate.use('en');
		}
		else {
			this.translate.use('od')
		}
	}
	onLogout(){
		this.loginService.deleteLoggedIn();
		this.router.navigate(['/login'])
	}
  onToggle(){
    this.toggle = !this.toggle;
  }

}

