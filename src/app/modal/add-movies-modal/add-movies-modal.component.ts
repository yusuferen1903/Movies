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
  constructor(
    public dialogRef: MatDialogRef<AddMoviesModalComponent>,
    private fb: FormBuilder,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }
  buildForm(){
    this.form = this.fb.group({
      movieName: ['', Validators.required],
      imdb: ['', Validators.required],
      artists: ['', Validators.required],
      movieImage : ['', Validators.required],
      movieDescription: ['', Validators.required]
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
    console.log(this.form.value);
    
    this.close(true)
  }
  cancel() {
    this.dialogRef.close({ response: null });
    this.close(false);
  }
}
