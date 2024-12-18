import { Component, computed, inject, input, model, output } from '@angular/core';
import { Post } from '../types';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  imports: [FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  authService = inject(AuthService);
  postsService = inject(PostsService);
  post = model.required<Post>();
  date = computed(() => new Date(this.post().timestamp * 1000));
  editing = false;
  editedContents = "";
  changed = output();

  startEdit() {
    this.editedContents = this.post().contents;
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    this.postsService.updatePost({
      id: this.post().id,
      contents: this.editedContents
    }).subscribe(() => {
      this.editing = false;
      this.post.update((post) => ({ ...post, contents: this.editedContents }));
      this.editedContents = "";
      this.changed.emit();
    });
  }

  deletePost() {
    this.postsService.deletePost(this.post().id)
      .subscribe(() => this.changed.emit())
  }

}
