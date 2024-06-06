import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
// import { httpheaders } from './httpheaders';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: any;
  headers: any;
  token:any;
  constructor(private http: HttpClient, private router: Router) { 
    this.baseUrl= environment.baseUrl
  }

  login(data: any) {
    return this.http.post(
      `${this.baseUrl}/login/`, data
    ).pipe(
      tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token); 
      })
    );
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token'); 
    }
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token); 
  }

  clearToken() {
    this.token = null;
    // localStorage.removeItem('token');   
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout/`, {}).pipe(
      tap(() => {
        console.log(this.token);
        this.clearToken();
        this.router.navigate(['/login']); 
      })
    );
  }


}

