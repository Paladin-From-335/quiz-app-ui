import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {HomeComponent} from './general-components/home/home.component';
import {AboutComponent} from './general-components/about/about.component';
import {QuizCreationComponent} from './quiz-feature/components/creation/quiz-creation/quiz-creation.component';
import {QuestionInputComponent} from './quiz-feature/components/creation/question-input/question-input.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'create', component: QuizCreationComponent},
  {path: 'question', component: QuestionInputComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes)]
};
