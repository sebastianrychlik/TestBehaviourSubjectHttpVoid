import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestScheduler } from 'rxjs/testing';
import { BookService } from './book.service';
import { BookComponent } from '../book/book.component';
import { bookApiUrl, mockResponse } from './mock.book.test';

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
    it('should be called updateBook method..', fakeAsync(() => {
      jasmine.clock().install();
      const spy = spyOn(service, 'updateBook');
      component.ngOnInit();
      let bookRequest = httpTestingController.expectOne(bookApiUrl);
      bookRequest.flush(mockResponse);
      jasmine.clock().tick(10);
      expect(spy).toHaveBeenCalled();
      jasmine.clock().uninstall();
    }));

    it('should call the `updateBook` method on the `BookService`', fakeAsync(() => {
      jasmine.clock().install();
      const spy = spyOn(service, 'updateBook');
      service.httpGetBook();
      let bookRequest = httpTestingController.expectOne(bookApiUrl);
      bookRequest.flush(mockResponse);
      jasmine.clock().tick(10);
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
      // scheduler.run(({ expectObservable }) => {
      //   service.updateBook(mockResponse);
      //   expectObservable(service.book$).toBe('(a)', { a: mockResponse });
      // });
      scheduler.run(({ expectObservable }) => {
        service.updateBook(mockResponse);
        const expectedMarable = '(a)';
        const expected = { a: mockResponse };
        expectObservable(service.book$).toBe(expectedMarable, expected);
      });
    });
  });
});
