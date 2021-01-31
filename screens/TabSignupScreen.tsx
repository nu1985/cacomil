import Loading from '../components/Loading'
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,ImageBackground,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../API'
import { Text, View } from '../components/Themed';

const api = API.create()

export default class TabSignupScreen extends Component {
  // const [valueUser, user] = React.useState('');
  // const [valuePassword, password] = React.useState('');

  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      lname: '',
      id13: '',
      email: '',
      tel:'',
      user: '',
      password: '',
    }
  }




  onSignup_checklist =async()=> {

    if(this.state.name === '') return Alert.alert('','กรุณากรอกชื่อผู้ลงทะเบียน')
    if(this.state.id13 === '') return Alert.alert('','กรุณากรอกหมายเลข ปชช.')
    if(this.state.email === '') return Alert.alert('','กรุณากรอก Email')
    if(this.state.tel === '') return Alert.alert('','กรุณากรอกเบอร์โทร')
    if(this.state.user === '') return Alert.alert('','กรุณากรอกหมายเลขฌาปนกิจ')
    if(this.state.password === '') return Alert.alert('','กรุณากรอกรหัสผ่าน')

    await this.checkmember()   
   
  }

  


  checkmember =async()=> {  
    // Alert.alert('ท่านเคยลงทะเบียนแล้ว โปรดเข้าใช้งานระบบด้วย รหัสผู้ใช้ เดิม')
    
        let id = this.state.user 
        let id_13 = this.state.id13       
      
        let getProfile = await api.getProfile(id)
        console.log(id)
        console.log(getProfile.status)

        if(getProfile.status === 200){
          if(getProfile.data.id_13 === id_13){
                // Alert.alert('คุณเป็นสมาชิก สสอท. ลงทะเบียนได้',getProfile.data.msg)
                await this.onSignup()   
          }
          else {

            Alert.alert('หมายเลขบัตรประจำตัวประชาชน  หรือ หมายเลข สสอท. ไม่ถูกต้อง')
          
           } 

        }
        else {

          Alert.alert('คุณไม่ได้เป็นสมาชิก สสอท.')
        
          //await this.checkuser()   
         } 
        
      }
    

  
  
  //checkmember =async()=> {   
 //   let numpay = await api.getNumPay()
  //  console.log(numpay)
 //   if(numpay.status === 200){
 //     Alert.alert('ท่านเคยลงทะเบียนแล้ว โปรดเข้าใช้งานระบบด้วย รหัสผู้ใช้ เดิม')
 //   } 
  //  else {
  //    await this.checkuser()
  //  } 
 // }


