import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import store from './store';

import FeedList from './screens/FeedsList';
import FeedDetail from './screens/FeedDetail';
import EntryDetail from './screens/EntryDetail';
import AddFeed from './screens/AddFeed';

const Stack = createNativeStackNavigator();


const SatckNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="FeedList">
            <Stack.Screen name="FeedList" component={FeedList} />
            <Stack.Screen name="FeedDetail" component={FeedDetail} />
            <Stack.Screen name="EntryDetail" component={EntryDetail} /> 
            <Stack.Screen name="AddFeed" component={AddFeed} />
        </Stack.Navigator>
    );
}

export default SatckNavigator;