import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { height, width } from '../utils';

var styles = StyleSheet.create({
  tabItem: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

});

class CustomTabbar extends MaterialTopTabBar {
    render() {
        return (
            <ImageBackground style={{width, height: height*0.07, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
            {
                this.props.navigation.state.routes.map((element, i) => {
                  return (
                      <TouchableOpacity key={element.key} style={styles.tabItem} onPress={() => this.onPress(element.key, i)}>
                        <TabIcon iconName={element.key} focused={this.props.tabIndex == i}/>
                      </TouchableOpacity>
                  );
                })
            }
            </ImageBackground>
        )
    }

    onPress(key, index){
      if(this.props.loaded){
        this.props.dispatch({type: 'TAB-INDEX', tabIndex: index})
        Actions[key].call()
      }
    }
}

export default connect(CustomTabbar)
