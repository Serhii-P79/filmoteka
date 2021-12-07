import { save, load } from './storage';

export const foundFilms = {
  currentPage: 1,
  total_pages: 0,
  arrayFilms: [],
};

export const myLibrary = {
  _watched: [], // просмотренные фильмы
  _queue: [], // добавленные в очередь

  // инициализация
  initializationLibrary() {
    this._readLibrary();
  },

  // вернуть просмотренне
  getWatched() {
    return this._watched;
  },

  // вернуть очередь
  getQueue() {
    return this._queue;
  },

  _saveWatched() {
    save('watched', this._watched);
  },

  _saveQueue() {
    save('queue', this._queue);
  },

  _readLibrary() {
    let dataLoad = load('watched');
    this._watched = dataLoad ? dataLoad : [];
    dataLoad = load('queue');
    this._queue = dataLoad ? dataLoad : [];
  },

  // просмотренные фильмы
  addWatched(movie = {}) {
    // movie.id
    if (!this._watched.find(element => element.id === movie.id)) {
      this._watched.push(movie);
      this._saveWatched();
    }
    this._deleteQueue(movie);
  },

  // очередь
  addQueue(movie = {}) {
    if (!this._queue.find(element => element.id === movie.id)) {
      this._queue.push(movie);
      this._saveQueue();
    }
  },

  // удалить из очереди
  _deleteQueue(movie = {}) {
    this._queue.find((element, index) => {
      if (element.id === movie.id) {
        this._queue.splice(index, 1);
        this._saveQueue();
      }
    });
  },
};
