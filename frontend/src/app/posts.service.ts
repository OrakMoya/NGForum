import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Post } from './types';
import { BehaviorSubject, EMPTY, Observable, ReplaySubject, share, shareReplay, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';


interface PostsState {
  posts: Post[] | null | undefined
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts$ = new Subject<Post[]>();
  private authService = inject(AuthService);

  private state = signal<PostsState>({
    posts: null
  });

  posts = computed(() => this.state().posts);

  constructor(private httpClient: HttpClient) {
    this.posts$
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((posts) => {
        this.state.update((state) => ({ ...state, posts: posts }))
      });
  }

  public refreshPosts() {
    this.httpClient
      .get<Post[]>("/api/posts")
      .pipe(shareReplay())
      .subscribe((data) => this.posts$.next(data));
  }


  public addPost(props: { contents: string }) {
    let promise = this.httpClient
      .post<HttpResponse<Object>>("/api/posts", props)
      .pipe(shareReplay());
    promise.subscribe(() => this.refreshPosts());
    return promise;
  }

  public updatePost(props: { id: string, contents: string }) {
    let promise = this.httpClient
      .patch("/api/posts", props)
      .pipe(shareReplay());
    promise.subscribe(() => this.refreshPosts());
    return promise;
  }

  public deletePost(id: string) {
    let promise = this.httpClient
      .delete("/api/posts/" + id)
      .pipe(shareReplay());
    promise.subscribe((res) => this.refreshPosts());
    return promise;
  }

  public getPostsByMe() {
    return this.httpClient
      .get<Post[]>("/api/posts", { params: { authorId: this.authService.user()?.id ?? '' } })
      .pipe(shareReplay())
  }
}
