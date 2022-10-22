import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

getDatos(){
  return this.http.get('https://rickandmortyapi.com/api/episode');
}




}
