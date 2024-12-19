import { Component, computed, inject } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { PostComponent } from '../post/post.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  imports: [PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  postService = inject(PostsService);
  authService = inject(AuthService);
  titleService = inject(Title);

  myPosts = computed(() => {
    let posts = this.postService.posts()?.filter(
      (post) => post.author_id == this.authService.user()?.id
    ) ?? [];
    posts = posts.sort((a, b) => b.timestamp - a.timestamp);
    return posts;
  }
  );

  constructor() {
    this.postService.refreshPosts();
  }
}
