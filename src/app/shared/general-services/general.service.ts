import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/api-service/api-service.service';
import { AppConfigService } from '../../shared/app-config/app-config.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private ApiServiceService: ApiServiceService,
    private AppConfigService: AppConfigService,
    private router: Router,
  ) { }


  async getStorageToken() {
    var accessToken;
    var storedToken;
    storedToken = await localStorage.getItem('googleAccessToken')
    accessToken = await JSON.parse(storedToken)
   
    switch (accessToken){
      case null:{
        this.router.navigate(['/'])
        break;
      }
    }
    if (accessToken.error == 'invalid_grant') {
      console.log('error')
      this.router.navigate(['/'])
    } else { }
    // console.log(accessToken)
    return accessToken
  }

}
