import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../../shared/random-number/random-number.service';
import { ViewEncapsulation } from '@angular/core';
import { ApiServiceService } from '../../shared/api-service/api-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  logoutToken;
  accessToken;
  constructor(
    public RandomNumberService: RandomNumberService,
    private ApiServiceService: ApiServiceService,
    private router: Router,
  ) { 
    this.RandomNumberService.generateRandomNo();
  }

  async googleLogout() {
    var storedToken;
    storedToken = await localStorage.getItem('googleAccessToken')
    this.logoutToken = await JSON.parse(storedToken)
    // switch ("error" in this.accessToken) {
    //   case true: {
    //     localStorage.removeItem('googleAccessToken')
    //     this.router.navigate(['/'])
    //     break;
    //   }
    //   default: {
        this.ApiServiceService.revokeGoogleToken(this.logoutToken.access_token)
        localStorage.removeItem('googleAccessToken')
        this.router.navigate(['/'])
      //   break;
      // }
    }

  

  ngOnInit(): void {
  }

}
