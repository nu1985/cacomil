import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image, Alert} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import API from '../API'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

const api = API.create()

export default class TabThreeScreen extends Component {

  constructor() {
    super();
    this.state = {
      profile: '',
      moneyList: '',
      payList: [],
      amountList: 0,
    }
  }

  componentDidMount() {
    this.getProFile()
    this.getMemPay()
    this.getMemPayTwo()
  }


  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    // console.log(user)
    if(user){
      let users = JSON.parse(user)
      let profiles = await api.getProfile(users.user_id)
   // console.log(profiles)
      if(profiles.status === 200){
        this.setState({profile: profiles.data})
      }
    }else{
      this.props.navigation.navigate('Login')
    } 
  }




  getMemPay =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    if(user){
      let users = JSON.parse(user)
      let memberPay = await api.getMemberPay(users.user_id)
      // console.log(memberPay.data)
      if(memberPay.status === 200){
        this.setState({moneyList: memberPay.data})
      }
    } 
  }

  getMemPayTwo =async()=> {
    let pay = await api.getMemberPayTwo()
    // console.log(pay.data)
    if(pay.status === 200){
      this.setState({payList: pay.data})
    }
  }

  // ส่วนที่กำหนด เงิน money_pay4
  renderMoney(){
    const { moneyList, amountList , profile} = this.state
    if(moneyList !== ''){
      let items = []
      let newAmt = 0
      let monfirst = 0

      for(var i=0;i<moneyList.length;i++){
        var monall = 0
        let dPay = moneyList[i].DPay
        let mPay = moneyList[i].MPay
        let yPay = moneyList[i].YPay
       
        if (i == 0 && moneyList[i].pay_type != 999) {
          dPay = profile.Ddate_first1
          mPay = profile.Mdate_first1
          yPay = profile.Ydate_first1
          monfirst = 1
          console.log(mPay)
          console.log(yPay)
        }

        if (moneyList[i].pay_type == 999) {
          dPay = moneyList[i].DPay
          mPay = moneyList[i].MPay
          yPay = moneyList[i].YPay
        }



        var money_pay4 = moneyList[i].money_pay4
        let status_bill_mem = moneyList[i].status_bill_mem
        if(status_bill_mem == 0 && money_pay4 > 0 ){
        monall = (moneyList[i].money_pay4+newAmt).toFixed(2)
        items.push(
          <View style={{width: '100%'}} key={'mone'+i}>
            <View style={[styles.titleListMoney,{backgroundColor:  '#fff'}]}>
              <Text style={[styles.descValue,{textAlign: 'left', padding: 3}]}>{moneyList[i].date_to_pay}</Text>
              <Text style={[styles.descValue,{padding: 3}]}>{moneyList[i].money_pay4.toFixed(2)}</Text>
              <Text style={[styles.descValue,{padding: 3}]}>-</Text>
              <Text style={[styles.descValue,{padding: 3}]}>{(moneyList[i].money_pay4+newAmt).toFixed(2)}</Text>
              {console.log((moneyList[i].money_pay4+newAmt).toFixed(2))}
              
            </View>
            {this.rederPaylist(dPay,mPay,yPay,money_pay4+newAmt)}
          </View>
        )
        newAmt = this.amtPaylist(dPay,mPay,yPay,money_pay4+newAmt)
        console.log(newAmt)

        }
      }
      
      return (
        <View style={{alignItems: 'center', flex: 1}}>
          <View style={[styles.listDesc,{backgroundColor:  '#545454'}]}>
            <Text style={{flex: 1, textAlign: 'center', color: '#fff'}}>ว.ด.ป.</Text>
            <Text style={{flex: 1, textAlign: 'center', color: '#fff'}}>จำนวนเงิน</Text>
            <Text style={{flex: 1, textAlign: 'center', color: '#fff'}}>จ่ายเงินสงเคราะห์</Text>
            <Text style={{flex: 1, textAlign: 'center', color: '#fff'}}>คงเหลือ</Text>
          </View>
          
          {items}
          
          {  newAmt != 0 &&
          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>เงินสงเคราะห์ล่วงหน้าคงเหลือ</Text>
            <Text style={styles.descValue}>{newAmt.toFixed(2)}</Text>
          </View>
          }
        </View>
      )
    }else{
      return <Text>โปรดคอยการทำงาน .........</Text>
    }
  }

  rederPaylist(dPay,mPay,yPay,moneys){
    const {payList} =this.state
    let newPay = []
    for(var i=0;i<payList.length;i++){
      if(payList[i].YPay === yPay){
        if(payList[i].MPay > mPay){
          newPay.push(payList[i])
        }else{
          if(payList[i].MPay === mPay && payList[i].DPay > dPay){
            newPay.push(payList[i])
          }
        }
      }
    }
    let items = []
    let amount = moneys
    for(var i=0;i<newPay.length;i++){
      amount = amount - newPay[i].money_pay3
      items.push(
        <View style={[styles.titleListMoney,{backgroundColor: '#ddd'}]} key={'pay'+i}>
          <Text style={[styles.descValue,{textAlign: 'left', padding: 3}]}>{newPay[i].date_to_pay}</Text>
          <Text style={[styles.descValue,{padding: 3}]}>-</Text>
          <Text style={[styles.descValue,{padding: 3}]}>{newPay[i].money_pay3.toFixed(2)}</Text>
          <Text style={[styles.descValue,{padding: 3}]}>{amount.toFixed(2)}</Text>
        </View>
      )
    }
    return items
  }

  amtPaylist(dPay,mPay,yPay,moneys){
    const {payList} =this.state
    let newPay = []
    for(var i=0;i<payList.length;i++){
      if(payList[i].YPay === yPay){
        if(payList[i].MPay > mPay){
          newPay.push(payList[i])
        }else{
          if(payList[i].MPay === mPay && payList[i].DPay > dPay){
            newPay.push(payList[i])
          }
        }
      }
    }
    let newAmt = 0
    let amount = moneys
    for(var i=0;i<newPay.length;i++){
      amount = amount - newPay[i].money_pay3
      if(i === newPay.length-1){
        newAmt = newAmt+amount
      }
    }
    return newAmt
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
        {this.renderMoney()}
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
    height: 100,
    width: 100,
    borderRadius: 50
  },
  listDesc:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
  },
  descTitle: {
    color: '#545454',
    marginRight: 5,
    flex: 1
  },
  descValue: {
    flex: 1,
    textAlign: "right"
  },
  titleListDead: {
    flexDirection: 'row'
  },
  titleListMoney: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
});