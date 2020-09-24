import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });

    return this.http.get<any>(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe(
      map(data => data.albums.items)
    );
  }

  buscarArtista(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`).pipe(
      map(data => data.artists.items)
    );
  }

  buscarTracks(termino: string) {
    return this.getQuery(`search?q=${termino}&type=track`).pipe(
      map(data => data.tracks.items)
    );
  }

 getTracksCristianos() {

    return this.getQuery('search?q=cristiana&type=playlist').pipe(
      map(data => data.playlists.items)
    );
  }

  getPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`).pipe(
      map(data => data)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`).pipe(
      map(data => data)
    );
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data.tracks)
    );

  }

  login() {

    let spotifyUrl = `https://spoty-server-login.herokuapp.com/spotify/${environment.spotiappClientId}/${environment.spotiappClientSecret}`;

    this.http.get<any>(spotifyUrl).subscribe(data => {
      const token = `${data.token_type} ${data.access_token}`;
      localStorage.setItem('token', token);
      console.log('login success');
    });
  }


}
