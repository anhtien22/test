import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  sideBarOpen = true;

  constructor() {}

  ngOnInit() {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
