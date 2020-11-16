import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import Colors from '../constants/Colors'
import {Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const defaultNavConfig = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    DetailScreen: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
        size={24} 
        color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavConfig
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
        size={24} 
        color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavConfig
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator)