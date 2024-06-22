import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { observer } from "mobx-react";
import { inject } from "mobx-react";

import { addFeed, fetchFeed } from "../actions";

@inject("store")
@observer
export default class AddFeed extends Component {
  state = {
    url: "news",
    loading: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      title: "Add Feed",
    });
  }

  handleChangeText = (url) => {
    this.setState({ url });
  };

  handleAddPress = () => {
    const { navigation } = this.props;
    const { url } = this.state;
    if (url.length > 0) {
      this.setState({loading: true});
      const feed = fetchFeed(url);
      addFeed(url, feed);
      this.setState({loading: false});
      navigation.goBack();
      
    }
  };

  render() {
    const {
      navigation,
      route: { params },
    } = this.props;
    const { url, loading, result } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.input}>
            <TextInput
              autoCorrect={false}
              value={url}
              style={styles.textInput}
              placeholder="Feed's url"
              clearButtonMode="always"
              onChangeText={this.handleChangeText}
            />
          </View>
          <Pressable styles={styles.button} onPress={this.handleAddPress}>
            {loading && <ActivityIndicator color="#fff" style={{ margin: 10 }} />}
            <Text>Add</Text>
          </Pressable>
        </View>
        <Text style={{marginTop:50,marginLeft:20}}>{url}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal:20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    marginRight: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#fff',
    flex: 1,

  },
  textInput: {
    color: "#000",
  },
  button: {
    flex: 1,
    marginRight:20,
  }
});
