import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MoviesByCastComponent } from './components/movies-by-cast/movies-by-cast.component';
import { MoviesByGenresComponent } from './components/movies-by-genres/movies-by-genres.component';
import { MoviesTableComponent } from './components/movies-table/movies-table.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        MoviesTableComponent,
        MoviesByGenresComponent,
        MoviesByCastComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