//  checkuser =async()=> {  
// Alert.alert('ท่านเคยลงทะเบียนแล้ว โปรดเข้าใช้งานระบบด้วย รหัสผู้ใช้ เดิม')

 //   let data = {
 //     username: this.state.user,
 //     password: this.state.password
 //   }
    
 //   let signup = await api.login(data)
 //   console.log(signup)
 //   if(signup.status === 200){
  //    Alert.alert('หมายเลขสมาชิก ' + signup.data.username + ' ท่านเคยลงทะเบียนแล้ว โปรดเข้าสูระบบด้วยรหัสผู้ใช้เดิม')
 //   }
 //   else {
 //     await this.onSignup()    } 
    
 // }




  onSignup =async()=> {
    //if(this.state.name === '') return Alert.alert('','กรุณากรอกชื่อผู้ลงทะเบียน')
    //if(this.state.id13 === '') return Alert.alert('','กรุณากรอกหมายเลข ปชช.')
    //if(this.state.email === '') return Alert.alert('','กรุณากรอก Email')
    //if(this.state.tel === '') return Alert.alert('','กรุณากรอกเบอร์โทร')
    //if(this.state.user === '') return Alert.alert('','กรุณากรอกหมายเลขฌาปนกิจ')
    //if(this.state.password === '') return Alert.alert('','กรุณากรอกรหัสผ่าน')

    this.setState({isLoading: true})
    let data = {
      firstname: this.state.name,
      // lastname: this.state.lname,
      email: this.state.email,
      username: this.state.user,
      password: this.state.password,
      provider_ids : this.state.id13,
      provider_data : this.state.tel
    }
  //console.log(data)




    let signup = await api.signup(data)
    this.setState({isLoading: false})
    console.log(signup)
    if(signup.status === 200){
      Alert.alert('ลงทะเบียนสำเร็จ')
      this.props.navigation.navigate('Login')
    }else{
      Alert.alert('ลงทะเบียนไม่สำเร็จ ท่านเคยลงทะเบียนไว้แล้ว โปรดเข้าสู่ระบบด้วยรหัสผู้ใช้เดิม')
    }
  }




  render(){
    return (
    
      <SafeAreaView style={{flex: 1}}>
    
        <ScrollView style={{flex: 1, backgroundColor: '#cc99ff'}}>
       
 
      

          <View style={styles.container}>


      <View style={{width: '100%', height: 50, marginTop: 0, backgroundColor: '#cc66ff', flexDirection: 'row', alignItems: 'center'}}>
      <ImageBackground source={require('./images/bg.jpg')}  style={styles.imagebg}  > 
      <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/> 
      <Text style={{fontSize: 30, marginLeft: 30, flex: 1}}>ลงทะเบียน</Text>
      </ImageBackground>     
      </View>

  
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Text style={styles.title}>ชื่อผู้ลงทะเบียน</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({name: text})}
              value={this.state.name} 
              placeholder="ชื่อผู้ลงทะเบียน"
            />

            {/* <Text style={styles.title}>นามสกุล</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({lname: text})}
              value={this.state.lname} 
              placeholder="นามสกุล"
            /> */}

            <Text style={styles.title}>หมายเลข ปชช.</Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={13}
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({id13: text})}
              value={this.state.id13} 
              placeholder="หมายเลข ปชช."
            />

            <Text style={styles.title}>อีเมล์</Text>
            <TextInput
              keyboardType="email-address"
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({email: text})}
              value={this.state.email} 
              placeholder="Email"
            /> 

            <Text style={styles.title}>เบอร์โทร</Text>
            <TextInput
              keyboardType="phone-pad"
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({tel: text})}
              value={this.state.tel} 
              placeholder="เบอร์โทร"
            />

            <Text style={styles.title}>หมายเลขฌาปนกิจ</Text>
            <TextInput keyboardType="number-pad"
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({user: text})}
              value={this.state.user} 
              placeholder="หมายเลขฌาปนกิจ"
            />

            <Text style={styles.title}>รหัสผ่าน</Text>
            <TextInput
              secureTextEntry={true}
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({password: text})}
              value={this.state.password}
              placeholder="รหัสผ่าน"
            />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
           
           
            <View style={{width: '40%', height: 50, marginTop: 0, flexDirection: 'row', alignItems: 'stretch'}}>
            
            <TouchableOpacity onPress={()=> this.onSignup_checklist()} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#007bff', borderRadius: 5}}>
              <Text style={{fontSize: 18, color: '#fff'}}>ลงทะเบียน</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}style={{paddingVertical: 10 , marginLeft : 10,  paddingHorizontal: 20, backgroundColor: '#007bff', borderRadius: 5}}>
              <Text style={{fontSize: 18, color: '#fff'}}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            </View>



          </View>

        </ScrollView>
        {this.state.isLoading && <Loading />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      width: 300,
      marginTop: 10
    },
    separator: {
      marginVertical: 10,
      height: 1,
      width: '80%',
    },
    images: {
      width: 50,
      height: 50
    },
    imagebg: {
      flex: 1,
      flexDirection: 'row',
      resizeMode: "cover",
      justifyContent: "center",
    },
    imagebg02: {
      resizeMode: "cover",
      justifyContent: "center",
    },   
    btSignin: {
      padding: 5,
      backgroundColor: '#007bff'
    }
  });
