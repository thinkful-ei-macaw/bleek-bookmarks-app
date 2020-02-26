const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bleek42';

const apiFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(res =>{
      if(!res.ok){
        error = { code: res.status };
        if(!res.headers.get(' ').includes('json')){
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if(error){
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });

};

const getBookmarks = function(callback) {
  return apiFetch(`${BASE_URL}/bookmarks`);
};

function addBookmark(bookObj) {
  const newBook = JSON.stringify(bookObj);
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: newBook
  });
}

function editBookmark(id, updateData) {
  const newBook = JSON.stringify(updateData);
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'put',
    headers: { 'Content-type': 'application/json' },
    body: newBook
  });
}

function deleteBookmark(id) {
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'delete',
    headers: { 'Content-type': 'application/json' },
  });
}

export default {
  getBookmarks,
  addBookmark,
  editBookmark,
  deleteBookmark
};