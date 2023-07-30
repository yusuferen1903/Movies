import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddMoviesModalComponent } from '../modal/add-movies-modal/add-movies-modal.component';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private movieService: MoviesService,
    private router: Router,
  ) {}
  movies: any[] = [];
  currentPage = 1;
  filterTitle: string | null = null;
  filteredMovies: any[] = [];
  ngOnInit(): void {
    this.getMovies()
    }
  loadMoviestoLS() {
      const movies = JSON.stringify(this.movies);
      localStorage.setItem('movies', movies);
  }
  getMovies(){
    if (localStorage.getItem('movies') === null) {
      this.movieService.getAllMovies(this.currentPage).subscribe((movies: any[]) => {
        this.movies = movies;
        this.currentPage++;
        this.imdBidtoImdp(this.movies)
      });
    } else {
      const itemsString = localStorage.getItem('movies');
      this.movies = JSON.parse(itemsString);
    }
  }

  imdBidtoImdp(movies){
    for (let i = 0; i < movies.length; i++) {
      this.movieService.getMoviesWithImdbId(movies[i].imdbID).subscribe((resp) => {
        this.movies[i].imdb = resp.imdbRating
        this.movies[i].Plot = resp.Plot
        this.movies[i].Actors = resp.Actors
        this.movies[i].Genre = resp.Genre
        this.loadMoviestoLS()
      });
    }

  }
  applyFilter() {
    // Filmleri başlık alanına göre filtrele
    if (this.filterTitle) {
      this.filteredMovies =  this.movies.filter(movie => movie.Title.toLowerCase().includes(this.filterTitle.toLowerCase()));
    } else {
      this.filteredMovies = this.movies;
    }

  }
  goToMovie(movieTitle){
    this.router.navigate(['/movies-list'], { queryParams: { q: movieTitle } });
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddMoviesModalComponent , {
      width: '800px'
    })
    dialogRef.afterClosed().subscribe(result => {
  })
  }
}
