import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movies-by-cast',
    templateUrl: './movies-by-cast.component.html'
})
export class MoviesByCastComponent implements OnInit
{
    private _actors: string[] = [];
    private _moviesByActor: Map<string, string[]> = new Map();

    public get actors()
    {
        return this._actors;
    }

    constructor(private movieService: MovieService) { }

    ngOnInit(): void
    {
        this.movieService.notify$.subscribe(() =>
        {
            this._actors = this.movieService.getActors();

            for (let actor of this._actors)
            {
                this._moviesByActor.set(actor, this.movieService.getMoviesForActor(actor));
            }
        })
    }

    public moviesForActor(actor: string): string[]
    {
        return this._moviesByActor.get(actor) || [];
    }
}
