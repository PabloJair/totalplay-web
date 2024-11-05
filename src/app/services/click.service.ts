import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClickService {
  readonly API_URL = 'https://s10plus.com:8443/wsdemos/rest/action/click';

  constructor(private http: HttpClient) {}
  postClick(label: String) {
    const body = {
      application_name: 'Demo para TotalPlay',
      id_application: '20',
      id_action: '334',
      action: 'nav',
      activity: 'CLICK/DETALL',
      label: label,
      concept: label,
      level: '0',
    };
    return this.http.post<any>(this.API_URL, body);
  }
}
