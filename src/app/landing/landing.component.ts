import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HostListener } from "@angular/core";
// import { SocialAuthService } from "@abacritt/angularx-social-login";
// import { SocialUser } from "@abacritt/angularx-social-login";
// import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { RandomNumberService } from '../shared/random-number/random-number.service';
import { Router } from '@angular/router';
import { ApiServiceService } from '../shared/api-service/api-service.service';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  smallScreen: boolean;
  // socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    // private authService: SocialAuthService,
    public RandomNumberService: RandomNumberService,
    private router: Router,
    private ApiServiceService: ApiServiceService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });

    this.RandomNumberService.generateRandomNo();
  }

  gUser;
  async Gauthenticate() {
    this.gUser = await this.ApiServiceService.googleOauth2();
    // await console.log(this.gUser)
  }

  async ngOnInit() {

  }

  // loginWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // // Logout the current session
  // logOut(): void {
  //   this.authService.signOut();
  // }


}
