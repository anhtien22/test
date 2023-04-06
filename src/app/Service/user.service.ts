import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../model/api.model';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(api + '/users');
  }
  deleteUserById(id: number): Observable<number> {
    return this.http.delete<number>(api + '/users/' + id);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(api + '/users/' + id, inputdata);
  }
}
