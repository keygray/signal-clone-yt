import React, { useEffect, useState } from 'react'
import { Alert, Button, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Input, Image} from 'react-native-elements'
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
         //console.log(authUser);
         if(authUser) {
            navigation.replace("Home");
         }
      })

      return unsubscribe;
   }, [])


   const signIn = () => {
      auth
         .signInWithEmailAndPassword(email, password)
         .catch((error) => alert(error.message));
   }
   return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <StatusBar style="light" />
         <Image 
            source={{uri: "https://www.mozilla.org/media/protocol/img/logos/firefox/lockwise/logo-lg-high-res.97bd3eea43cb.png"}}
            style={styles.image} 
         />
         <View style={styles.inputContainer}>
            <Input placeholder="Email" autofocus type="Email" value={email} onChangeText={setEmail} />
            <Input placeholder="Password" secureTextEntry type="Password" value={password} onChangeText={setPassword} onSubmitEditing={signIn} />
            <TouchableOpacity onPress={signIn} >
               <View style={styles.button}>
                  <Text style={styles.btnText}>Login</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} >
               <View style={styles.buttonOutline}>
                  <Text style={styles.btnTextOuline}>Register</Text>
               </View>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
   )
}

export default LoginScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: "white",
   },
   image: {
      width: 150,
      height: 150,
   },
   inputContainer: {
      width: 300,
   },
   button: {
      backgroundColor: "#0c6157",
      color: "#ffffff",
      padding: 10,
      alignItems: "center",
      borderRadius: 20,
      width: "100%",
      marginBottom: 10,
   },
   buttonOutline: {
      backgroundColor: "#ffffff",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      padding: 10,
      alignItems: "center",
      borderRadius: 20,
      width: "100%",
      marginBottom: 10,
   },
   btnText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
   },
   btnTextOuline: {
      color: "#0c6157",
      fontWeight: "bold",
      fontSize: 16,
   }

})
