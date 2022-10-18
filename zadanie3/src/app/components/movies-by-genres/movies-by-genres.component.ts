import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movies-by-genres',
    templateUrl: './movies-by-genres.component.html',
    styleUrls: ['./movies-by-genres.component.css']
})
export class MoviesByGenresComponent
{
    private _genres: string[];

    public get genres()
    {
        return this._genres;
    }

    constructor(public movieService: MovieService)
    {
        this._genres = movieService.getGenres();
    }
}
