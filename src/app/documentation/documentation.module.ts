import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './components/faq/faq.component';
import { HelpComponent } from './components/help/help.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  declarations: [FaqComponent, HelpComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DocumentationModule {}
