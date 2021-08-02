import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Input, Button} from 'react-native-elements'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
   const [input, setInput] = useState("");
   useLayoutEffect(() => {
      navigation.setOptions({
         title: "Add A News Chat",
         headerBackTitle: "Home",
      })
   }, [navigation])

   const createChat = async () => {
      await db.collection('chats').add({
         chatName: input
      }).then(() => {
         navigation.goBack()
      }).catch((error) =>  alert(error.message));
   }
   return (
      <View style={styles.container}>
            <Input 
               placeholder="Enter chat name" 
               autofocus 
               type="text" 
               value={input} 
               onChangeText={setInput} 
               onSubmitEditing={createChat}
               leftIcon={
                  <AntDesign name="wechat" size={24} color="#0c6157" />
               }
            />

            <Button buttonStyle={styles.button} title="Create new chat" onPress={createChat} />


      </View>
   )
}

export default AddChatScreen

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      padding: 30,
      height: "100%",
   },
   button: {
      backgroundColor: "#0c6157",
   }
})
