import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { observer } from "mobx-react";
import { inject } from "mobx-react";



@inject("store")
@observer
export default class EntryDetail extends Component {
  render() {
    const {
      navigation,
      route: { params },
    } = this.props;
    return (
      <View>
        <Text>Feed Detail</Text>
      </View>
    );
  }
}
