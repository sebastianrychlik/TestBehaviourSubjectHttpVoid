import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { BookComponent } from '../book/book.component';

describe('BookService', () => {
  let service: BookService, httpTestingController: HttpTestingController;
  let component: BookComponent;

  const expected = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  } as Book;

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
});
