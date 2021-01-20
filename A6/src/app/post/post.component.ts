import {Component, OnInit} from '@angular/core';
import {BlogPost} from '../BlogPost';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  blogPosts: Array<BlogPost>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
