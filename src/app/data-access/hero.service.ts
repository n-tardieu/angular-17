import { Injectable } from '@angular/core';
import { HEROES } from './heroes.mock';
import { Hero } from '../hero';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(
    []
  );

  heroes$: Observable<Hero[]> = this.heroesSubject.asObservable();

  constructor() {
    this.heroesSubject.next(HEROES);
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.pipe(delay(1000));
  }

  getHero(id: number): any {
    return this.heroes$.pipe(
      map((heroes) => heroes.find((hero) => hero.id === id))
    );
  }

  addHero(hero: Hero): any {
    const heroes = this.heroesSubject.getValue();
    const lastHero = heroes[heroes.length - 1];
    const nextId = lastHero ? lastHero.id + 1 : 1;

    const heroWithId = { ...hero, id: nextId };
    heroes.push(heroWithId);
    this.heroesSubject.next(heroes);
  }

  updateHero(hero: Hero): Observable<Hero[]> {
    const heroes = this.heroesSubject.getValue();
    const index = heroes.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      heroes[index] = hero;
      this.heroesSubject.next(heroes);
    }
    return this.heroes$;
  }

  deleteHero(hero: Hero): any {
    const heroes = this.heroesSubject.getValue();
    const index = heroes.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      heroes.splice(index, 1);
      this.heroesSubject.next(heroes);
    }
  }
}
