import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RandomNumberService } from '../shared/random-number/random-number.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuListService } from '../shared/menu-items/menu-list.service';
import { ApiServiceService } from '../shared/api-service/api-service.service';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessageService } from 'primeng/api';
import { AppConfigService } from '../shared/app-config/app-config.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartComponent implements OnInit {
  smallScreen: boolean;
  mainMenuItems;
  logoutToken;
  authCode;
  accessToken;
  myAccessToken;
  stateCode;
  tokenResponse;
  myUserInfo;
  pictureUri;
  appPage;

  addLocationModal: boolean = false;
  addLocSpeeddial: MenuItem[];
  addLocationState;
  newLocationSend;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public RandomNumberService: RandomNumberService,
    private router: Router,
    private MenuListService: MenuListService,
    private activatedRoute: ActivatedRoute,
    private ApiServiceService: ApiServiceService,
    private messageService: MessageService,
    private AppConfigService: AppConfigService,
  ) {
    this.mainMenuItems = this.MenuListService.mainMenuItems;
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.RandomNumberService.generateRandomNo();
    this.newLocationSend = true;
    this.addLocationState = null;
    this.addLocSpeeddial = [
      {
        tooltip: 'Add location',
        icon: 'pi pi-map-marker',
        command: () => {
          this.addLocationModal = true;
        },
      },
    ]
  }



  async ngOnInit() {

    await this.activatedRoute.queryParams.subscribe((params) => {
      this.authCode = params["code"];
      console.log(this.authCode);
    });
    switch (this.authCode) {
      case undefined: {
        var storedToken;
        storedToken = await localStorage.getItem('googleAccessToken')
        this.accessToken = await JSON.parse(storedToken)
        if (this.accessToken.error == 'invalid_grant') {
          console.log('error')
          this.router.navigate(['/'])
        } else {
          this.myUserInfo = await this.ApiServiceService.getGoogleUserInfo(this.accessToken.access_token)
        }
        break;
      }
      default: {
        this.accessToken = await this.ApiServiceService.getGoogleAccessToken(this.authCode);
        console.log(this.accessToken)

        switch ("error" in this.accessToken) {
          case true: {
            storedToken = await localStorage.getItem('googleAccessToken')
            this.accessToken = await JSON.parse(storedToken)
            switch ("access_token" in this.accessToken) {
              case true: {
                console.log('found token in storage');
                break;
              }
              case false: {
                localStorage.removeItem('googleAccessToken')
                this.router.navigate(['/'])
                break;
              }
            }

            break;
          }
          case false: {
            await localStorage.setItem('googleAccessToken', JSON.stringify(this.accessToken));
            var storedToken;
            storedToken = await localStorage.getItem('googleAccessToken')
            this.accessToken = await JSON.parse(storedToken)
            switch ("error" in this.accessToken) {
              case true: {
                localStorage.removeItem('googleAccessToken')
                this.router.navigate(['/'])
                break;
              }
              case false: {
                await localStorage.setItem('googleAccessToken', JSON.stringify(this.accessToken));
                break;
              }
            }
          }
        }
        this.myUserInfo = await this.ApiServiceService.getGoogleUserInfo(this.accessToken.access_token)
        console.log(this.myUserInfo.picture)

        switch ("error" in this.myUserInfo) {
          case true: {

            localStorage.removeItem('googleAccessToken')
            this.router.navigate(['/'])
            break;
          }
          case false: {
            break;
          }
        }
      }
    }
  }

  diplayPage;
  DisplayPage(strPage) {
    this.diplayPage = strPage;
  }

  OpenWebsite(route) {
    this.router.navigate(['/' + route])
  }

  async googleLogout() {
    var storedToken;
    storedToken = await localStorage.getItem('googleAccessToken')
    this.logoutToken = await JSON.parse(storedToken)
    switch ("error" in this.accessToken) {
      case true: {
        localStorage.removeItem('googleAccessToken')
        this.router.navigate(['/'])
        break;
      }
      default: {
        this.ApiServiceService.revokeGoogleToken(this.logoutToken.access_token)
        localStorage.removeItem('googleAccessToken')
        this.router.navigate(['/'])
        break;
      }
    }

  }

  addLocLat;
  addLocLong;
  addLocLabel;
  openLocationModal() {
    this.addLocationModal = true;
  }


  async submitLocation() {
    this.newLocationSend = await false;
    switch (this.addLocLat) {
      case undefined: {
        this.toastMsg = '緯度が空です'
        this.showError();
        break;
      }
      default: {
        switch (this.addLocLong) {
          case undefined: {
            this.toastMsg = '経度が空です'
            this.showError();
            break;
          }
          default: {
            switch (this.addLocLabel) {
              case undefined: {
                this.toastMsg = '緯度が空です'
                this.showError();
                break;
              }
              default: {
                var tokenStored;
                var storedAccessToken;
                tokenStored = await localStorage.getItem('googleAccessToken')
                storedAccessToken = await JSON.parse(tokenStored)
                console.log(storedAccessToken)
                var myInfo;
                myInfo = await this.ApiServiceService.getGoogleUserInfo(storedAccessToken.access_token)

                var body = [{
                  latitude: this.addLocLat,
                  longitude: this.addLocLong,
                  label: this.addLocLabel,
                  name: myInfo.name,
                }]
                this.addLocRes = await this.ApiServiceService.InvokeOktaFlow(this.AppConfigService.addLocationUrl, body)
                await console.log(this.addLocRes)
                switch (this.addLocRes.status) {
                  case "Location added": {
                    this.toastMsg = "場所が追加されました";
                    this.showSuccess();
                    this.addLocationState = true;
                    this.newLocationSend = true;
                    break;
                  }
                  default: {
                    this.showError();
                    break;
                  }
                }
              }
                break;
            }
          }
        }
        break;
      }
    }

  }
  
  addLocRes;
  toastMsg;
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.toastMsg });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.toastMsg });
  }
  onReject() {
    this.messageService.clear('c');
  }

}

