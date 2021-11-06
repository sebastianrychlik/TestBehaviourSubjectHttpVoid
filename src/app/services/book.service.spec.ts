import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestScheduler } from 'rxjs/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { BookComponent } from '../book/book.component';
import { of } from 'rxjs';

describe('BookService', () => {
  let service: BookService, httpTestingController: HttpTestingController;
  let component: BookComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = new BookComponent(service);
  });
  // afterEach(() => {
  //   service = null;
  //   component = null;
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method: httpGetBook', () => {
    it('should be called updateBook method..', () => {
      component.ngOnInit();
      expect(service.updateBook).toHaveBeenCalled();
    });

    it('should call the `updateBook` method on the `BookService`', () => {
      const spy = spyOn(service, 'updateBook');
      service.httpGetBook();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Observable book$ tests', () => {
    let scheduler: TestScheduler;

    beforeEach(
      () =>
        (scheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        }))
    );
    it('should be emited an Observable (type Book) by `book$`', () => {
      const source = {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      } as Book;

      scheduler.run(({ expectObservable }) => {
        service.updateBook(source);
        const expectedMarable = '(a|)';
        const expected$ = of(source);
        expectObservable(service.book$).toBe(expectedMarable, expected$);
      });
    });
  });
});
