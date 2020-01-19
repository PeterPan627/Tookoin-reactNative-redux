import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Text,
  Button,
  Content,
  Tab,
  Tabs,
  Title,
  Card,
  CardItem,
  Thumbnail,
  // Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';

import {getTransactionStatusBuyer} from '../../../utils/axios/my-order-seller';
import {storeData, retrieveData} from '../../../utils';

import styles from './my-order.style';
import moment from 'moment';

export default class MyOrder extends Component {
  state = {
    status: true,
    token: '',
    listOrderSeller: [1, 2, 3],
    incompletedOrder: [],
    completedOrder: [],
    loggedIn: false,
  };

  componentDidMount = async () => {
    if (!(await retrieveData('token'))) {
      // Check logged in or not
      this.setState({loggedIn: false});
    } else {
      this.setState({token: await retrieveData('token')});
      this.setState({loggedIn: true});
    }

    getTransactionStatusBuyer(this.state.token).then(res => {
      // Filtering status order
      const incompletedOrder = res.data.filter(function(order) {
        return order.status < 4;
      });
      this.setState({incompletedOrder: incompletedOrder});
      const completedOrder = res.data.filter(function(order) {
        return order.status > 4;
      });

      this.setState({completedOrder: completedOrder});
      this.setState({listOrderSeller: res.data});

      // console.log('incompledted',this.state.incompletedOrder)
      // console.log('incompledted',this.state.completedOrder)
    });
  };

