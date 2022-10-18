import { Injectable } from '@angular/core';
import { each, filter, includes, map, some, take, takeRight } from 'lodash-es';
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
        this.last100Movies = takeRight(this.movies, 100);
    }

    loadMovies(count: number, params: FilterParams): Movie[]
    {
        return take(filter(this.movies, (m) => m.title.includes(params.title)
            && m.year >= params.prodYearAfter
            && m.year <= params.prodYearBefore
            && some(m.cast, (c) => includes(c, params.cast))), count);
    }

    getGenres(): string[]
    {
        let genres = new Set();
        each(this.last100Movies, (m) => each(m.genres, (g) => genres.add(g)));
        return <string[]>(Array.from(genres));
    }

    getMoviesForGenre(genre: string): any
    {
        return filter(this.last100Movies, (m) => includes(m.genres, genre));
    }

    getActors(): string[]
    {
        let actors = new Set();
        each(this.last100Movies, (m) => each(m.cast, (a) => actors.add(a)));
        return <string[]>(Array.from(actors));
    }

    getMoviesForActor(actor: string): string[]
    {
        return map(filter(this.last100Movies, (m) => includes(m.cast, actor)), (m: Movie) => m.title);
    }
}
