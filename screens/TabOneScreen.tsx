// import * as React from 'react';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image, TouchableOpacity, Linking, Modal} from 'react-native';
import { Text, View } from '../components/Themed';
import API from '../API'
import { WebView } from 'react-native-webview';
import ImageSlider from 'react-native-image-slider';

const api = API.create()

export default class TabOneScreen extends Component {

  constructor() {
    super();
    this.state = {
        profile: '',
        txtStatus: '',
        modalQr: false,
        qrUrl: '',
        payStatus: '',
        numpay: '',
        isPayrender : '',
        type_save : '',
        gallary: []
    }
  }

  componentDidMount =async()=> {
    await this.getProFile()
    this.getStatus()
    this.getMemPay()
    this.getNumpay()
    this.setGallary()
  }

  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    // console.log(user)
    if(user){
      let users = JSON.parse(user)
      let profiles = await api.getProfile(users.user_id)
    //console.log(profiles)
      if(profiles.status === 200){
        this.setState({profile: profiles.data})
      }
    }else{
      this.props.navigation.navigate('Login')
    } 
  }



  getMemPay =async()=> {
    const {profile} =this.state
   
    // let yy = (new Date().getFullYear()) + 543   //2564
    // console.log(yy)

    let numpay = await api.getNumPay()
    if(numpay.status === 200){
      let numpas = numpay.data
      for(var i =0;i<numpas.length;i++){
             var yy = numpas[i].years_pay
             var type_save = numpas[i].type_save

      // console.log(yy)
      console.log(type_save)
    

        }
      }

      this.setState({type_save : type_save})


    let memberPay = await api.getMemberPay(profile.member_id)
    // console.log(memberPay)
      
    if(memberPay.status === 200){
      var isPay = false
      var bill_G_id_pay = 0
      var payStatus = 'รอรับชำระเงินคงสภาพ'
     
      for(var i=0;i<memberPay.data.length;i++){
        if(memberPay.data[i].YPay === yy){
          isPay = true
         // console.log(memberPay.data[i].bill_G_id)
          this.setState({bill_G_id_pay: memberPay.data[i].bill_G_id})
          this.setState({payStatus: 'รอรับชำระเงินคงสภาพ'})
          if(isPay){
            //console.log(memberPay.data[i].bill_G_id)
            if (memberPay.data[i].bill_G_id === 0){
            this.setState({payStatus: 'ชำระเงินแล้ว รอการแจ้งโอน'})
          }else{
            this.setState({payStatus: 'ชำระเงิน และแจ้งโอนแล้ว'})}
          }else{
            this.setState({payStatus: 'รอรับชำระเงินคงสภาพ'})
          }
        }
      }
      
      this.setState({isPayrender : isPay})
     
   
    }
  }



  getStatus =async()=> {
    const {profile} = this.state
    let status = await api.getStatus()
    // console.log(status)
    if(status.status === 200){
      let statusList = status.data
      for(var i =0;i<statusList.length;i++){
        if(statusList[i].status_id === profile.status_id){
          this.setState({txtStatus: statusList[i].status_name})
        }
      }
    }
  }

  getNumpay =async()=> {
    const {profile} = this.state
    let numpay = await api.getNumPay()
    if(numpay.status === 200){
      let numpas = numpay.data
      for(var i =0;i<numpas.length;i++){
        if((numpas[i].datefirst_pay == profile.datefirst_pay) && (numpas[i].yearsfirst_pay == profile.yearsfirst_pay)){
          let yy = 'ต้นปี'
          if(numpas[i].years_pay_num > 1){
            yy = 'ระหว่างปี'
          }
          let text = 'รอบ ต้นปี-'+numpas[i].years_pay+'  เรียกเก็บ '+numpas[i].mon4_years+' บาท'
          this.setState({numpay: text})
        }
      }
    }
  }

  pressQrcode(){
    const {profile} = this.state
    let url = 'http://ca-comil.online/aspdata/printrecive_QRAPI_App_php.php?member_id='+profile.member_id+'&dead_pay1='+profile.dead_pay1+'&dead_pay2='+profile.dead_pay2
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }




  pressTool(){
    const {profile} = this.state
    let url = 'http://ca-comil.online/aspdata/printrecive_tool_App_php.php?member_id='+profile.member_id+'&dead_pay1='+profile.dead_pay1+'&dead_pay2='+profile.dead_pay2
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }


  pressReciept(){
    const {profile} = this.state
    let url = 'http://ca-comil.online/aspdata/addmoneybefore_years.asp?member_id='+profile.member_id+'&dead_pay1='+profile.dead_pay1+'&dead_pay2='+profile.dead_pay2
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }





  pressshow_02(){
    const {profile} = this.state
    let url = 'http://ca-comil.com'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }


  pressshow_advertising(){
    const {profile} = this.state
    let url = 'http://ca-comil.net/aspdata/print_app_advertising.php'
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }




  renderProfile(){
    const { profile, payStatus, numpay , isPayrender , type_save } = this.state
    console.log('type_save =====' + type_save)
    if(profile !== ''){
      return (
        <View style={{alignItems: 'center', padding: 10}}>
          
          <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>

          <View style={styles.listDesc}>
            <Text style={{fontSize: 20}}>ยินดีต้อนรับ  สมาชิก สสอท. </Text>
          </View>
          <View style={styles.listDesc}>
            <Text style={{fontSize: 20}}>{profile.rang_name+' '+profile.name+' '+profile.lastname}</Text>
          </View>         

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}> </Text>
            <Text style={{fontSize: 15}}>หมายเลขฌาปนกิจ {profile.member_id}</Text>
          </View>


          <View style={styles.listDesc}>
            <Text style={styles.descTitle}> </Text>
            <Text style={{fontSize: 15}}>หมายเลขบัตรประชาชน {profile.id_13}</Text>
          </View>


          <View style={styles.listDesc}>
            <Text style={styles.descTitle}> </Text>
            <Text style={{fontSize: 15}}>สถานะสมาชิก  {this.state.txtStatus}</Text>
          </View>


          <View style={styles.listDesc}>           
           <Text style={styles.descTitle}>ศูนย์ประสานงาน</Text>
            <Text style={styles.descValue}>{profile.tumbon_id}</Text>
            <Text style={styles.descTitle}>ประเภทสมาชิก</Text>
            <Text style={styles.descValue}>{profile.position}</Text>
          </View>




          <View style={styles.listDesc}>
            <Text style={[styles.descTitle,{flex: 1}]}>รอบอนุมัติสมัครที่</Text>
            <Text style={styles.descValue}>{profile.datefirst_pay+'/'+profile.yearsfirst_pay}</Text>
            <Text style={[styles.descTitle,{flex: 1}]}>วันที่ส่งเงินคงสภาพ</Text>
            <Text style={styles.descValue}>{profile.date_continue}</Text>
          </View>
          {  profile.status_id === 1 &&
          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>เงินคงสภาพ</Text>
            <Text style={styles.descValue}>{numpay}</Text>
          </View>
          }
         {  profile.status_id === 1 &&
          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>สถานะการชำระ</Text>
            <Text style={styles.descValue}>{payStatus}</Text>
          </View>
          }
          { isPayrender === false && profile.tumbon_id === 10099 &&
           <TouchableOpacity onPress={()=> this.pressQrcode()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#ddd', width: '100%' }}>
            <Image source={require('./images/qrscan.png')} style={{width: 60, height: 60}} resizeMode="cover"/>
            <Text>สแกน QR เพื่อโอนเงินคงสภาพ</Text>
          </TouchableOpacity> 
           }

        { isPayrender === true && profile.tumbon_id === 10099 &&
           <TouchableOpacity onPress={()=> this.pressReciept()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#ddd', width: '100%' }}>
            <Image source={require('./images/Receipt-icon.png')} style={{width: 60, height: 60}} resizeMode="cover"/>
            <Text>ใบเสร็จรับเงิน</Text>
          </TouchableOpacity> 
           }           





          <TouchableOpacity onPress={()=> this.pressshow_advertising()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#9cbf23', width: '100%'}}>
            <Image source={require('./images/news3.jpg')} style={{width: 140 , height: 60}} resizeMode="cover"/>
          </TouchableOpacity>


          {   type_save === "1" &&
      
      <TouchableOpacity onPress={()=> this.pressTool()} style={{marginTop: 10 , alignItems: 'center' , backgroundColor : '#ffcccc', width: '100%' }}>
       <Image source={require('./images/text-edit-4.png')} style={{width: 60, height: 60}} resizeMode="cover"/>
       <Text>รายการเพิ่มเติม</Text>
     </TouchableOpacity> 
      }           


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

  setGallary(){
    let gr = [
      'http://ca-comil.net/images_slide/1.jpg',
      'http://ca-comil.net/images_slide/2.jpg',
      'http://ca-comil.net/images_slide/3.jpg',
      'http://ca-comil.net/images_slide/4.jpg'
    ]
    this.setState({gallary: gr})
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
        <View style={{width: '100%', height: 150}}>
          <ImageSlider 
            loopBothSides
            autoPlayWithInterval={5000}
            images={this.state.gallary}
          />
        </View>
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
              <Text style={{fontSize: 18, color: '#fff'}}>CLOSE</Text>
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

