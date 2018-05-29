/**
 * This is our auth stack
 * Import all the screens and define in StackNavigator which user can see without login
 * Generally we have only three such screens which user can navigate to without login - Login, Register & ForgotPassword
 */

import { StackNavigator } from 'react-navigation';

import Login from './login';
import Register from './register';

const AuthStack = StackNavigator(
	{
		Login: {
			screen: Login
		},
		Register: {
			screen: Register
		}
	},
	{
		headerMode: 'none'
	}
)

export default AuthStack;