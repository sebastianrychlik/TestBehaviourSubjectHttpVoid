import { fakeAsync, TestBed, tick } from '@angular/core/testing';
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method: httpGetBook', () => {
    let httpMock: HttpTestingController;

    it('should be called updateBook method..', fakeAsync(() => {
      const response = {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      } as Book;
      jasmine.clock().install();
      const spy = spyOn(service, 'updateBook');
      component.ngOnInit();
      let bookRequest = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      bookRequest.flush(response);
      jasmine.clock().tick(1000);
      expect(spy).toHaveBeenCalled();
      jasmine.clock().uninstall();
    }));

    it('should call the `updateBook` method on the `BookService`', fakeAsync(() => {
      const response = {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      } as Book;
      jasmine.clock().install();
      const spy = spyOn(service, 'updateBook');
      service.httpGetBook();
      let bookRequest = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      bookRequest.flush(response);
      jasmine.clock().tick(2000);
      expect(spy).toHaveBeenCalled();
      jasmine.clock().uninstall();
    }));
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
      // scheduler.run(({ expectObservable }) => {
      //   service.updateBook(source);
      //   expectObservable(service.book$).toBe('(a)', { a: source });
      // });
      scheduler.run(({ expectObservable }) => {
        service.updateBook(source);
        const expectedMarable = '(a)';
        const expected = { a: source };
        expectObservable(service.book$).toBe(expectedMarable, expected);
      });
    });
  });
});
