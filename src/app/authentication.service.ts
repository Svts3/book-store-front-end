import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'jwtToken';

  constructor(private httpClient: HttpClient, private router:Router) { }

  public login(request: any): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/auth/login', request, { responseType: 'text' as 'json' });
  }

  

  public getUserInfoByEmail(email: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log(token);
    return this.httpClient.get<any>(`http://localhost:8080/user/email/${email}`, { headers });
  }

  public getUserFromToken(): Observable<any> {
    var email = this.getEmailFromToken();
    return this.getUserInfoByEmail(email);
  }

  public setToken(token: string): void {
    var accessToken = '';
    if(token!=null){
      accessToken = JSON.parse(token).accessToken;
    }
    console.log(accessToken);
    localStorage.setItem(this.tokenKey, accessToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

 
  public isLoggedIn():any{
    var token = this.getToken();
    if(token!=null){
      return true;
    }
    return false;
  }

  
  public getEmailFromToken(): string {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = this.base64UrlDecode(tokenParts[1]);
        const decodedPayload = JSON.parse(payload);
        return decodedPayload.sub;
      }
    }
    return "";
  }

  private base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  }
  public register(request: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/auth/register', request);
  }
  
}
