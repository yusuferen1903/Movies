import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    public dialogRef: MatDialogRef<AddMoviesModalComponent>,
    private fb: FormBuilder,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.getMoviesinLs()
  }
  getMoviesinLs(){
    const itemsString = localStorage.getItem('movies');
    this.movies = JSON.parse(itemsString);
  }
  buildForm(){
    this.form = this.fb.group({
      Title: ['', Validators.required],
      imdb: ['', Validators.required],
      Actors: ['', Validators.required],
      Poster : ['', Validators.required],
      Year : ['', Validators.required],
      Genre: ['', Validators.required],
      Plot: ['', Validators.required]
    })
  }
  public close(value : any) {
    this.dialogRef.close(value);
  }
  submit (){
    for (const key of Object.keys(this.form.controls)) { 
      if (this.form.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        return;
      }}
    this.movies.push(this.form.value)
    const movies = JSON.stringify(this.movies);
    localStorage.setItem('movies', movies);
    
    // this.close(true)
  }
  cancel() {
    this.dialogRef.close({ response: null });
    this.close(false);
  }
}
