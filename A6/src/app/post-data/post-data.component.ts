import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogPost} from '../BlogPost';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnInit, OnDestroy {
  querySub: any;
  post: BlogPost;
  commentName: string;
  commentText: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.postService.getPostById(params.id).subscribe((value) => {
        this.post = value;
        this.post.views += 1;
        this.postService.updatePost(this.post._id, this.post).subscribe();
      });
    });
  }

  submitComment(): void {
    const comment = {
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    };
    this.post.comments.push(comment);
    this.postService
      .updatePost(this.route.snapshot.params.id, this.post)
      .subscribe((x) => {
        this.commentName = '';
        this.commentText = '';
      });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
