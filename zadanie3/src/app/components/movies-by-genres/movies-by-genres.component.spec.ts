import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesByGenresComponent } from './movies-by-genres.component';

describe('MoviesByGenresComponent', () =>
{
    let component: MoviesByGenresComponent;
    let fixture: ComponentFixture<MoviesByGenresComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [MoviesByGenresComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MoviesByGenresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
