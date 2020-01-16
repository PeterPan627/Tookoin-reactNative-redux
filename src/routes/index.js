import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Home,
  HomeBuyer,
  MyOrder,
  Login,
  Register,
  Profile,
} from '../screens/index';

const StackAuth = createStackNavigator(
  {
    Login,
    Register,
  },
  {
    initialRouteName: 'Register',
    headerMode: 'none',
  },
);

const StackHome = createStackNavigator(
  {
    HomeBuyer,
    Profile,
    MyOrder,
  },
  {
    // initialRouteName: 'HomeBuyer',
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);

const Router = createSwitchNavigator(
  {
    StackAuth,
    StackHome,
  },
  {
    initialRouteName: 'StackHome',
    headerMode: 'none',
  },
);

const RouterDEV = createStackNavigator(
  {
    Register,
    Login
  },
  {
    initialRouteName: 'Register',
    headerMode: 'none',
  }
);

// export default createAppContainer(RouterDEV);
export default createAppContainer(Router);