  render() {
    // const imageUri = require('../../../assets/images/belumAdaPesanan.png');
    const imageUri = require('../../../assets/static-image/monster-egg.png');
    const trolli = require('../../../assets/images/trolli.png');

    console.log('render this order', this.state.loggedIn)

    return (
      <View style={styles.parent}>
        <Header
          //  hasTabs
          style={styles.header}>
          <Title style={{color: 'black'}}>My Order</Title>
        </Header>

        {this.state.loggedIn === false ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#f6f6f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={trolli}
              size
              style={{
                // height: 100,
                // width: null,
                width: 200,
                height: 200,
                resizeMode: 'stretch',
                marginBottom: 50,
              }}
            />
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              Let's start harvesting!
            </Text>
            <Text>Oh, but you have to login first.</Text>
          </View>
        ) : (
          <Tabs
            tabBarUnderlineStyle={styles.tabUnderLine}
            backgroundColor="yellow"
            tabContainerStyle="yellow">
            <Tab
              heading="In Progress"
              tabStyle={{backgroundColor: '#FEFEFE'}}
              textStyle={{color: '#40b33f'}}
              activeTabStyle={{backgroundColor: '#FEFEFE'}}
              activeTextStyle={{color: 'green', fontWeight: 'normal'}}>
              <ScrollView
                style={{
                  backgroundColor: '#F5F6F6',
                  flex: 1,
                }}>
                {this.state.incompletedOrder.length > 0 ? (
                  this.state.incompletedOrder.map((order, index) => {
                    return (
                      <View style={styles.cardParent} key={index}>
                        <View style={styles.child1}>
                          <View style={styles.child11}>
                            <Text note style={styles.textNoteChild11}>
                              Seller
                            </Text>
                            <Text style={styles.textChild11}>
                              {order.name_user || `#SR23555HJF8`}
                            </Text>

                            <Text note style={styles.textNoteChild11}>
                              Item Purchased
                            </Text>
                            <Text style={styles.textChild11}>
                              {`${order.name_product}` || `Sayur Bayam`}
                            </Text>

                            <Text style={styles.textChild11}>
                              {`Rp${order.price} x ${order.qty}`}
                            </Text>

                            <Text note style={styles.textNoteChild11}>
                              Last Status
                            </Text>
                            <Text style={styles.textChild11a}>
                              {order.status === 1
                                ? `Waiting payment from buyer`
                                : order.status === 2
                                ? `Processing payment`
                                : order.status === 3
                                ? `In Packaging`
                                : order.status === 4
                                ? `Product sent by Seller`
                                : `Waiting payment from buyer`}
                            </Text>
                          </View>

                          <View style={styles.child12}>
                            <Text note style={styles.textNoteChild12}>
                              Order Number
                            </Text>
                            <Text style={styles.textChild11}>
                              {order.id_transaction || `#SR23555HJF8`}
                            </Text>

                            <Text note style={styles.textNoteChild12}>
                              Transaction Date
                            </Text>
                            <Text style={styles.textChild12}>
                              {moment(order.transaction_date).format(
                                'dddd, DD-MM-YYYY',
                              ) || `Wednesday, 15 Jan 2020`}
                            </Text>
                            <Text note style={styles.textNoteChild12}>
                              Billing Total
                            </Text>
                            <Text style={styles.textChild12a}>
                              {order.subtotal || `Rp 4000`}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.child2}>
                          <View style={styles.child21}>
                            <MaterialIcons
                              name="payment"
                              style={
                                order.status === 1
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                            <FontAwesome5
                              name="paypal"
                              style={
                                order.status === 2
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                            <Octicons
                              name="package"
                              style={
                                order.status === 3
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                            <FontAwesome
                              name="send-o"
                              style={
                                order.status === 4
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                          </View>
                          <View style={styles.child22}>
                            <Button
                              icon
                              small
                              bordered
                              style={styles.buttonChild22}>
                              <Icon
                                name="comments"
                                style={styles.iconChild22}
                              />
                              <Text style={styles.textChild22}>
                                Chat Seller
                              </Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  // if no data
                  <View style={styles.cardParent}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#F5F6F6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={imageUri}
                        size
                        style={{
                          // height: 100,
                          // width: null,
                          width: 100,
                          height: 100,
                          resizeMode: 'stretch',
                          marginBottom: 50,
                        }}
                      />
                      <Text>oopps seems like u dont have any order yet</Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </Tab>

            <Tab
              heading="Completed"
              tabStyle={{backgroundColor: '#FEFEFE'}}
              textStyle={{color: '#40b33f'}}
              activeTabStyle={{backgroundColor: '#FEFEFE'}}
              activeTextStyle={{color: 'green', fontWeight: 'normal'}}>
              <ScrollView
                style={{
                  backgroundColor: '#F5F6F6',
                  flex: 1,
                }}>
                {this.state.completedOrder.length > 0 ? (
                  this.state.completedOrder.map((order, index) => {
                    return (
                      <View style={styles.cardParent} key={index}>
                        <View style={styles.child1}>
                          <View style={styles.child11}>
                            <Text note style={styles.textNoteChild11}>
                              Order Number
                            </Text>
                            <Text style={styles.textChild11}>
                              {order.id_transaction || `#SR23555HJF8`}
                            </Text>
                            <Text note style={styles.textNoteChild11}>
                              Last Status
                            </Text>
                            <Text style={styles.textChild11a}>
                              {order.status === 5
                                ? `Product received by Buyer`
                                : order.status === 6
                                ? `Refunded`
                                : order.status === 7
                                ? `Canceled Order`
                                : `Product received by Buyer`}
                            </Text>
                          </View>

                          <View style={styles.child12}>
                            <Text note style={styles.textNoteChild12}>
                              Transaction Date
                            </Text>
                            <Text style={styles.textChild12}>
                              {moment(order.transaction_date).format(
                                'dddd, DD-MM-YYYY',
                              ) || `Wednesday, 15 Jan 2020`}
                            </Text>
                            <Text note style={styles.textNoteChild12}>
                              Billing Total
                            </Text>
                            <Text style={styles.textChild12a}>
                              {order.subtotal || `Rp 4000`}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.child2}>
                          <View style={styles.child21}>
                            <FontAwesome5
                              name="box-open"
                              style={
                                order.status === 5
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                            <MaterialIcons
                              name="settings-backup-restore"
                              style={
                                order.status === 6
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                            <MaterialCommunityIcons
                              name="cancel"
                              style={
                                order.status === 7
                                  ? styles.iconChildActive
                                  : styles.iconChild21
                              }
                            />
                          </View>
                          <View style={styles.child22}>
                            <Button
                              icon
                              small
                              bordered
                              style={styles.buttonChild22}>
                              <Icon
                                name="comments"
                                style={styles.iconChild22}
                              />
                              <Text style={styles.textChild22}>
                                Chat Seller
                              </Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  // if no data
                  <View style={styles.cardParent}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#F5F6F6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={imageUri}
                        size
                        style={{
                          // height: 100,
                          // width: null,
                          width: 100,
                          height: 100,
                          resizeMode: 'stretch',
                          marginBottom: 50,
                        }}
                      />
                      <Text>
                        oopps seems like you dont have any completed order yet
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </Tab>
          </Tabs>
        )}
      </View>
    );
  }
}
