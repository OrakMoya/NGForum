import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-new-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.css'
})
export class NewPostFormComponent {
  postForm = new FormGroup({
    contents: new FormControl('', Validators.required)
  });

  constructor(private postService: PostsService) { }

  handleSubmit() {
    if (!this.postForm.value.contents) return;

    this.postService.addPost({
      contents: this.postForm.value.contents
    })
      .subscribe(() => {
        this.postForm.reset();
      });

  }
}
