import { Injectable } from '@angular/core';
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
        this.movies = (moviesData as Movie[]).reverse();
    }

    loadMovies(count: number): Movie[]
    {
        return this.movies.slice(0, count);
    }
}
