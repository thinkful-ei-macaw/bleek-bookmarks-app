'use strict';


function setErr (error) {
  this.error = error;
};

function findById (id) {
  //gets unique id properties value to find individual bm's
  return this.bookmarks.find(bookmark => bookmark.id === id);
};

function addBookmark (bookmark) {
  //name says it all; takes potential bookmark the user creates and push to existing list of bookmarks the user made before
  this.bookmarks.push(bookmark);
};

function findAndUpdate  (id, newBook) {
  const userBook = this.findById(id);
  Object.assign(userBook, newBook); 
};

function findAndDelete (id) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
};

export default {
  bookmarks: [],
  minRating: 0,
  setErr,
  addBookmark,
  findById,
  findAndDelete,
  findAndUpdate
};