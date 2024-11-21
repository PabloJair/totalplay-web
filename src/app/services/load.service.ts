import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DeviceInfo } from 'ngx-device-detector';

@Injectable({ providedIn: 'root' })
export class LoadService {
  readonly API_URL = 'https://s10plus.com:8443/wsdemos/rest/action/load';

  constructor(private http: HttpClient) {}

  postLoad(
    deviceInfo: DeviceInfo,
    lat: number,
    lng: number,
    selecteState: string,
    phone: string
  ) {
    const body = {
      android_version: '' + deviceInfo.browser + '/' + deviceInfo.os,
      id_application: '22',
      model: deviceInfo.device,
      other_information: {
        lat: lat,
        long: lng,
        origin: deviceInfo.deviceType,
        state: selecteState,
        tel_marcado: '',
      },
      phone_id: '',
      phone_number: phone,
    };
    return this.http.post<any>(this.API_URL, body);
  }
}
