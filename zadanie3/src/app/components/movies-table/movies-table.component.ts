import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movies-table',
    templateUrl: './movies-table.component.html',
    styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit
{
    movies: Movie[] = [];
    count = 10;

    constructor(private movieService: MovieService) { }

    ngOnInit(): void
    {
        this.movies = this.movieService.loadMovies(this.count);
        console.log(this.movies);
    }

    loadMoreMovies() : void
    {
        this.count += 10;
        this.movies = this.movieService.loadMovies(this.count);
    }

}
