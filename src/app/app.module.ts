import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { SortingVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
