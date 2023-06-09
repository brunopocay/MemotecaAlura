import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from '../components/pensamentos/pensamento';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'
  // private cachedData: Observable<Pensamento[]> ;

  constructor(private http: HttpClient) { }
  
  // list(): Observable<Pensamento[]> {
  //   if(!this.cachedData){
  //     this.cachedData = this.http.get<Pensamento[]>(this.API).pipe(shareReplay(1))
  //   }
  //   return this.cachedData
  // }

  list(pagina: number, filtro: string, isFavorite: boolean): Observable<Pensamento[]> {  
    
    const itensPorPagina = 6; 

    let params = new HttpParams().set('_page', pagina).set('_limit', itensPorPagina)
    
    if(filtro.trim().length > 2){
      params = params.set('q', filtro)
    }
    if(isFavorite){
      params = params.set('isFavorite', true)
    }

    return this.http.get<Pensamento[]>(this.API, {params})
  }

  create(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  edit(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  changeFavorite(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.isFavorite = !pensamento.isFavorite
    return this.edit(pensamento)
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

