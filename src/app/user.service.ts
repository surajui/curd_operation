import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import{User} from '../app/user';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  baseUrl: string = 'http://localhost:3000/user';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl)
                   .catch(this.errorHandler);
  }
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "server error");
    
  }
  

  getUserById(id:number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }
 
  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}


