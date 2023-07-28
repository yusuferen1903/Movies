import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }
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

}
