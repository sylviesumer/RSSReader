import React, { Component } from "react";
import { View, Text, Button, Pressable, FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { observer } from "mobx-react";
import { inject } from "mobx-react";
import { MaterialIcons } from "@expo/vector-icons";

keyExtractor = ({ url }) => url;

@inject("store")
@observer
export default class FeedList extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
        title: 'Feed List',
        headerTintColor: '#000',
        headerStyle: {
            // backgroundColor: '#fafafa'
        },
        headerRight: () => (<MaterialIcons onPress={() => navigation.navigate('AddFeed')} name="add" size={32}  />)
    })
  }
  handleFeedPress = (feed) => {
    const { store, navigation } = this.props;
    store.selectFeed(feed);
    navigation.navigate('FeedDetail', {feedUrl: feed.url})
  }
  renderItem = ({item}) => {
    const { navigation: { navigate }} = this.props;
    const {title} = item;
    return (
        <TouchableHighlight onPress={() => this.handleFeedPress(item)}>
            <View style={styles.item}>
                <Text>{title}</Text>
            </View>
        </TouchableHighlight>
    )
  }
  render() {
    const { store, navigation } = this.props;
    const { feeds } = store;
    return (
      <View style={styles.container}>
        <FlatList data={feeds} renderItem={this.renderItem} keyExtractor={keyExtractor} />
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

