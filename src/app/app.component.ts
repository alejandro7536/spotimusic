import { Component } from '@angular/core';
import { interval, timer } from 'rxjs';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spotiapp';
  year = new Date().getFullYear();

  constructor(
    private spotifyService: SpotifyService
  ) {
    this.spotifyService.login();
    const timerlogin$ = interval(3600000).subscribe(() => {
      this.spotifyService.login();
      console.log('Se renovó el token');
    });

  }
}
