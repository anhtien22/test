import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../model/api.model';
import { IUser } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  RegisterUser(inputdata: any): Observable<IUser[]> {
    return this.http.post<IUser[]>(api + '/users', inputdata);
  }
  LoginUser(data: any): Observable<IUser> {
    return this.http.get<IUser>(api + '/users');
  }
  GetUserbyId(id: any): Observable<IUser> {
    return this.http.get<IUser>(api + '/users/' + id);
  }
  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
}
