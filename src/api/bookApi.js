// src/api/bookApi.js
import api from './api';

const bookApi = {
  // ---------------- Public endpoints ----------------
  
  getAllBooks: (params) => api.get('/book/list', { params }),

  getBookById: (id) => api.get(`/book/retrieve/${id}`),

  searchBooks: (query, pageable) => api.get('/book/search', { 
    params: { q: query, ...pageable } 
  }),

  getRecommendedBooks: (limit = 10) => api.get('/book/recommended-books', { params: { limit } }),

  getPopularBooks: (limit = 10) => api.get('/book/popular-books', { params: { limit } }),

  getNewCollection: (limit = 10) => api.get('/book/new-collection', { params: { limit } }),

  getBooksByCategory: (categoryId, pageable) => api.get(`/book/category/${categoryId}`, { params: pageable }),

  getAvailableBooks: (pageable) => api.get('/book/available', { params: pageable }),

  checkAvailability: (id) => api.get(`/book/${id}/is_available`),

  // ---------------- Admin-only endpoints ----------------

  createBook: (bookData) => api.post('/book/create', bookData),

  updateBook: (id, bookData) => api.put(`/book/edit/${id}`, bookData),

  updateBookAvailability: (id, availableCopies) => api.patch(`/book/${id}/availability`, null, { 
    params: { availableCopies } 
  }),

  deleteBook: (id) => api.delete(`/book/delete/${id}`),

  createBookWithFiles: (formData) => api.post('/book/create/file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

export default bookApi;
