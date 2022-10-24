import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilterParams } from 'src/app/filter-params';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movies-table',
    templateUrl: './movies-table.component.html',
    styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit, OnChanges
{
    movies: Movie[] = [];
    count = 10;

    @Input()
    params: FilterParams = new FilterParams();

    private _incrementValue = 10;

    public get incrementValue(): number
    {
        return this._incrementValue;
    }

    constructor(private movieService: MovieService) { }

    ngOnChanges(_changes: SimpleChanges): void
    {
        this.count = 10;
        this.loadMovies()
    }

    ngOnInit(): void
    {
        this.loadMovies();
    }

    loadMovies(): void
    {
        let res = this.movieService.loadMovies(this.count, this.params);
        this.movies = res;
    }

    loadMoreMovies(): void
    {
        this.count += this._incrementValue;
        this.movies = this.movieService.loadMovies(this.count, this.params);
    }

    isFilterParamsEmpty(): boolean
    {
        return this.params.cast === '' && this.params.prodYearAfter === 1900 && this.params.prodYearBefore === 2018 && this.params.title === '';
    }
}
