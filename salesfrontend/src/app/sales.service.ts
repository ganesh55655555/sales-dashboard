import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://3.80.193.6:9090/sales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/show`);
  }

  create(salesData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, salesData);
  }

  update(id: number, salesData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, salesData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registerUser(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    });
  } 

  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    });
  }

}
