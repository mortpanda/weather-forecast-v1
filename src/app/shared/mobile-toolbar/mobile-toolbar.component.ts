import { Component, OnInit } from '@angular/core';
import {MenuListService} from '../menu-items/menu-list.service';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-mobile-toolbar',
  templateUrl: './mobile-toolbar.component.html',
  styleUrls: ['./mobile-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileToolbarComponent implements OnInit {
mobileMenuItems;
  constructor(
    private MenuListService:MenuListService,
  ) { 
    this.mobileMenuItems=this.MenuListService.navToolBarItems;
  }

  ngOnInit(): void {
  }

}
