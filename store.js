import { observable, action, makeObservable, toJS } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reaction } from "mobx";

class Store {
    @observable feeds = [];
    @observable selectedFeed = null;
    @observable selectedEntry = null;

    constructor() {
        makeObservable(this);
        this.loadFeeds();
        
        reaction(
            () => this.feeds,
            (feeds) => {
            console.log('Feeds changed:', toJS(feeds));
            }
        );
    }

    @action
    async loadFeeds() {
        try {
            const sFeeds = await AsyncStorage.getItem('@feeds');
            this.feeds = JSON.parse(sFeeds) || [];
        } catch (error) {
            console.error('Error loading feeds:', error);
        }
    }

    async _persistFeeds() {
        try {
            await AsyncStorage.setItem('@feeds', JSON.stringify(this.feeds));
        } catch (error) {
            console.error('Error persisting feeds:', error);
        }
    }

    @action
    async addFeed(url, feed) { 
        this.feeds.push({
            url,
            entry: feed.entry,
            title: feed.title,
            updated: feed.updated
        });
        await this._persistFeeds();
    }

    @action
    async removeFeed(url) {
        this.feeds = this.feeds.filter((f) => f.url !== url);
        await this._persistFeeds();
    }

    @action
    selectFeed(feed) {
        this.selectedFeed = feed;
    }

    @action
    selectEntry(entry) {
        this.selectedEntry = entry;
    }
}
 
const store = new Store();
export default store;

