import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import { db } from '../firebase';
const CustomListItem = ({id, chatName, enterChat}) => {

   const [chatMessage, setChatMessage] = useState([]);
   useEffect(() => {
      const unsubscribe = db.collection("chats").doc(id).collection('messages').orderBy('timestamp', 'desc').limit(1).onSnapshot((snapshot) => setChatMessage(
         snapshot.docs.map((doc) => doc.data())
      ));
      return unsubscribe;
   })
   return (
      <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
         <Avatar rounded source={{uri: chatMessage?.[0]?.photoURL || "https://placeimg.com/140/140/any",}} />
         <ListItem.Content>
            <ListItem.Title style={{fontWeight: "800",}}>
               {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {chatMessage?.[0]?.displayName} : {chatMessage?.[0]?.message}
            </ListItem.Subtitle>
         </ListItem.Content>
      </ListItem>
   )
}

export default CustomListItem

const styles = StyleSheet.create({})
