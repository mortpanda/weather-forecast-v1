import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/api-service/api-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  logoutToken;
  accessToken;
  constructor(
    private ApiServiceService: ApiServiceService,
    private router: Router,
  ) { }

  navToolBarItems = [
    {
      label: 'メニュー',
      icon: "assets/img/dock_icons/baseline_menu_white_48dp.png",
      routerLink: '/start',
    },
    {
      label: 'ログアウト',
      icon: "assets/img/dock_icons/logout_white.png",
      command: () => {
        this.googleLogout();
      }
    },
  ]

  mainMenuItems = [
    {
      label: '現在の天気',
      icon: "assets/img/menu-icons/outline_filter_drama_white_48dp.png",
      color: "var(--orange-600)",
      routerLink: ['/current-weather'],
    },
    {
      label: '天気予報',
      icon: "assets/img/menu-icons/baseline_sunny_white_48dp.png",
      color: "var(--blue-600)",
      routerLink: ['/weather-forecast'],
    },
    {
      label: '標高データ',
      icon: "assets/img/menu-icons/baseline_moving_white_48dp.png",
      color: "var(--pink-600)",
      routerLink: ['/elevation-data'],
    },
    {
      label: '雨雲レーダー',
      icon: "assets/img/menu-icons/baseline_radar_white_48dp.png",
      color: "var(--yellow-600)",
      routerLink: ['/radar'],
    },
    {
      label: '全国の天気',
      icon: "assets/img/menu-icons/baseline_map_white_48dp.png",
      color: "var(--cyan-600)",
      routerLink: ['/national-weather'],
    },
    // {
    //   label: '雨雲レーダー',
    //   icon: "assets/img/menu-icons/baseline_moving_white_48dp.png",
    //   color:"var(--cyan-600)",
    //   routerLink: ['/'],
    // },
    // {
    //   label: '雨雲レーダー',
    //   icon: "assets/img/menu-icons/baseline_moving_white_48dp.png",
    //   color:"var(--cyan-600)",
    //   routerLink: ['/'],
    // },
  ]

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
        // break;
      // }
    // }

  }

  async GoHome() {
    // window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }


  // ItemsMenu = [
  //   {
  //     label: 'ホーム',
  //     icon: "pi pi-home",
  //     style: 'font-size: 1.5rem',
  //     command: () => {
  //       this.GoHome();
  //     }
  //   },
  //   {
  //     label: 'ログアウト',
  //     icon: "pi pi-sign-out",
  //     style: 'font-size: 1.5rem;',
  //     command: () => {
  //       this.Logout();
  //     }
  //   },
  //   {
  //     label: 'Facebook',
  //     icon: "pi pi-fw pi-facebook",
  //     style: 'font-size: 0.7rem',
  //     url: 'https://www.facebook.com/Okta/',
  //   },
  //   {
  //     label: 'LinkedIn',
  //     icon: "pi pi-fw pi-linkedin",
  //     style: 'font-size: 0.7rem',
  //     url: 'https://www.linkedin.com/company/okta-inc-/',
  //   },
  //   {
  //     label: 'Youtube',
  //     icon: "pi pi-fw pi-youtube",
  //     style: 'font-size: 0.7rem',
  //     url: 'https://www.youtube.com/OktaInc',
  //   },
  //   {
  //     label: 'Twitter',
  //     icon: "pi pi-fw pi-twitter",
  //     style: 'font-size: 0.7rem',
  //     url: 'https://twitter.com/okta_japan',
  //   },

  // ];

  // SmallMenu = [
  //   {
  //     label: 'ホーム',
  //     icon: "pi pi-home",
  //     // style:'font-size: 1.5rem',
  //     command: () => {
  //       this.GoHome();
  //     }
  //   },
  //   {
  //     label: 'ログアウト',
  //     icon: "pi pi-sign-out",
  //     // style:'font-size: 1.5rem;',
  //     command: () => {
  //       this.Logout();
  //     }
  //   },
  //   {
  //     label: 'Facebook',
  //     icon: "pi pi-fw pi-facebook",
  //     // style:'font-size: 0.7rem',
  //     url: 'https://www.facebook.com/Okta/',
  //   },
  //   {
  //     label: 'LinkedIn',
  //     icon: "pi pi-fw pi-linkedin",
  //     // style:'font-size: 0.7rem',
  //     url: 'https://www.linkedin.com/company/okta-inc-/',
  //   },
  //   {
  //     label: 'Youtube',
  //     icon: "pi pi-fw pi-youtube",
  //     // style:'font-size: 0.7rem',
  //     url: 'https://www.youtube.com/OktaInc',
  //   },
  //   {
  //     label: 'Twitter',
  //     icon: "pi pi-fw pi-twitter",
  //     // style:'font-size: 0.7rem',
  //     url: 'https://twitter.com/okta_japan',
  //   },

  // ];


}
