import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClickService {
  readonly API_URL = 'https://s10plus.com:8443/wsdemos/rest/action/click';

  constructor(private http: HttpClient) {}
  postClick(id: String, other_information: string, token: string) {
    const body = {
      id_action: id,
      other_information: other_information,
    };
    const headers = new HttpHeaders({ token: token });

    return this.http.post<any>(this.API_URL, body, {
      headers: {
        token: token,
      },
    });
  }
}
