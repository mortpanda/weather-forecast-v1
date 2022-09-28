import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuListService } from '../menu-items/menu-list.service';
import { PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  smallScreen: boolean;
  ItemsMenu = [];
  SmallMenu = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private breakpointObserver: BreakpointObserver,
    
    private MenuListService: MenuListService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {

  }

  async GoTo(strURL) {
    switch (strURL) {
      case 'home': {
        
        break;
      }
      case 'logout': {
        // NEED TO PUT LOGOUT HERE
        break;
      }
      default: {
        window.open(strURL, '_blank');
        break;
      }
    }
  }

}
