import React from 'react';
import { StyleSheet, 
        Text, 
        View, 
        SafeAreaView, 
        ScrollView, 
        TouchableOpacity, 
        ActivityIndicator, Linking, Keyboard, Alert } from 'react-native';

import { SearchBar, Image } from 'react-native-elements'

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: '',
      text: '',
      isHidden: true,
      ab: 'https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg',
      isImage: true,
      viewMoreUrl: '',
      title: ''
    }
    
  }
  static navigationOptions = {
      title: 'Search',
      headerTintColor: '#777E8B',
      headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20
    },
  };

  handleData = () => {
    var text = this.state.text
    console.log(text)
    this.getDataFromApi(text)
    this.handleViewMore()
  }

  clearData = () => {
    this.setState({
      title: '',
      dataSource: '',
      ab: 'https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg',
      isLoading: false,
      isImage: false,
      viewMoreUrl: ('')
    })
    this.handleViewMore()
    Keyboard.dismiss()
  }

  handleViewMore = () => {
     if((this.state.isHidden == true)){
      console.log('hello amitabh pandey')
      this.setState({
        isHidden: false
      })
    }else {
      console.log('hello pappu pandey')
      this.setState({
        isHidden: true
      })
    }
  }

  getDataFromApi = (name) => {
    let newQuery = name
    const URL = `https://en.wikipedia.org/api/rest_v1/page/summary/`+(newQuery)
    return(
      fetch( URL )
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.title == 'Not found.') {
            
            this.setState({
              title: responseJson.title,
              dataSource: '',
              ab: 'https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg',
              isLoading: false,
              isImage: false,
              viewMoreUrl: ('')
            })

            Alert.alert('Data Not Found')

          }else {
          this.setState({
            title: '',
            isLoading: false,
            dataSource: responseJson,
            ab: responseJson.thumbnail.source,
            isImage: false,
            viewMoreUrl: (responseJson.content_urls.mobile.page)
          })
          }
        })
        .catch(error => console.log(error))
        
    )
    
  }

  render() {

    return (
      <SafeAreaView style = {styles.safeContainer}>
       <View style={styles.container}>
         <SearchBar 
         placeholder = "Search Anything" 
         autoCorrect false
         lightTheme round
         onChangeText={ (value) => { this.setState( {text: value} ) } }
         value={this.state.text}
         keyboardType='default'
         returnKeyType='search'
         onEndEditing={this.handleData}
         onClear={this.clearData}
         keyboardAppearance='default'
         />
       </View>

       <View style = {styles.imageViewContainer}>
       {!this.state.isHidden ?
          <Image 
          source={{uri: (this.state.ab)}} 
          style = {styles.imagesContainer} 
          resizeMode='contain'
          PlaceholderContent={<ActivityIndicator animating>
          </ActivityIndicator>}
          >
         </Image> :null
          }
          
        </View>

        <View style = {styles.btnContainer}>
          {!this.state.isHidden ?
          <TouchableOpacity
          onPress={()=>{
             Linking.openURL(this.state.viewMoreUrl)}}
          >
            <Text style={styles.btnText}>View More</Text>
          </TouchableOpacity> :null
          }
        </View>

        <View style={styles.textContainer}>
        {!this.state.isHidden ?
          <ScrollView>
          <Text style = {styles.textStyle}>
            {this.state.dataSource.extract}
          </Text>
          </ScrollView>: null
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 0.2,
    marginLeft: 5,
    marginRight:8,
    marginTop: 5,
  },
  imagesContainer: {
    height: 200,
    width: 350
  },
  imageViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 8,
    marginRight:8,

  },
  btnContainer: {
    flex: 0.1,
    marginTop: 5,
    marginLeft: 8,
    marginRight:8
  },
  textContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight:8

  },
  textStyle: {
    color: '#777E8B', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10, 
    textAlign: 'left'
  },
  btnText: {
    fontSize: 15,
    color:'#0A79DF',
    marginTop: 8,
    textAlign: 'left'
  }
});
