import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  public list: any = {};
  public tracks: any[] = [];
  loading = false;
  loadingTracks = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private spotify: SpotifyService

  ) {
    this.activateRoute.params.subscribe(params => {
      this.getPlayList(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit(): void {
  }

  getPlayList(id: string) {
    this.loading = true;
    this.spotify.getPlaylist(id).subscribe(
      list => {
        this.list = list;
        this.loading = false;
      }
    );
  }

  getTopTracks(id: string) {
    this.loadingTracks = true;
    this.spotify.getPlaylist(id).pipe(
      map(list => list.tracks.items)
    ).subscribe(
      tracks => {
        this.tracks = tracks;
        this.loadingTracks = false;
      }
    );
  }

}
