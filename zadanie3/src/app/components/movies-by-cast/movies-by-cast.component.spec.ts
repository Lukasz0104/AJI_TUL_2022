import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesByCastComponent } from './movies-by-cast.component';

describe('MoviesByCastComponent', () =>
{
    let component: MoviesByCastComponent;
    let fixture: ComponentFixture<MoviesByCastComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [MoviesByCastComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MoviesByCastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
