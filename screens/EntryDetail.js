import React, { Component } from "react";
import { WebView } from 'react-native-webview';
import { observer } from "mobx-react";
import { inject } from "mobx-react";



@inject("store")
@observer
export default class EntryDetail extends Component {
  render() {
    const { store } = this.props;
    const { selectedEntry } = store;
    console.log(selectedEntry)
    return (
      <WebView source={{uri: selectedEntry.url}} />
    );
  }
}
