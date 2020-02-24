'use strict';

const STORE = (function() {
    const setErr = function(error) {
        this.error = error;
    };

    const findById = (id) => {
        //gets unique id properties value to find individual bm's
        return this.bookmarks.find(bookmark => bookmark.id === id);
    };

    const addBookmark = (bookmark) => {
        //name says it all; takes potential bookmark the user creates and push to existing list of bookmarks the user made before
        this.bookmarks.push(bookmark);
    };

    const findAndUpdate = (id, newBook) => {
        const userBook = this.findById(id);
        Object.assign(userBook, newBook); 
    };

    const findAndDelete = (id) => {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    };

    return {
        bookmarks: [],
        minRating: 0,

        setErr,
        addBookmark,
        findById,
        findAndDelete,
        findAndUpdate
    };

};  























export default {
    
};