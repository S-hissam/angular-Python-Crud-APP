import { Injectable } from '@angular/core';
import { Hero } from './types/heroes';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private myUrl = 'http://127.0.0.1:8000/heros'; // URL to web api
  private mediaUrl = 'http://127.0.0.1:8000/media/'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMyHeroes(): Observable<any> {
    return this.http.get<any>(this.myUrl);
  }
  getMyHero(heroId: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/hero/' + heroId);
  }

  addMyHero(newTodoForm: any): Observable<any> {
  console.log("🚀 ~ file: hero.service.ts ~ line 33 ~ HeroService ~ addMyHero ~ newTodoForm", newTodoForm)

    return this.http.post<any>(this.myUrl, newTodoForm);
  }

  updateMyHero(heroName: any): Observable<any> {
    return this.http.put<any>(this.myUrl, heroName);
  }
  deleteMyHero(heroId: any): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/hero/' + heroId);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Hero[]>(`http://127.0.0.1:8000/search/${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
