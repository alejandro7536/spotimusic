import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  playlists: any[] = [];
  loading = true;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    const timer$ = timer(5000).subscribe(() => {
      this.spotifyService.getTracksCristianos().subscribe(data => {
        this.playlists = data;
        this.loading = false;
      });
    });

  }

  verPlaylist(id: string) {
    this.router.navigate(['/playlist', id]);
  }

}
