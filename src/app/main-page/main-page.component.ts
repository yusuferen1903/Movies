import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddMoviesModalComponent } from '../modal/add-movies-modal/add-movies-modal.component';
import { MoviesService } from '../services/movies.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private movieService: MoviesService
  ) { }
  movies: any[] = [];
  currentPage = 1;
  searchText = '';
  // characters = [
  //   'Ant-Man',
  //   'Aquaman',
  //   'Asterix',
  //   'The Atom',
  //   'The Avengers',
  //   'Batgirl',
  //   'Batman',
  //   'Batwoman',
  // ]
  ngOnInit(): void {
    this.getMovies()
    console.log(this.movies);
    
    }
  loadMoviestoLS() {
      const movies = JSON.stringify(this.movies);
      localStorage.setItem('movies', movies);
  }
  getMovies(){
    if (localStorage.getItem('movies') === null) {
      this.movieService.getAllMovies(this.currentPage).subscribe((movies: any[]) => {
        this.movies = movies;
        console.log(movies);
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
  openDialog(){
    const dialogRef = this.dialog.open(AddMoviesModalComponent , {
      width: '800px'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      

  })
  }
}
