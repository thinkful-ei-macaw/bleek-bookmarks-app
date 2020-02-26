//'use strict';
import api from './api.js';
import STORE from './store.js';
import bookmark from './bookmark.js';

function main () {
  api.getBookmarks() 
    .then(data => {
      data.map(item => STORE.addBookmark(item));
      bookmark.render();
    });
  bookmark.bindEventListeners();
}
$(main);