import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image} from 'react-native';
import { Text, View } from '../components/Themed';
import API from '../API'

const api = API.create()

export default class TabTwoScreen extends Component {

  constructor() {
    super();
    this.state = {
        profile: '',
        txtStatus: '',
        payStatus: '',
    }
  }

  componentDidMount =async()=> {
    await this.getProFile()
    this.getStatus()
  }

  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    console.log(user)
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

  renderProfile(){
    const { profile } = this.state
    if(profile !== ''){
      return (
        <View style={{alignItems: 'center', padding: 10}}>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}></Text>
            <Text style={{fontSize: 20}}>{profile.rang_name+' '+profile.name+' '+profile.lastname}</Text>
          </View>
  
          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>หมายเลขฌาปนกิจ</Text>
            <Text style={styles.descValue}>{profile.member_id}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>หมายเลขบัตรประชาชน</Text>
            <Text style={styles.descValue}>{profile.id_13}</Text>
          </View>
         
          <Text style={{backgroundColor: '#ddd', width: '100%'}}>สถานะสมาชิก {this.state.txtStatus}</Text>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>วันเกิด</Text>
            <Text style={styles.descValue}>{profile.birth}</Text>
            <Text style={styles.descTitle}>เพศ</Text>
            <Text style={styles.descValue}>{profile.type_name222}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ประเภทสมาชิก</Text>
            <Text style={styles.descValue}>{profile.position}</Text>
            <Text style={styles.descTitle}>ศูนย์ประสานงาน</Text>
            <Text style={styles.descValue}>{profile.tumbon_id}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ที่อยู่</Text>
            <Text style={styles.descValue}>{profile.remark1}</Text>
          </View>



          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>โทรศัพท์มือถือ</Text>
            <Text style={styles.descValue}>{profile.tel}</Text>
          
            <Text style={styles.descTitle}>ผลการอนุมัติ</Text>
            <Text style={styles.descValue}>อนุมัติ</Text>
          </View>

          <View style={styles.listDesc}>
          <Text style={styles.descTitle}>วันที่สมัคร</Text>
            <Text style={styles.descValue}>{profile.date_first}</Text>
            <Text style={[styles.descTitle,{flex: 1}]}>วันที่อนุมัติ</Text>
            <Text style={styles.descValue}>{profile.date_first1}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={[styles.descTitle,{flex: 1}]}>รอบอนุมัติสมัครที่</Text>
            <Text style={styles.descValue}>{profile.datefirst_pay+'/'+profile.yearsfirst_pay}</Text>
            <Text style={[styles.descTitle,{flex: 1}]}>วันที่ส่งเงินคงสภาพ</Text>
            <Text style={styles.descValue}>{profile.date_continue}</Text>
          </View>

          <View style={styles.listDesc}>
              <Text style={styles.descTitle}>ชื่อสามีหรือภรรยา</Text>
            <Text style={styles.descValue}>{profile.hus_wife}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ชื่อผู้จัดการศพ</Text>
            <Text style={styles.descValue}>{profile.name_manag}</Text>
          </View>

          
          <Text style={{backgroundColor: '#ddd', width: '100%', textAlign: 'center'}}>ข้อมูลผู้รับเงินสงเคราะห์</Text>
          <View style={{backgroundColor: '#545454', width: '100%'}}>
            <View style={styles.titleListDead}>
              <Text style={{width: 40, textAlign: 'center'}}>ลำดับ</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>ชื่อ-สกุล</Text>
              <Text style={{width: 80, textAlign: 'center'}}>ความสัมพันธ์</Text>
              <Text style={{width: 80, textAlign: 'center'}}>เลข ปชช.</Text>
            </View>
            {profile.name_dead1 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>1</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead1}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re1}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead1_id13}</Text>
            </View>
            }
            {profile.name_dead2 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>2</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead2}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re2}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead2_id13}</Text>
            </View>
            }
            {profile.name_dead3 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>3</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead3}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re3}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead3_id13}</Text>
            </View>
            }
            {profile.name_dead4 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>4</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead4}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re4}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead4_id13}</Text>
            </View>
            }
            {profile.name_dead5 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>5</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead5}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re5}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead5_id13}</Text>
            </View>
            }
            {profile.name_dead6 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>6</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead6}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re6}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead6_id13}</Text>
            </View>
            }

          </View>


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
      <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 5, paddingHorizontal: 50}}>
              <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>
              <Text style={{fontSize: 30, marginLeft: 30, flex: 1}}>สสอท.</Text>
            </View>
        {this.renderProfile()}
      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    margin: 10,
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
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center'
  },
  listDesc:{
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'flex-start'
  },
  descTitle: {
    color: '#545454',
    marginRight: 5
  },
  descValue: {
    flex: 1
  },
  titleListDead: {
    flexDirection: 'row',
    backgroundColor: '#CCCCFF',
  }
});
