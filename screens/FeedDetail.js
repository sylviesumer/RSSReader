import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Pressable
} from "react-native";
import { observer } from "mobx-react";
import { inject } from "mobx-react";

import { fetchFeed, selectEntry } from "../actions";

keyExtractor = ({ url }) => url;


@inject("store")
@observer
export default class FeedDetail extends Component {
  state = {
    loading: false,
    entry: null
  }
  componentDidMount() {
    const { store } = this.props;
    this.setState({loading: true});
    const feed = fetchFeed(store.selectedFeed.url);
    this.setState({loading: false});
    this.setState({entry: feed.entry});
  }
  handleEntryPress(entry) {
    const { navigation: { navigate }} = this.props;
    selectEntry(entry);
    navigate('EntryDetail');
  }
  renderItem = ({item}) => {
    const { title } = item;
    return (
      <Pressable onPress={() => this.handleEntryPress(item)}>
        <View style={styles.item}>
            <Text>{title}</Text>
        </View>
      </Pressable>
    )
  }
  render() {
    const { entry, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator animating={loading} size="large"  /> }
       {!loading &&  <FlatList data={entry} renderItem={this.renderItem} keyExtractor={keyExtractor} />}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  item: {
    backgroundColor: '#fafafa',
    padding: 10,
    marginTop:10
  }
});
