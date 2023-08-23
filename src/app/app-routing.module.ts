import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTranscriptComponent } from './shared/components/book-transcript/book-transcript.component';

const routes: Routes = [
  {path: '', component: BookTranscriptComponent},
  {path: '**', redirectTo: 'home', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
