import { Component, computed, input } from '@angular/core';
import { Post } from '../types';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  post = input.required<Post>();
  date = computed(() => new Date(this.post().timestamp * 1000));

}
