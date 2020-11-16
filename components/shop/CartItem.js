import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const CartItem = (props) => {
    return ( 
        <View style={styles.cartItem}>
            <View style={styles.itemDetails}>
               <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
             </View>
             <View style={styles.itemDetails}>
                 <Text style={styles.amount}>$ {props.amount.toFixed(2)}</Text>
                {
                props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.trashIcon}>
                    <Ionicons 
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                    size={24} 
                    color={'red'} />
                </TouchableOpacity>
                }
             </View>
        </View>
     );
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
        marginRight: 5
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    trashIcon: {
        marginLeft: 20
    }
})
 
export default CartItem