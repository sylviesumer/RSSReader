import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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

import { fetchFeed, removeFeed, selectEntry } from "../actions";

keyExtractor = ({ url }) => url;


@inject("store")
@observer
export default class FeedDetail extends Component {
  state = {
    loading: false,
    entry: null
  }
  componentDidMount() {
    const { store, navigation, route } = this.props;
    const { params } = route;
    this.setState({loading: true});
    const feed = fetchFeed(store.selectedFeed.url);
    this.setState({loading: false});
    this.setState({entry: feed.entry});
    navigation.setOptions({
      headerRight: () => (<MaterialIcons onPress={() => {removeFeed(params.feedUrl);navigation.goBack()}} name="delete" size={32}  />)
  })
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
