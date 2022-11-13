import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { each, filter, includes, map, some, take, takeRight } from 'lodash-es';
import { catchError, retry, Subject } from 'rxjs';
import { FilterParams } from '../filter-params';
import { Movie } from '../movie';

@Injectable({
    providedIn: 'root'
})
export class MovieService
{
    private readonly GITHUB_URL = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';
    private readonly FALLBACK_URL = './assets/movies.json';

    private movies: Movie[] = [];
    private last100Movies: Movie[] = [];

    public notify$ = new Subject<void>();

    constructor(private http: HttpClient)
    {
        this.http.get<Movie[]>(this.GITHUB_URL)
            .pipe(
                retry(2),
                catchError(() =>
                {
                    return this.http.get<Movie[]>(this.FALLBACK_URL);
                }))
            .subscribe(data =>
            {
                this.movies = data;
                this.last100Movies = takeRight(this.movies, 100);

                this.notify$.next();
            });
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
        each(this.last100Movies, (movie) => each(movie.genres, (genre) => genres.add(genre)));
        return <string[]>(Array.from(genres));
    }

    getMoviesForGenre(genre: string): any
    {
        return filter(this.last100Movies, (movie) => includes(movie.genres, genre));
    }

    getActors(): string[]
    {
        let actors = new Set();
        each(this.last100Movies, (moive) => each(moive.cast, (actor) => actors.add(actor)));
        return <string[]>(Array.from(actors));
    }

    getMoviesForActor(actor: string): string[]
    {
        return map(filter(this.last100Movies, (movie) => includes(movie.cast, actor)), (movie: Movie) => movie.title);
    }
}
