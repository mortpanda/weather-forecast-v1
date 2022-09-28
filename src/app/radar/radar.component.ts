import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiServiceService } from '../shared/api-service/api-service.service';
import { AppConfigService } from '../shared/app-config/app-config.service';
// import { RandomNumberService } from '../shared/random-number/random-number.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeneralService } from '../shared/general-services/general.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadarComponent implements OnInit {
  smallScreen: boolean;
  strSite='https://tenki.jp/radar/map/';
  strSafeSite: SafeResourceUrl;
  myAccessToken;
  myData;
  // arrResponse;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ApiServiceService: ApiServiceService,
    private AppConfigService: AppConfigService,
    // private RandomNumberService: RandomNumberService,
    private sanitizer: DomSanitizer,
    private GeneralService: GeneralService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    // this.RandomNumberService.generateRandomNo();
    this.strSafeSite = this.sanitizer.bypassSecurityTrustResourceUrl(this.strSite);
   }

  async ngOnInit(){
    this.myAccessToken = await this.GeneralService.getStorageToken()
    // console.log(this.myAccessToken)
    this.myData = await this.ApiServiceService.getGoogleUserInfo(this.myAccessToken.access_token)
    // console.log(this.myData.error.code)
    switch ("error" in this.myData) {
      case true: {
        this.router.navigate(['/'])
        break;
      }
      case false: {
        // var body
        // body = await { name: this.myData.name }
      }
    }
  }

}
