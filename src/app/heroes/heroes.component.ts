import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Hero } from '../types/heroes';
import { HeroService } from '../hero.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  @ViewChild('detail') detail!: TemplateRef<any>;
  myheroes!: Hero[];
  hero!: any;
  expanded=false
  newTodoForm = this.fb.group({
    heroName: '',
    body: '',
  });

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMyHeroes();
  }

  getMyHeroes(): void {
    this.heroService.getMyHeroes().subscribe((data) => (this.myheroes = data));
  }

  add(form: any): void {
    console.log(
      '🚀 ~ file: heroes.component.ts ~ line 33 ~ HeroesComponent ~ add ~ form',
      form
    );

    if (!this.newTodoForm.value.heroName) {
      return;
    }

    this.heroService.addMyHero(this.newTodoForm.value).subscribe((hero) => {
      this.myheroes.push(hero);
    });
  }

  delete(hero: any): void {
    this.myheroes = this.myheroes.filter((h) => h !== hero);
    this.heroService.deleteMyHero(hero.heroId).subscribe();
    this.dialog.closeAll();
  }

  save(): void {

    if (this.hero) {
      this.heroService.updateMyHero(this.hero).subscribe();
      this.dialog.closeAll();
      this.newTodoForm.reset();
      this.expanded=!this.expanded
    }
  }

  showDetail(todo: any) {
    this.hero = todo;
    this.newTodoForm.patchValue({
      heroName:todo.heroName,
      body: todo?.body
    })
    this.dialog.open(this.detail).afterClosed().subscribe(() =>this.newTodoForm.reset());
  }
  
}
