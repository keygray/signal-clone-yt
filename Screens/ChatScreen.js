import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput,ImageBackground, Keyboard, FlatList} from 'react-native'
import {Avatar} from 'react-native-elements'
import BG from '../assets/images/BG.png';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { FontAwesome,FontAwesome5,AntDesign ,Ionicons,Entypo, Fontisto, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons'; 
import firebase from 'firebase/app'
import { auth, db } from '../firebase';

const ChatScreen = ({navigation, route}) => {
   const [input, setInput] = useState('');
   const [messages, setMessages] = useState([]);
   const scrollViewRef = useRef();
   useLayoutEffect(() => {
      navigation.setOptions({
         title: "Chat",
         headerBackTitleVisible: false,
         headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: "center"}}>
               <Avatar rounded source={{uri: messages[0]?.data.photoURL || "https://placeimg.com/140/140/any"}} />
               <Text style={styles.chatName}>{route.params.chatName}</Text>
            </View>
         ),
         headerLeft: () => (
            <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
                  <AntDesign name="back" size={24} color="#fff" />
            </TouchableOpacity>
         ),

         headerRight: () => (
            <View style={
               {
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: 80,
                  marginRight: 20,
               }
            }>
               <TouchableOpacity>
                  <FontAwesome name="video-camera" size={24} color="#fff" />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
                  <Ionicons  name="call" size={24} color="#fff" />
               </TouchableOpacity>
            </View>
         ),
      })
   }, [navigation, messages])


   const sendMessage = () => {
      Keyboard.dismiss();
      db.collection("chats").doc(route.params.id).collection('messages').add({
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         message: input,
         displayName: auth.currentUser.displayName,
         email: auth.currentUser.email,
         photoURL: auth.currentUser.photoURL,
      });
      setInput("");
   };

   useEffect(() => {
      const unsubscribe = db.collection("chats").doc(route.params.id).collection('messages').orderBy('timestamp')
      .onSnapshot((snapshot) => setMessages(
         snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
         }))
      ));
      return unsubscribe;
   }, [route])


   const isMyMessage = (data) => {
      return data.email === auth.currentUser.email;
   }

   return (
      <ImageBackground source={BG} style={{width: '100%', height: '100%', flex:1,}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
               behavior={Platform.OS === "ios" ? "padding" : "height"}
               style={styles.container}
               keyboardVerticalOffset={80}
            >
              

                  <>
                     <ScrollView ref={scrollViewRef}
                                 onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                        {messages.map(({id, data}) => 
                           isMyMessage(data) ?
                           (
                              <View key={id} style={styles.reciever}>
                                 <Text style={styles.recieverText}>{data.message}</Text>
                              </View>
                           ) : (
                              <View key={id} style={styles.senderWrap}>
                                 <Avatar rounded size={30} source={{uri: data.photoURL}}/>
                                 <View style={styles.sender}>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                    <Text style={styles.senderText}>{data.message}</Text>
                                 </View>
                              </View>
                              
                           )
                        )}

                     </ScrollView>
                     <View style={styles.footer}>
                        <View style={styles.mainContainer}>
                           <FontAwesome5 name="laugh-beam" color="grey" size={24}  />
                           <TextInput 
                              style={styles.textInput} 
                              multiline 
                              numberOfLines={6}
                              placeholder={"Type a message"}
                              onChangeText={setInput}
                              value={input}
                              onSubmitEditing={sendMessage}
                           />
                           <Entypo name="attachment" color="grey" size={24} style={styles.icon} />
                           {!input && <Fontisto name="camera" color="grey" size={24} style={styles.icon} />}
                        </View>
                        <TouchableOpacity onPress={sendMessage}>
                           <View style={styles.buttonContainer}>
                              <MaterialIcons name="send" color="white" size={28} />
                           </View>
                        </TouchableOpacity>
                     </View>
                  </>
              
         </KeyboardAvoidingView>
      </ImageBackground>      
      
   )
}

export default ChatScreen

const styles = StyleSheet.create({
   safeview: {
      flex: 1,
      backgroundColor: "white",
      opacity: 0
   },
   container: {
      flex: 1,
      padding: 10,
   },
   chatName: {
      fontWeight: "700",
      color: "white",
      marginLeft: 10,
   },
   footer: {
      bottom: 0,
      flexDirection: 'row',
      margin: 10,
      alignItems: 'flex-end',
    },
    mainContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 25,
      marginRight: 10,
      flex: 1,
      alignItems: 'flex-end',
    },
    textInput: {
      flex: 1,
      marginHorizontal: 10
    },
    icon: {
      marginHorizontal: 5,
    },
    buttonContainer: {
      backgroundColor: "#0c6157",
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },

   reciever: {
      padding: 10,
      alignSelf: 'flex-end',
      borderRadius: 20,
      marginBottom: 15,
      maxWidth: "80%",
      backgroundColor: "#DCF8C5",
   },
   recieverText: {
     
   },
   sender: {
      padding: 10,
      borderRadius: 20,
      marginBottom: 15,
      maxWidth: "80%",
      backgroundColor: "#fff",
      marginLeft: 10,
   },
   senderText: {
     
   },
   senderName: {
      fontWeight: 'bold',
      color: "#0c6157",
   },
   senderWrap: {
      flexDirection: 'row',
   }
   
})
