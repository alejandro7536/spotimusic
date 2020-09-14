import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public artistas: any[] = [];
  public tracks: any[] = [];
  public loading = false;
  public trackSelected: any = null;

  constructor(
    private spotify: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.loading = true;
    this.spotify.buscarArtista(termino).subscribe(
      data => {
        this.artistas = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.artistas = [];
      }
    );
    this.spotify.buscarTracks(termino).subscribe(
      data => {
        this.tracks = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.artistas = [];
      }
    );
  }

  verArtista(id: string) {
    this.router.navigate(['/artist', id]);

  }

  selecTrack(track: any) {
    this.trackSelected = track;
    console.log(track);

  }
}
