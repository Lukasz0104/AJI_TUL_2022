import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movies-by-genres',
    templateUrl: './movies-by-genres.component.html'
})
export class MoviesByGenresComponent implements OnInit
{
    private _genres: string[] = [];
    private _moviesByGenre: Map<string, string[]> = new Map();

    public get genres()
    {
        return this._genres;
    }

    constructor(public movieService: MovieService) { }

    ngOnInit(): void
    {
        this.movieService.notify$.subscribe(() =>
        {
            this._genres = this.movieService.getGenres();

            for (let g of this._genres)
            {
                this._moviesByGenre.set(g, this.movieService.getMoviesForGenre(g));
            }
        })
    }

    getMovieForGenre(genre: string): string[]
    {
        return this._moviesByGenre.get(genre) || [];
    }
}
