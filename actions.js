import store from './store';
// import xml2json from 'simple-xml2json';
import news from './news.json';
import tech from './tech.json';

export function fetchFeed(url) {
    switch(url) {
        case 'news':
            return {
                entry: news.items,
                title: news.title,
                updated: null
            }
        case 'tech':
            return {
                entry: tech.items,
                title: tech.title,
                upldated: null,
            }
        default:
            return {
                entry: news.items,
                title: news.title,
                updated: null
            }
    }
    
}

export function selectFeed(feed) {
    store.selectFeed(feed);
}

export function selectEntry(entry) {
    store.selectEntry(entry);
}

export function addFeed(url, feed) {
    store.addFeed(url, feed);
}

export function removeFeed(url) {
    store.removeFeed(url);
}