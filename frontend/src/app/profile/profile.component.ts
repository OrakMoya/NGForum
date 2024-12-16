import { Component, inject } from '@angular/core';
import { Post } from '../types';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-profile',
  imports: [PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  postService = inject(PostsService);
  authService = inject(AuthService);

  myPosts: Post[] = [];

  constructor(){
    this.postService.getPostsByMe()
      .subscribe(
        (posts) => {this.myPosts = posts;}
      )

  }

}
