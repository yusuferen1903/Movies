import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = '4cbed11';

  constructor(private http: HttpClient) {}

  getAllMovies(page: number): Observable<any> {
    const params = new HttpParams().set('apikey', this.apiKey).set('s', 'game').set('type' , 'movie').set('page', page.toString());
    return this.http.get(this.apiUrl, { params }).pipe(
      map((response: any) => response.Search)
    );
  }
  
  getMoviesWithImdbId(imdbId:string): Observable<any>  {
    const apiUrl = `${this.apiUrl}?i=${imdbId}&apikey=${this.apiKey}`;
    return this.http.get<any>(apiUrl);
  }

}
