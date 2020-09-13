import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  public artista: any = {};
  public topTracks: any[] = [];
  public loading = false;
  public loadingTracks = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this.activateRoute.params.subscribe(params => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit(): void {
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtist(id).subscribe(
      artista => {
        this.artista = artista;
        this.loading = false;
      }
    );
  }

  getTopTracks(id: string) {
    this.loadingTracks = true;
    this.spotify.getTopTracks(id).subscribe(
      tracks => {
        this.topTracks = tracks;
        this.loadingTracks = false;
      });
  }

}
