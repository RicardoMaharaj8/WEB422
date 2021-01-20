import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlogPost} from './BlogPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = process.env.API

  perPage = 6;

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(
      `${this.apiUrl}/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`
    );
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/posts', data);
  }

  updatePost(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/posts/' + id, data);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/posts/' + id);
  }

  getPosts(
    page: number,
    tag: string,
    category: string
  ): Observable<BlogPost[]> {
    let queryUrl = `${this.apiUrl}/posts?page=${page}&perPage=${this.perPage}`;
    if (tag !== null) {
      queryUrl += `&tag=${tag}`;
    }
    if (category !== null) {
      queryUrl += `&category=${category}`;
    }
    return this.http.get<BlogPost[]>(queryUrl);
  }

  getPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tags`);
  }
}
