import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  constructor() { }

  bannerPath;
  generateRandomNo() {
    this.bannerPath=null;
    var randomNo;
    randomNo = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    console.log(randomNo)
    switch (randomNo) {
      case 1:{
        this.bannerPath = '/assets/banners/lion-banner.png'
        break;
      }
      case 2:{
        this.bannerPath = '/assets/banners/panda-banner.png'
        break;
      }
      case 3:{
        this.bannerPath = '/assets/banners/squirrel-banner.png'
        break;
      }
    }
    
  }

}
