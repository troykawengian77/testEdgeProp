import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  Text, StatusBar,
  ImageBackground,
  Platform
} from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'native-base'

import { RATIO, width, height, headerHeight, FONT } from '../utils';


export default class CustomHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header androidStatusBarColor="#0996ff" iosBarStyle="dark-content" style={{ height: headerHeight, backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#0996ff', height: '100%', width: width + 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: '15%', height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={this.props.onLeft}>
            {this.props.left ? <IIcon name={this.props.left} size={16} color="#fff" /> : null }
          </TouchableOpacity>
          <View style={{ width: '70%', alignItems: 'center', justifyContent: 'center' }}>
            <Text numberOfLines={1} style={{flexWrap: 'wrap', fontSize: 16, color: '#fff' }}>{this.props.center}</Text>
          </View>
          <TouchableOpacity style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }} onPress={this.props.onRight}>
            {this.props.right ? <IIcon name={this.props.right} size={24 + FONT} color="#fff" /> : null }
            {/* <MIcon name={this.props.right} size={24 + FONT} color="#fff" /> */}
          </TouchableOpacity>
        </View>
      </Header>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
