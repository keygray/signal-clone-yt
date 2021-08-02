import React, {useLayoutEffect, useState} from 'react'
import {Alert, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import {Input, Button} from 'react-native-elements'
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [imageUrl, setImageUrl] = useState("");

   useLayoutEffect(() => {
      navigation.setOptions({
         headerBackTitle: "Back to Login",
      });
   }, [navigation])

   const register = () => {
      auth
         .createUserWithEmailAndPassword(email, password)
         .then((authUser)=>{
            authUser.user.updateProfile({
               displayName: name,
               photoURL: imageUrl || "https://www.mozilla.org/media/protocol/img/logos/firefox/lockwise/logo-lg-high-res.97bd3eea43cb.png",
            })
         })
         .catch(error => alert(error.message));
   }
   return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <StatusBar style="light" />
         <Text h3 style={{marginBottom: 50}}>
            Create a Signal account
         </Text>
         <View style={styles.inputContainer}>
            <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={setName} />
            <Input placeholder="Email" type="email" value={email} onChangeText={setEmail} />
            <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={setPassword} />
            <Input placeholder="Image" type="text" value={imageUrl} onChangeText={setImageUrl} onSubmitEditing={register} />

         </View>
         <Button containerStyle={styles.button} buttonStyle={styles.buttonBG} raised title="Register" onPress={register} />


      </KeyboardAvoidingView>
   )
}

export default RegisterScreen

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      padding: 10,
      backgroundColor: "white",
   },
   button: {
      width: 200,
      marginTop: 10,
   },
   buttonBG: {
      backgroundColor: "#0c6157",
   },
   inputContainer: {
      width: 300,
   }
})
