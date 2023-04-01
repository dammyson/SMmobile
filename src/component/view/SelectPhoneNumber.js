// React native and others libraries imports
import React, { Component } from 'react';
import { PermissionsAndroid, Platform, FlatList, Dimensions, TextInput, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { Icon, colors } from 'react-native-elements'

import color from '../color'
import Contacts from 'react-native-contacts';


export default class SelectPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_list: [],
      loading: false,
      search: '',
    };
    this.arrayholder = [];
  }


  async componentWillMount() {
    await this.getContact()
  }

  async getContact() {
    if (Platform.OS === "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts."
      }).then(response => {
        if(response == "granted"){
         this.loadContacts();
        }
      })
    } else {
      console.warn("Permission to access contacts has been granted 3");
      this.loadContacts();
    }
  }

loadContacts() {
    Contacts.getAll((err, contacts) => {
        if (err === "denied") {
            console.warn("Permission to access contacts was denied");
        } else {
            console.warn(contacts)
            this.setState({ contact_list: contacts, show_contacts: true });
            this.arrayholder = contacts;
        }
    });

    Contacts.getCount(count => {
        this.setState({ searchPlaceholder: `Search ${count} contacts` });
    });
}


searchFilterFunction = search => {
    this.setState({ search });
    const newData = this.arrayholder.filter(item => {
        const itemData = `${item.givenName.toUpperCase()}`;
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    this.setState({
        contact_list: newData,
    });

};

  render() {
    const { onClose, items } = this.props;
  
    return (
      <View style={styles.backgroundImage}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
        <View style={styles.body}>
          <View style={{ flex: 1 }}>
          <View style={{marginLeft:20, marginRight: 20, flexDirection: 'row', alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'left', paddingBottom: 10, marginTop: 25, flex: 1 }}>Select Phone Number </Text>
              <TouchableOpacity onPress={() => onClose()} style={{ marginLeft: 10, backgroundColor: '#fff' }}>
                <Icon
                  name="close"
                  size={20}
                  type='antdesign'
                  color="#000"
                />
              </TouchableOpacity>

            </View>
        <View style={{flex: 1, marginTop: 5, backgroundColor:'#F8F8F8' }}>
            <TextInput
              placeholder="search contact"
              placeholderTextColor='#d1d1d1'
              returnKeyType="next"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.search_input}
              maxLength={10}
              onChangeText={this.searchFilterFunction}
            />
            <View style={{ paddingTop: 1, paddingBottom: 10, flex: 1, }}>
              <FlatList
                style={{ paddingBottom: 5 }}
                data={this.state.contact_list}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
              />
            </View>
          </View>
          </View>
        </View>
      </View>

    );
  }




  _handleCategorySelect = (index) => {
    const { onSelect, } = this.props;
    onSelect(index);
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginLeft: 20, marginRight: 20, marginBottom: 10,marginTop:10 }}
        onPress={() => this._handleCategorySelect(item)} underlayColor="red">
        <View style={{ flex:1, flexDirection:'row' }}>
            <View  style={{ height: 30, width:30,  backgroundColor:color.secondary_color, justifyContent:'center', alignItems:'center' }}>
            <Text  style={{ color:color.white, fontFamily: 'Poppins-SemiBold', fontSize:20 }}>
              {item.givenName == null || item.givenName==""? '?': item.givenName.substr(item.givenName.length - 1).toUpperCase()}</Text>
         </View>
        <View style={{ flex: 1, }}>
          <Text style={styles.nameList}>
            {item.givenName == null || item.givenName==""? '': item.givenName.toUpperCase() }  {item.familyName == null || item.familyName==""? '': item.familyName.toUpperCase()}
            
            </Text>
          <Text style={styles.numberList}>

            {
            item.phoneNumbers.length> 0 ? 
            item.phoneNumbers[0].number == null 
            || item.phoneNumbers[0].number == "" ? 
            '' : item.phoneNumbers[0].number
            : ""}
            
            </Text>
        </View>
        <View  style={{ height: 30, width:30,   justifyContent:'center', alignItems:'center' }}>
           
         </View>
        </View>

      </TouchableOpacity>

    )

  }
}


SelectPhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
 
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  mainbody: {
    width: Dimensions.get('window').width,
    flex: 1,
    marginRight: 13,
    marginLeft: 13,


  },
  title: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
  },
  textInputContainer: {
    marginRight: 25,
    marginLeft: 25,
  },
  input: {
    height: 65,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12
  },

  nameList: {
    fontSize: 13,
    color: '#272065',
    flex: 1,
    marginLeft: 15,
    marginBottom:10,
    fontFamily: 'Poppins-SemiBold',
  },
  numberList: {
    fontSize: 12,
    color: '#272065',
    flex: 1,
    marginLeft: 15,
    fontFamily: 'Poppins-Regular',
  },
  modal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "#fff"

  },
  search_input: {
    height: 40,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    borderColor: '#000',
    borderWidth: 0.8,

  },
});

