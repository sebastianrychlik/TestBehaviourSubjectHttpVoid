import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly _book = new BehaviorSubject<Book>({} as Book);
  readonly book$ = this._book.asObservable();

  constructor(private http: HttpClient) {}

  getBook(): Book {
    return this._book.getValue();
  }

  private _setBook(book: Book): void {
    this._book.next(book);
  }

  updateBook(book: Book): void {
    this._setBook({ ...this.getBook(), ...book });
  }

  public httpGetBook(): void {
    const httpOptions = {};
    this.http
      .get<Book>(`https://jsonplaceholder.typicode.com/todos/1`, httpOptions)
      .subscribe(
        (response: Book) => {
          this.updateBook(response);
        },
        (error: any) => {
          console.log(error);
          throw new Error('Error on Book endpoint');
        }
      );
  }
}
