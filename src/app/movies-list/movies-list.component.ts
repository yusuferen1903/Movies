import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { AddMoviesModalComponent } from '../modal/add-movies-modal/add-movies-modal.component';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
const toastErrorandSuccess: Partial<IndividualConfig> = {
  timeOut: 3000
};
const toastInfo: Partial<IndividualConfig> = {
  timeOut: 0
};
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  id: string;
  movies: any[] = [];
  years: number[] = [];
  imdbValues: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  filterImdb: any | null = null;
  filterYear: any | null = null;
  filteredMovies: any[] = [];
  filterGenre: string | null = null;
  filterTitle: string | null = null;
  sortBy: string = 'yearDescending';
  genres: any[] = [{ value: 'Action', label: 'Aksiyon' },
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
    private dialog: MatDialog,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.queryParamMap.get('q') || null;
  }
  dialogRef: MatDialogRef<ConfirmModalComponent>;
  ngOnInit(): void {
    this.filterTitle = this.id
    this.getMoviesinLs()
    this.getYears()
  }
  //filtreleme için 1900 den itibaren yılları çeker
  getYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  applyFilter() {
    //Başlığa , Yıla , Imdb Puanına ve Türe göre filtreleme yapar
    let filteredByYear = this.filterYear && this.filterYear !== "null" ? this.movies.filter(movie => movie.Year == this.filterYear) : this.movies;
    let filteredByImdb = this.filterImdb && this.filterImdb !== "null" ? filteredByYear.filter(movie => parseFloat(movie.imdb) >= this.filterImdb) : filteredByYear;
    let filteredByGenre = this.filterGenre && this.filterGenre !== "null" ? filteredByImdb.filter(movie => movie.Genre.includes(this.filterGenre)) : filteredByImdb;
    let filteredByTitle = this.filterTitle && this.filterTitle !== "null" ? filteredByGenre.filter(movie => movie.Title.toLowerCase().includes(this.filterTitle.toLowerCase())) : filteredByGenre;
    //Yıl ve Imdb olarak Azalana veya Artana göre sıralama yapar
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
        filteredByTitle.sort((a, b) => {
          //Yıllar aynı ise imdb yüksek olanı öne getirir
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

  //Filmleri Çeker ve Default dizilim için filtrelemeye sokar
  getMoviesinLs() {
    const itemsString = localStorage.getItem('movies');
    this.movies = JSON.parse(itemsString);
    this.applyFilter()
  }
  //Güncelleme modalını açar
  edit(movie) {
    const dialogRef = this.dialog.open(AddMoviesModalComponent, {
      width: '800px',
      //Güncellenecek filmin datasını modala yollar
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

  //Filmi silme modalını açar
  deleteMovie(movieTitle) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: "Filmi Sil",
        message: "Silmek istediğinize emin misiniz ?",
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      //Eğer silme modalından onay gelirse ilgili filmi movie dizisinden kaldırır ve ls'e set seder.
      if (result) {
        var toasterInfo = this.toastr.info('Lütfen Bekleyin', `İşlem Sürüyor`, toastInfo);
        const updatedMovies = this.movies.filter(movie => movie.Title !== movieTitle);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        this.toastr.remove(toasterInfo.toastId)
        const toaster = this.toastr.success('Film Silindi', `İşlem Başarılı`, toastErrorandSuccess);
        this.ngOnInit()
      }
    })
  }

}
