import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movies-by-cast',
    templateUrl: './movies-by-cast.component.html',
    styleUrls: ['./movies-by-cast.component.css']
})
export class MoviesByCastComponent
{
    private readonly _actors: string[];

    public get actors()
    {
        return this._actors;
    }

    constructor(protected movieService: MovieService)
    {
        this._actors = this.movieService.getActors();
    }

}
