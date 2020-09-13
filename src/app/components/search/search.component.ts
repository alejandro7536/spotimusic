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
  loading = false;

  constructor(
    private spotify: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.loading = true;
    console.log(termino);
    this.spotify.buscarArtista(termino).subscribe(
      data => {
        console.log('artistas', data);
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
        console.log(data);
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
}
