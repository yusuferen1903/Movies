import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddMoviesModalComponent } from '../modal/add-movies-modal/add-movies-modal.component';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }
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
