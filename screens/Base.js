import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button, SafeAreaView, TouchableOpacity } from 'react-native';



export default class Base extends React.Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: null,
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar  barStyle='default'></StatusBar>
        <View style={styles.container}>
        <Text style = {styles.textContainer}>Search Anything To Know</Text>
        </View>
        <View style = {styles.buttonViewContainer}>
            <TouchableOpacity 
            onPress={ () => {
                this.props.navigation.navigate("Search")
            }}>
                <Text style = {styles.btnContainer}>Go To Search</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#204969',
   // alignItems: 'center',
   // justifyContent: 'center',
  },
  textContainer: {
    color: 'white', 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginTop: 40, 
    textAlign: 'center'
  },
  btnContainer: {
    color: 'white', 
    fontSize: 30, 
    fontWeight: 'bold', 
    //marginBottom: 20, 
    textAlign: 'center',
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 40,
    backgroundColor: '#8ac6d1'
  },
  buttonViewContainer: {
    flex: 0.5,
    backgroundColor: '#204969',
    marginBottom: 20
  }
});