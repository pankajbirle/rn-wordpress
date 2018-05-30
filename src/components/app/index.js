/**
 * Import all the screens that are going to be used in the app stack
 * Define them under DrawerNavigator as we want one inside our application
 * Export AppStack
 */
import Home from './home';
import Profile from './profile';
import DrawerComponent from './drawer';
import TabScreen from './tab-screen';
import UploadScreen from './upload';
import ConfirmationScreen from './confirm';
import PostListing from './postListing';
import AddPost from './AddPost';
import EditPost from './postListing/EditPost';
import { DrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';

const AppStack = DrawerNavigator(
    {
        PostListing: {
            screen: PostListing
        },
        AddPost: {
            screen: AddPost
        },
        EditPost: {
            screen: EditPost
        }
    }, {
        contentComponent: DrawerComponent, /** This is our custom drawer component */
    }
);
export default AppStack;