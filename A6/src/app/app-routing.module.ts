import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BlogComponent} from './blog/blog.component';
import {PostComponent} from './post/post.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PostTableComponent} from './post-table/post-table.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {NewPostComponent} from './new-post/new-post.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'admin', component: PostTableComponent},
  {path: 'admin/post/:id', component: EditPostComponent},
  {path: 'admin/newPost', component: NewPostComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
