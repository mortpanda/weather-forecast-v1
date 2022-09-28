import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // title = 'okta-japan-template-v5-primeui';

  constructor(
    private primengConfig: PrimeNGConfig,
    
  ){}

  ngOnInit() {
    this.primengConfig.ripple = true;
}
}
