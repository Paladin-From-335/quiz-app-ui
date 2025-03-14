import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuizItem} from '../model/QuizItem';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = "http://localhost:8087/quiz-creator"; //post

  constructor(private http: HttpClient) {
  }

  quizData!: Pick<QuizItem, 'quizName' | 'questions'>;

  getQuizByPublicId(publicQuizId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${publicQuizId}`);
  }


  createQuiz(quizData: Pick<QuizItem, 'quizName' | 'questions'>): Observable<any> {
    return this.http.post<any>(this.apiUrl, quizData);
  }

}
