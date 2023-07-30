import { Component, ElementRef, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
const toastErrorandSuccess: Partial<IndividualConfig> = {
  timeOut: 3000
};
const toastInfo: Partial<IndividualConfig> = {
  timeOut: 0
};
@Component({
  selector: 'app-add-movies-modal',
  templateUrl: './add-movies-modal.component.html',
  styleUrls: ['./add-movies-modal.component.scss']
})
export class AddMoviesModalComponent implements OnInit {
  form: FormGroup;
  movies: any[] = [];
  genres: any[] = [
    { value: 'Action', label: 'Aksiyon' },
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
    { value: 'Western', label: 'Batılı' }
  ];
  oldMovieTitle
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddMoviesModalComponent>,
    private fb: FormBuilder,
    private el: ElementRef,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.getMoviesinLs()
    this.oldMovieTitle = this.data?.movie.Title
    
  }
  getMoviesinLs(){
    const itemsString = localStorage.getItem('movies');
    this.movies = JSON.parse(itemsString);
  }
  buildForm(){
    this.form = this.fb.group({
      Title: [this.data?.movie.Title || '', Validators.required],
      imdb: [this.data?.movie.imdb || '', Validators.required],
      Actors: [this.data?.movie.Actors || '', Validators.required],
      Poster : [this.data?.movie.Poster || '', Validators.required],
      Year : [this.data?.movie.Year || '', Validators.required],
      Genre: [this.data?.movie.Genre || '', Validators.required],
      Plot: [this.data?.movie.Plot, Validators.required]
    })
  }
  public close(value : any) {
    this.dialogRef.close(value);
  }
  submit (){
    var toasterInfo = this.toastr.info('Lütfen Bekleyin', `İşlem Sürüyor`, toastInfo);
    for (const key of Object.keys(this.form.controls)) { 
      if (this.form.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        this.toastr.remove(toasterInfo.toastId)
        const toaster = this.toastr.error('Zorunlu Alanları Doldurun', `Hata`, toastErrorandSuccess);
        return;
      }}
    if (!this.data) {
      this.movies.push(this.form.value)
      const movies = JSON.stringify(this.movies);
      localStorage.setItem('movies', movies);
      this.dialogRef.close(true);
      this.toastr.remove(toasterInfo.toastId)
      const toaster = this.toastr.success('Film Oluşturuldu', `İşlem Başarılı`, toastErrorandSuccess);
    } else {      
      this.movies = this.movies.filter(movie => movie.Title !== this.oldMovieTitle);
      this.movies.push(this.form.value)
      const movies = JSON.stringify(this.movies);
      localStorage.setItem('movies', movies);
      this.toastr.remove(toasterInfo.toastId)
      const toaster = this.toastr.success('Film Güncellendi', `İşlem Başarılı`, toastErrorandSuccess);
      this.dialogRef.close(true);
      this.ngOnInit()
    }
  }
  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-_ğüıöçşĞÜÖÇŞ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  cancel() {
    this.dialogRef.close({ response: null });
    this.close(false);
  }
}
