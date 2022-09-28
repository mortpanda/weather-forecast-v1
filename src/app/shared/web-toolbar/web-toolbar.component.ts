import { Component, OnInit } from '@angular/core';
import { MenuListService } from '../menu-items/menu-list.service';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-web-toolbar',
  templateUrl: './web-toolbar.component.html',
  styleUrls: ['./web-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebToolbarComponent implements OnInit {
  webMenu
  constructor(
    private MenuListService: MenuListService,
  ) {
    this.webMenu = this.MenuListService.navToolBarItems;
  }

  ngOnInit(): void {
  }

}
