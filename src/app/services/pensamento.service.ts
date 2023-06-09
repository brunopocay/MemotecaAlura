import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pensamento } from '../components/pensamentos/pensamento';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'
  private cachedData: Observable<Pensamento[]> ;

  constructor(private http: HttpClient) { }
  
  list(): Observable<Pensamento[]> {
    if(!this.cachedData){
      this.cachedData = this.http.get<Pensamento[]>(this.API).pipe(shareReplay(1))
    }
    return this.cachedData
  }


  // list(): Observable<Pensamento[]> {    
  //    return this.http.get<Pensamento[]>(this.API).pipe(shareReplay(1))
  // }

  create(pensamento: Pensamento): Observable<Pensamento>{
      return this.http.post<Pensamento>(this.API, pensamento)
  }

  edit(pensamento: Pensamento): Observable<Pensamento>{
      const url = `${this.API}/${pensamento.id}`
      return this.http.put<Pensamento>(url, pensamento)
  }

  delete(id: number): Observable<Pensamento>{
     const url = `${this.API}/${id}`
     return this.http.delete<Pensamento>(url) 
  }

  searchById(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

}

