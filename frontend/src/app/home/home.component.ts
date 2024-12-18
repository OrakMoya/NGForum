import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { NewPostFormComponent } from '../new-post-form/new-post-form.component';
import { AuthService } from '../auth.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  imports: [NewPostFormComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  postsService = inject(PostsService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  posts = computed(() => {
    let posts = this.postsService.posts();
    posts?.sort((a, b) => b.timestamp - a.timestamp);
    return posts;
  });

  constructor() {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => this.postsService.refreshPosts());
  }
}