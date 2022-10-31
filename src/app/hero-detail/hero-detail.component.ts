import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';


import { Hero } from '../types/heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getHero();
  }

  getHero(): void {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getMyHero(heroId).subscribe((hero) => (this.hero = hero));
  }
  
  save(): void {
    if (this.hero) {
      this.heroService.updateMyHero(this.hero).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
