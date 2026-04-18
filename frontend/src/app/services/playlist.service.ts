import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'http://localhost:8000/api/playlists/';

  constructor(private http: HttpClient) { }


  private getHeaders() {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPlaylists(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  getPlaylist(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  createPlaylist(title: string, description: string = ''): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, { title, description });
  }

  updatePlaylist(id: number, data: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  addTrackToPlaylist(playlistId: number, trackId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}${playlistId}/tracks/`, { track_id: trackId });
  }

  removeTrackFromPlaylist(playlistId: number, trackId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${playlistId}/tracks/`, {
      body: { track_id: trackId }
    });
  }
}