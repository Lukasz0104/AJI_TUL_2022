import { Injectable } from '@angular/core';
import { FilterParams } from '../filter-params';
import { Movie } from '../movie';
import moviesData from './../../assets/movies.json';

@Injectable({
    providedIn: 'root'
})
export class MovieService
{
    movies: Movie[] = [];
    private readonly last100Movies: Movie[];

    constructor()
    {
        this.movies = (moviesData as Movie[]);
        this.last100Movies = this.movies.slice(-100);
    }

    loadMovies(count: number, params: FilterParams): Movie[]
    {
        return this.movies
            .filter(m => m.title.includes(params.title)
                && m.year >= params.prodYearAfter
                && m.year <= params.prodYearBefore
                && m.cast.some(c => c.includes(params.cast)))
            .slice(0, count);
    }

    getGenres(): string[]
    {
        let genres = new Set();
        this.last100Movies.map(m => m.genres.forEach(g => genres.add(g)));
        return <string[]>(Array.from(genres));
    }

    getMoviesForGenre(genre: string): any
    {
        return this.last100Movies.filter(m => m.genres.includes(genre));
    }

    getActors(): string[]
    {
        let actors = new Set();
        this.last100Movies.map(m => m.cast.forEach(actor => actors.add(actor)));
        return <string[]>(Array.from(actors));
    }

    getMoviesForActor(actor: string): string[]
    {
        return this.last100Movies.filter(m => m.cast.includes(actor)).map(m => m.title);
    }
}
