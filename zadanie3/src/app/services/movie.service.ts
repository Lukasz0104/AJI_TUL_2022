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

    constructor()
    {
        this.movies = (moviesData as Movie[]);
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
}
