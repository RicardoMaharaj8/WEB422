import {Component, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogPost} from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  formSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());
    this.postService.updatePost(this.blogPost._id, this.blogPost).subscribe();
    this.router.navigate(['admin']);
  }

  deletePost(): void {
    this.postService.deletePost(this.blogPost._id).subscribe();
    this.router.navigate(['admin']);
  }

  ngOnInit(): void {
    this.postService
      .getPostById(this.route.snapshot.params.id)
      .subscribe((x) => {
        this.blogPost = x;
        this.tags = this.blogPost.tags.toString();
      });
  }
}
