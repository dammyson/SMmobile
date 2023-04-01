// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, TouchableHighlight, FlatList, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, Avatar } from 'react-native-elements'
import Modal, { ModalContent } from 'react-native-modals';


import color from '../../component/color'


export default class Merchants extends Component {
  constructor(props) {
    super(props);
    this.state = {
        merchant: 'ay345',
        items: [],
        visible: false,
        view_balance: false,
        data: '',
        qrCode: '',
        selected_category:0,
        visible_del_merchant: false,
    };
}


  componentWillMount() {

  }

  render() {

    return (

      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontWeight: '900', marginTop: 20 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: 20 }}>
              <Icon
                name="arrowleft"
                size={30}
                type='antdesign'
                color={color.slide_color_dark}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ color: "#000", fontWeight: '700', fontSize: 16, }}>Saved</Text>
            </View>
            <View style={{ width: 40 }}></View>
          </View>

          <Button onPress={() =>  this.props.navigation.navigate('addbank')} style={styles.buttonContainer} block iconLeft>
            <Icon
              name="add"
              size={30}
              type='materia-icon'
              color='#fff'
            />
            <Text style={{ color: '#fdfdfd', fontWeight: '600', }}>Add Merchant</Text>
          </Button>

          <View style={styles.mainContent}>
            <FlatList
              style={{ paddingBottom: 5 }}
              data={categories}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />

          </View>





        </SafeAreaView>


        <Modal
          visible={this.state.visible_del_merchant}
        >
          <ModalContent style={styles.modal}>
            <View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 1, paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => this.setState({ visible_del_merchant: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                  <Icon
                    name="close"
                    size={20}
                    type='antdesign'
                    color="#fff"
                  />
                </TouchableOpacity>

              </View>
              <View style={styles.delavartar}>
                <Avatar
                  source={require('../../assets/bank.png')}
                  size="large"
                  icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                  overlayContainerStyle={{ backgroundColor: 'white', }}
                  onPress={() => console.log("Works!")}
                  containerStyle={{ borderRadius: 15, }}
                />
              </View>


              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'center', paddingBottom: 10, marginTop: 25, }}>Delete ?</Text>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, marginLeft: 10, marginRight: 10, }}>Are you sure you want to delete Ayobami from your list</Text>
              <View style={{ flexDirection: 'row', justifyContent:'center' }}>
                <Button style={styles.modalbuttonContainer} block iconLeft>
                  <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Yes </Text>
                </Button>
                <Button style={styles.modalTansButtonContainer} block iconLeft>
                  <Text style={{ color: color.button_blue, fontWeight: '400' }}>No </Text>
                </Button>
              </View>

            </View>
          </ModalContent>
        </Modal>
      </View>
    );
  }

  _handleCategorySelect = (index) => { this.setState({ selected_category: index }); }
  renderItem = ({ item, }) => {
    return (
  
        <TouchableOpacity style={this.state.selected_category === item.id ?
          styles.blackcardo : styles.blackcard}
          onPress={() => this._handleCategorySelect(item.id)} underlayColor="red">
           <View style={styles.avartar}>
                <Avatar
                  source={require('../../assets/bank.png')}
                  size="small"
                  icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                  overlayContainerStyle={{ backgroundColor: 'white', }}
                  onPress={() => console.log("Works!")}
                  containerStyle={{ borderRadius: 15, }}
                />
              </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bank}>{item.bank}</Text>
            <Text style={styles.number}>{item.number}</Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ visible_del_merchant: true })}  style={styles.delbuttonContainer}>
            <Icon
              name="trash"
              size={20}
              type='font-awesome'
              color='#fff'
            />
          </TouchableOpacity>
        </TouchableOpacity>
     
    )

  }
}
var categories = [
  {
    id: 1,
    bank: 'Access Bank',
    number: '3082501546',
    name: 'Ayeni Ayobami',

  },
  {
    id: 2,
    bank: 'Access Bank',
    number: '3082501546',
    name: 'Ayeni Ayobami',
  },
  {
    id: 3,
    bank: 'Access Bank',
    number: '3082501546',
    name: 'Ayeni Ayobami',
  },
  {
    id: 4,
    bank: 'Access Bank',
    number: '3082501546',
    name: 'Ayeni Ayobami',
  },
  {
    id: 5,
    bank: 'Access Bank',
    number: '3082501546',
    name: 'Ayeni Ayobami',
  }
];
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
  input: {
    height: 45,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    color: '#3E3E3E',
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#d1d1d1',
    borderColor: '#ffffff',

  },
  buttonContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 15,
    backgroundColor: color.button_blue
  },
  whiteButtonContainer: {
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 15,
  },
  sideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  body: {
    flex: 1,

  },
  actionbutton: {
    marginTop: 7,
    marginBottom: 7,
    marginRight: 13,
    marginLeft: 30,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Montserrat-bold'
  },
  title: {
    marginTop: 27,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold'
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    margin: 40,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 13,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: color.button_blue
  },
  blackcard: {
    borderRadius: 15,
    margin: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row'

  },

  bank: {
    fontSize: 15,
    color: '#2e2e2e',
    fontFamily: 'Montserrat-Bold'
  },
  number: {
    fontSize: 15,
    color: '#2e2e2e',
    fontFamily: 'Montserrat-Regular'
  },
  name: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#2e2e2e'
  },
  blackcardo: {
    borderRadius: 15,
    margin: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary_color,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row'

  },
  delbuttonContainer: {
    flexDirection: 'row',
    backgroundColor: color.primary_color,
    marginTop: 1,
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avartar: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
},

modal: {
  width: Dimensions.get('window').width - 60,

},
modalbuttonContainer: {
  backgroundColor: color.slide_color_dark,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 15,
  marginTop: 15,
  marginBottom: 30,
  flex:1
},
modalTansButtonContainer: {
 borderColor: color.button_blue,
 borderWidth:1,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 15,
  marginTop: 15,
  marginBottom: 30,
  backgroundColor:'transparent',
  flex:1
},
borderStyleBase: {
  width: 30,
  height: 45
},

borderStyleHighLighted: {
  borderColor: "red",
},
delavartar: {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
},
});

