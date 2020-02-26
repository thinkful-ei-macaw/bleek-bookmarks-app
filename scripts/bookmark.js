//'use strict';
import api from './api.js';
import STORE from './store.js';

const render = () => {
  let html = renderForm();
  html+= STORE.bookmarks.map(item => renderItem(item));
  $('main').html(html);
};

function bindEventListeners () {
  $('body').on('click', '.expand', event =>{
    const button = $(event.target);
    const id = button.data('id');
  });
  $('body').on('click', '.delete', event =>{
    const button = $(event.target);
    const id = button.data('id');
    api.deleteBookmark(id)
      .then(data => {
        ST;
      });
  });
  $('body').on('submit', 'form', event => {
    event.preventDefault();
    const title = event.target.title.value;
    const url = event.target.url.value;
    const rating = event.target.rating.value;
    const desc = event.target.desc.value;
    api.addBookmark({
      title, url, rating, desc
    })
      .then(item => {
        STORE.addBookmark(item);
        this.render();
      });
  });
}

function renderForm () {
  return `
    <form id="js-add-bookmark-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" class="form-control js-bookmark-title" placeholder="Enter a title" required aria-label="bookmark-title">
        </div>
        <div class="form-group">
          <label for="url">URL ('https://' is required)</label>
          <input type="url" name="url" class="form-control js-bookmark-url" placeholder="http(s)://" required aria-label="bookmark-url">
        </div>
        <div class="form-group">
          <label for="desc">Description</label>
          <input type="text" name="desc" class="form-control js-bookmark-description" placeholder="Enter a description..." required aria-label="bookmark-description">
        </div>
        <div class="form-group">
        <label for="rating">Rating</label>
        <select name="rating" class="js-bookmark-rating" aria-label="rating-dropdown">
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        </div>
        <div>
        <button type="submit" class="btn-add-bookmark-button">Submit</button>
        </div>  
      </form>   
    `;
}

function renderItem (item) {
  return `
    <li>
      <h2>${item.title}</h2> 
      <a>${item.url}</a>
      <span>${item.rating}</span>
      <button data-id=${item.id} class='expand'>Expand</button>
    </li>
    `;
} 

function renderExpandedItem (item) {
  return `
    <li>
      <h2>${item.title}</h2> 
      <a>${item.url}</a>
      <span>${item.rating}</span>
      <p>${item.desc}</p>
      <button data-id=${item.id} class='submit'>Delete</button>
    </li>
    `;
} 
export default{
  render,
  bindEventListeners,
};