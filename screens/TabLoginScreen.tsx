
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,ImageBackground,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,Modal } from 'react-native';
import API from '../API'
import { Text, View } from '../components/Themed';
import ImageSlider from 'react-native-image-slider';
import { WebView } from 'react-native-webview';

const api = API.create()

export default class TabLoginScreen extends Component {
  // const [valueUser, user] = React.useState('');
  // const [valuePassword, password] = React.useState('');

  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      gallary: [],
      modalForgot: false,

      cardId: '',
      telNo: '',
      userCode: '',
      newPassword: '',
      modalQr: false,
      qrUrl: '',
    }
  }

  componentDidMount(){
    this.setGallary()
  }

  setGallary(){
    let gr = [
      'http://ca-comil.net/images_slide/1.jpg',
      'http://ca-comil.net/images_slide/2.jpg',
      'http://ca-comil.net/images_slide/3.jpg',
      'http://ca-comil.net/images_slide/4.jpg'
    ]
    this.setState({gallary: gr})
  }

  onSignin =async()=> {

    if(this.state.user === '') return Alert.alert('','กรุณากรอกหมายเลขฌาปนกิจ')
    if(this.state.password === '') return Alert.alert('','กรุณากรอกรหัสผ่าน')

    console.log(this.state.user,this.state.password)
    let data = {
      username: this.state.user,
      password: this.state.password
    }
    
    let login = await api.login(data)
    console.log(login)
    if(login.status === 200){
      let user ={
        user: login.data,
        user_id: login.data.username
      }
      await AsyncStorage.setItem('userProject',JSON.stringify(user))
      this.props.navigation.navigate('Root')
    }else{
      Alert.alert('ไม่สามารถเข้าสู่ระบบได้',login.data.msg)
    }
    
    // let user ={
    //   user: "Test user",
    //   user_id: '230'
    // }
    // await AsyncStorage.setItem('userProject',JSON.stringify(user))
    // this.props.navigation.navigate('Root')
  }

  forgotPassword(){
    const {cardId,telNo,userCode,newPassword} =this.state
    console.log(cardId,telNo,userCode,newPassword)
    this.setState({modalForgot: false})
  }


  pressshow_01(){
    const {profile} = this.state
    let url = 'http://ca-comil.net/aspdata/print_app_first.php'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // ประชาสัมพันธ์ 01;
  }



  pressshow_02(){
    const {profile} = this.state
    let url = 'http://ca-comil.net/aspdata/print_app_PHP.php'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // ประชาสัมพันธ์ 01;
  }


  pressshow_03(){
    const {profile} = this.state
    let url = 'http://ca-comil.com'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }

 
  pressshow_04(){
    const {profile} = this.state
    let url = 'http://ca-comil.com/news_all.html'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }
 


  pressshow_howto(){
    const {profile} = this.state
    let url = 'http://ca-comil.net/aspdata/howto.html'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // ประชาสัมพันธ์ 01;
  }


  pressshow_lostpass(){
    const {profile} = this.state
    let url = 'https://ca-comil.online/addeditpass_app.asp'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }

  render(){
    return (<>
      <View style={{width: '100%', height: 50, marginTop: 20, backgroundColor: '#cc66ff', flexDirection: 'row', alignItems: 'center'}}>
      <ImageBackground  source={require('./images/bg.jpg')}  style={styles.imagebg}   > 
      <Image  source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/> 
      <Text onPress={()=> this.pressshow_01()} style={{fontSize: 30, marginLeft: 30, flex: 1}}>สสอท.</Text>
      </ImageBackground>     

      </View>


      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#ccffff'}}>



      
   
         <View style={styles.container}>


            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingHorizontal: 50}}>
              <Image source={require('./images/account.png')} style={styles.images} resizeMode="cover"/>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 30, flex: 1}}>เข้าสู่ระบบ สสอท.</Text>

            </View>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={{alignSelf: 'flex-start', paddingHorizontal: 50}}>
              <Text style={styles.title}>หมายเลขฌาปนกิจ</Text>
              <TextInput
                keyboardType="number-pad"
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({user: text})}
                value={this.state.user}
                placeholder="หมายเลขฌาปนกิจ"
              />

              <Text style={styles.title}>รหัสผ่าน</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({password: text})}
                value={this.state.password}
                placeholder="รหัสผ่าน"
                // autoFocus={true}
              />
            </View>
            
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />



             <View style={{width: '100%', height: 50, marginTop: 10, flexDirection: 'row', alignSelf: 'flex-start', paddingHorizontal: 50 ,  alignItems: 'stretch'}}>
     

            <TouchableOpacity onPress={()=> this.onSignin()} style={{paddingVertical: 10 , paddingHorizontal: 30, backgroundColor: 'green', borderRadius: 10}}>
              <Text style={{fontSize: 18, color: '#fff'}}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')} style={{paddingVertical: 10, paddingHorizontal: 30, marginLeft : 10 , backgroundColor: '#007bff', borderRadius: 10}}>
              <Text style={{fontSize: 18, color: '#fff'}}>ลงทะเบียน</Text>
            </TouchableOpacity>


            </View>    


            <View  style={{width: '30%', height: 20, marginTop: 10, flexDirection: 'row', alignItems: 'stretch'}} >

            </View >



          </View>

          <TouchableOpacity onPress={()=> this.pressshow_lostpass()} style={{paddingVertical: 10, paddingHorizontal: 20, marginBottom: 0 , backgroundColor: 'yellow' , borderRadius: 0 }}>
              <Text style={{fontSize: 18, color: '#000'}}>ลืมรหัสผ่าน ?</Text>
            </TouchableOpacity>

 
            <TouchableOpacity onPress={()=> this.pressshow_02()} style={{paddingVertical: 10, flexDirection: 'row', paddingHorizontal: 20, marginBottom: 0 , backgroundColor: '#cccccc' , marginLeft : 0 , borderRadius: 0 }}>
             <Text style={{fontSize: 18, color: '#000'}}>ประชาสัมพันธ์</Text>
            </TouchableOpacity> 
  


          <View style={{width: '100%', height: 150  ,alignItems : 'center'}}>
            <ImageSlider 
              loopBothSides
              autoPlayWithInterval={5000}
              images={this.state.gallary}
            />
          </View>

    
          <TouchableOpacity onPress={()=> this.pressshow_howto()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#cc99ff', width: '100%'}}>
            <Image source={require('./images/Information.svg.png')} style={{width: 70, height: 70}} resizeMode="cover"/>
            <Text>วิธีการใช้ แอปพลิเคชัน สสอท.</Text>
          </TouchableOpacity>

    
          <TouchableOpacity onPress={()=> this.pressshow_03()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#cc99ff', width: '100%'}}>
            <Image source={require('./images/www.png')} style={{width: 70, height: 60}} resizeMode="cover"/>
            <Text>เว็บ สสอท.</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.pressshow_04()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#cc99ff', width: '100%'}}>
            <Image source={require('./images/logo.png')} style={{width: 60, height: 60}} resizeMode="cover"/>
            <Text>ข่าว สสอท.</Text>
          </TouchableOpacity>     

  
         </ScrollView>

         <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalForgot}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
        >
          <View style={styles.centeredView}>
            {/* <View style={styles.modalView}> */}
              <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>
              <Text style={[{textAlign: 'center', color: '#000099'}]}>สำหรับสมาชิก ที่เคยลงทะเบียนในระบบ และลืมรหัสผ่าน</Text>
              <Text style={[{textAlign: 'center', color: '#000099'}]}>ต้องการรีเซตรหัสผ่านโปรดระบุข้อมูลให้ถูกต้อง</Text>
              <Text style={[{textAlign: 'center', color: '#000099'}]}>ตามที่เคยลงทะเบียน!</Text>

              <Text style={[styles.title,{marginTop: 20}]}>หมายเลข ปชช.</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({cardId: text})}
                value={this.state.cardId}
                placeholder="หมายเลข ปชช."
              />
              <Text style={[styles.title,{marginTop: 20}]}>หมายเลขโทรศัพท์</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({telNo: text})}
                value={this.state.telNo}
                placeholder="หมายเลขโทรศัพท์"
              />
              <Text style={[styles.title,{marginTop: 20}]}>หมายเลขฌาปนกิจ สสอท. (รหัสผู้ใช้)</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({userCode: text})}
                value={this.state.userCode}
                placeholder="หมายเลขฌาปนกิจ สสอท. (รหัสผู้ใช้)"
              />
              <Text style={[styles.title,{marginTop: 20}]}>รหัสผ่านใหม่</Text>
              <TextInput
                secureTextEntry={true}
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({newPassword: text})}
                value={this.state.newPassword}
                placeholder="รหัสผ่านใหม่"
              />

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={()=> this.setState({modalForgot: false,cardId: '',telNo: '',userCode: '',newPassword: ''})} style={{paddingVertical: 10, backgroundColor: '#FF4B2B', paddingHorizontal: 20, borderRadius: 5}}>
                  <Text style={{fontSize: 18, color: '#fff'}}>ยกเลิก</Text>
                </TouchableOpacity>
                <View style={{width: 20}}></View>
                <TouchableOpacity onPress={()=> this.forgotPassword()} style={{paddingVertical: 10, backgroundColor: '#007bff', paddingHorizontal: 20, borderRadius: 5}}>
                  <Text style={{fontSize: 18, color: '#fff'}}>รีเซตรหัสผ่าน</Text>
                </TouchableOpacity>
              </View>
          
            {/* </View> */}
          </View>
        </Modal>

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
              <Text style={{fontSize: 18, color: '#fff'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalQr2}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.") ยินดีต้อนรับสู่ สสอท.;
        }}
        >
          <WebView source={{ uri: 'http://ca-comil.net/aspdata/print_app_first.php'} } />
          <View style={{backgroundColor: '#fff', padding: 20}}>
            <TouchableOpacity onPress={()=> this.setState({modalQr2: false})} style={styles.btClose}>
              <Text style={{fontSize: 18, color: '#fff'}}>ปิดหน้านี้ เพื่อเข้าสู่ระบบ</Text>
            </TouchableOpacity>
          </View>
        </Modal>



      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      width: 300
    },
    separator: {
      marginVertical: 10,
      height: 1,
      width: '80%',
    },
    images: {
      width: 50,
      height: 50,
      borderRadius: 50
    },
    imagebg: {
      flex: 1,
      flexDirection: 'row',
      resizeMode: "cover",
      justifyContent: "center"
    },
    imagebg02: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },    
    btSignin: {
      padding: 5,
      backgroundColor: '#007bff'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    btClose: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: '#007bff',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10
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
  });
  
