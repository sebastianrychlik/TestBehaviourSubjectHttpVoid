import { Book } from '../models/book.model';

export const mockResponse = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
} as Book;

export const bookApiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
