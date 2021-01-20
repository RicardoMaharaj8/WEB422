import {Component, Input, OnInit} from '@angular/core';
import {BlogPost} from '../BlogPost';

@Component({
  selector: 'app-post-card',
  templateUrl: './app-post-card.component.html',
  styleUrls: ['./app-post-card.component.css'],
})
export class AppPostCardComponent implements OnInit {
  @Input() post: BlogPost;

  constructor() {
  }

  ngOnInit(): void {
  }
}
