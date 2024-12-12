import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './types';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


interface PostsState {
  posts: Post[] | null | undefined
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts$ = new Subject<Post[]>();

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
      .subscribe((data) => this.posts$.next(data));
  }


  public addPost(props: { contents: string }) {
    let replay = new ReplaySubject();
    this.httpClient
      .post("/api/posts", props)
      .subscribe((res) => {
        this.refreshPosts();
        replay.next(res);
      });
    return replay;
  }
}
