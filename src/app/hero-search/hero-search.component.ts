import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {  combineLatest, debounce, debounceTime, distinctUntilChanged, filter, map, Observable, retry, startWith, switchMap, tap } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../types/heroes';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  result!: Observable<Hero[]>;
  term: FormControl = new FormControl('');


  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.result = this.term.valueChanges.pipe(
      map((search) => search.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      filter((search) => search !== ''),
      switchMap((term) =>
        this.heroService.searchHeroes(term).pipe(retry(2), startWith([]))
      )
    );
  }
}
