//'use strict';
import api from './api.js';
import STORE from './store.js';
import store from './store.js';

const render = () => {
  let html = renderForm();
  html+= STORE.bookmarks.map(item => { 
    if(item.rating < store.minRating){
      return;
    }
    if(item.expanded){
      return renderExpandedItem(item);
    }else{
      return renderItem(item);
    }
  });
  $('main').html(html);
};

function bindEventListeners () {
  $('body').on('click', '.expand', event =>{
    const button = $(event.target);
    const id = button.data('id');
    const item = STORE.findById(id);
    if(item.expanded){
      item.expanded = false;
    } else {
      item.expanded = true;
    }
    this.render();
  });
  $('body').on('click', '.delete', event =>{
    const button = $(event.target);
    const id = button.data('id');
    api.deleteBookmark(id)
      .then(data => {
        STORE.findAndDelete(id);
        this.render();
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
  $('body').on('change', '.display-by-rating', event => {
    event.preventDefault();
    store.minRating = event.target.value;
    this.render();
  })
}

function renderForm () {
  return `
  <h1>Brandon's Bookmark WebApp</h1>
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
        <div>
        <select class="display-by-rating" aria-label="rating-dropdown">
          <option value="0" >No Filter</option>
          <option id="one" value="1">1 Star</option>
          <option id="two" value="2">2 Stars</option>
          <option id="three" value="3">3 Stars</option>
          <option id="four" value="4">4 Stars</option>
          <option id="five" value="5">5 Stars</option>
        </select>
        </div>
      </form>   
    `;
}

function renderItem (item) {
  return `
    <li>
      <h2>${item.title}</h2> 
      <a href="${item.url}" target="_new">${item.url}</a>
      <span>${item.rating}</span>
      <button type="button" data-id="${item.id}" class='expand'>Expand</button>
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
      <button type="button" data-id="${item.id}" class='expand'>Collapse</button>
      <button type="button" data-id="${item.id}" class='delete'>Delete</button>
    </li>
    `;
}

export default{
  render,
  bindEventListeners
};