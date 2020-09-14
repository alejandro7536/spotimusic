import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track: any = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.track);

  }

}
