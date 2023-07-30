import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { AddMoviesModalComponent } from '../modal/add-movies-modal/add-movies-modal.component';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  years: number[] = [];
  imdbValues: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  filterImdb: any | null = null;
  filterYear: any | null = null;
  filteredMovies: any[] = [];
  filterGenre: string | null = null;
  filterTitle: string | null = null;
  sortBy: string = 'yearDescending';
  genres: any[] = [    { value: 'Action', label: 'Aksiyon' },
  { value: 'Adventure', label: 'Macera' },
  { value: 'Animation', label: 'Animasyon' },
  { value: 'Biography', label: 'Biyografi' },
  { value: 'Comedy', label: 'Komedi' },
  { value: 'Crime', label: 'Suç' },
  { value: 'Documentary', label: 'Belgesel' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Family', label: 'Aile' },
  { value: 'Fantasy', label: 'Fantastik' },
  { value: 'Film-Noir', label: 'Siyah Beyaz' },
  { value: 'History', label: 'Tarih' },
  { value: 'Horror', label: 'Korku' },
  { value: 'Music', label: 'Müzik' },
  { value: 'Musical', label: 'Müzikal' },
  { value: 'Mystery', label: 'Gizem' },
  { value: 'Romance', label: 'Romantik' },
  { value: 'Sci-Fi', label: 'Bilim Kurgu' },
  { value: 'Sport', label: 'Spor' },
  { value: 'Thriller', label: 'Gerilim' },
  { value: 'War', label: 'Savaş' },
  { value: 'Western', label: 'Batılı' }];
  constructor(
    private dialog: MatDialog
  ) { }
  dialogRef: MatDialogRef<ConfirmModalComponent>;
  ngOnInit(): void {
    this.getMoviesinLs()
    this.getYears()
  }
  getYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }
  applyFilter() {
    console.log('sa');
    
    let filteredByYear = this.filterYear && this.filterYear !== "null" ? this.movies.filter(movie => movie.Year == this.filterYear) : this.movies;
    let filteredByImdb = this.filterImdb && this.filterImdb !== "null" ? filteredByYear.filter(movie => parseFloat(movie.imdb) >= this.filterImdb) : filteredByYear;
    let filteredByGenre = this.filterGenre && this.filterGenre !== "null" ? filteredByImdb.filter(movie => movie.Genre.includes(this.filterGenre)) : filteredByImdb;
    let filteredByTitle = this.filterTitle && this.filterTitle !== "null" ? filteredByGenre.filter(movie => movie.Title.toLowerCase().includes(this.filterTitle.toLowerCase())) : filteredByGenre;
    switch (this.sortBy) {
      case 'imdbAscending':
        filteredByTitle.sort((a, b) => parseFloat(a.imdb) - parseFloat(b.imdb));
        break;
      case 'imdbDescending':
        filteredByTitle.sort((a, b) => parseFloat(b.imdb) - parseFloat(a.imdb));
        break;
      case 'yearAscending':
        filteredByTitle.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        break;
      case 'yearDescending':
        filteredByTitle.sort((a , b) => {
          if (b.Year !== a.Year) {
            return b.Year - a.Year; // Yıla göre büyükten küçüğe sıralama
          } else {
            return b.imdb - a.imdb; // Aynı yılda olanları IMDb puanına göre büyükten küçüğe sıralama
          }
        })
        break;
      default:
        break;
    }
    this.filteredMovies = filteredByTitle;
  }
  getMoviesinLs(){
    const itemsString = localStorage.getItem('movies');
    this.movies = JSON.parse(itemsString);
    this.applyFilter()
    console.log(this.movies);
    
  }
  edit(movie){
    const dialogRef = this.dialog.open(AddMoviesModalComponent , {
      width: '800px',
      data: {
        movie 
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      }
      

  })
  }
  deleteMovie(movieTitle){
    const dialogRef = this.dialog.open(ConfirmModalComponent , {
      width: '500px',
      data: {
        title: "Filmi Sil",
        message: "Silmek istediğinize emin misiniz ?",
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedMovies = this.movies.filter(movie => movie.Title !== movieTitle);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        this.ngOnInit()
      }
  })
  }

}
