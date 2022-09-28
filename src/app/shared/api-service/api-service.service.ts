import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config/app-config.service';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  getUrl;
  arResponse;
  postResponse;
  postUrl;
  statusCode;
  constructor(
    private HttpClient: HttpClient,
    private AppConfigService: AppConfigService,
  ) { }


  async apiGet(url, api, lang, lat, lon) {
    this.getUrl = url + 'appid=' + api + '&lang=' + lang + '&lat=' + lat + '&lon=' + lon + '&units=metric';
    return this.HttpClient.get(this.arResponse)
      .toPromise()
      .then((res) => {
        const response: any = res;
        // console.log(response);
        return response;
      }).catch(function (err) {
        console.log(err);
      })
  }

  async InvokeOktaFlow(url, content) {
    const thisFetch = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }

  async getGoogleUserInfo(token) {
    const thisFetch = fetch(this.AppConfigService.userInfoUri, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }


  async googleOauth2() {

    const strUri = this.AppConfigService.authUri;
    const strScope = this.AppConfigService.strScope;
    const strRestype = 'code';
    const clientId = this.AppConfigService.appClientID;
    const redirectUri = this.AppConfigService.redirectUri;
    const accessType = this.AppConfigService.accessType;

    const strApiString = strUri + 'client_id=' + clientId + '&' + 'scope=' + strScope + '&' + 'response_type=' + strRestype + '&' + 'redirect_uri=' + redirectUri + '&' + 'prompt=consent' + '&' + accessType;
    console.log(strApiString)
    window.location.replace(strApiString)

  }

  async getGoogleAccessToken(code) {
    const tokenUri = this.AppConfigService.tokenUri;
    const redirectUri = this.AppConfigService.redirectUri;
    const clientId = this.AppConfigService.appClientID;
    const clientSecret = this.AppConfigService.appSecret;
    const grantType = 'grant_type=authorization_code';
    const accessType = this.AppConfigService.accessType;

    const thisFetch = await fetch(tokenUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'code=' + code + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&redirect_uri=' + redirectUri + '&' + grantType + '&' + accessType,
    })
    .then(response => response.json())
    
    let responseJson = await thisFetch;
    return responseJson
    }


    async revokeGoogleToken(token){
      const url='https://oauth2.googleapis.com/revoke?token=';
      const thisFetch = fetch(url, {
        method: 'POST',
      })
        .then(response => response.json())
      let responseJson = await thisFetch;
      return responseJson
    }

  async apiGetWeather(url) {
    const thisFetch = fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }

}


