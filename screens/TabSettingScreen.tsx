// import * as React from 'react';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image, TouchableOpacity, Linking, Modal} from 'react-native';
import { Text, View } from '../components/Themed';
import API from '../API'
import { WebView } from 'react-native-webview';

const api = API.create()

export default class TabSettingScreen  extends Component {

  constructor() {
    super();
    this.state = {
        profile: '',
        txtStatus: '',
        modalQr: false,
        qrUrl: '',
        payStatus: '',
        numpay: '',

        gallary: []
    }
  }

  componentDidMount =async()=> {
    await this.getProFile()

  }

  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    // console.log(user)
    if(user){
      let users = JSON.parse(user)
      let profiles = await api.getProfile(users.user_id)
    console.log(profiles)
      if(profiles.status === 200){
        this.setState({profile: profiles.data})
      }
    }else{
      this.props.navigation.navigate('Login')
    } 
  }





  pressshow_02(){
    const {profile} = this.state
    let url = 'http://ca-comil.online/aspdata/addeditpass_app_inside.asp?member_id='+profile.member_id
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }






  renderProfile(){
    const { profile, payStatus, numpay } = this.state
    if(profile !== ''){
      return (
        <View style={{alignItems: 'center', padding: 10}}>
          
          <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>

          <View style={styles.listDesc}>
            <Text style={{fontSize: 20}}>แก้ไขข้อมูลลงทะเบียน  สมาชิก สสอท. </Text>
          </View>
          <View style={styles.listDesc}>
            <Text style={{fontSize: 20}}>{profile.rang_name+' '+profile.name+' '+profile.lastname}</Text>
          </View>         

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}> </Text>
            <Text style={{fontSize: 20}}>หมายเลขฌาปนกิจ {profile.member_id}</Text>
          </View>



          <TouchableOpacity onPress={()=> this.pressshow_02()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#ddd', width: '100%'}}>
            <Image source={require('./images/text-edit-4.png')} style={{width: 60, height: 60}} resizeMode="cover"/>
            <Text>แก้ไขข้อมูลลงทะเบียน สสอท.</Text>
          </TouchableOpacity>


        </View>
      )
    }else{
      return <Text>Please Wait .........</Text>
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      title: 'HOME',
    };
  }



  render() {
    // React.useLayoutEffect(() => {
    //   navigation.setOptions({
    //     headerLeft: () => (
    //       <Text>MENU</Text>
    //     ),
    //   });
    // }, [navigation]);
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {this.renderProfile()}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalQr}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
        >
          <WebView source={{ uri: this.state.qrUrl }} />
          <View style={{backgroundColor: '#fff', padding: 20}}>
            <TouchableOpacity onPress={()=> this.setState({modalQr: false})} style={styles.btClose}>
              <Text style={{fontSize: 18, color: '#fff'}}>ปิดหน้านี้</Text>
            </TouchableOpacity>
          </View>
        </Modal>

    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    // margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  images: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  listDesc:{
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center'
  },
  descTitle: {
    color: '#545454',
    marginRight: 5
  },
  descValue: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btClose: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10
  }
});

