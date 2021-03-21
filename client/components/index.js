/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Welcome} from './welcome'
export {Login} from './login'
export {Signup} from './signup'
export {default as LocationVerification} from './location-verification'
export {default as UserMap} from './UserProfile/UserMap'
export {AllChats} from './Chats/AllChats'
export {SingleChat} from './Chats/SingleChat'

//remember to comment these in

// export { AllChats, SingleChat } from './Chats/AllChats'
// export {default as AllProduct, Condition, SingleProducts} from './Products'
// export { default as Favorites, Listings, Profile, Purchases, Rating, Settings } from './UserProfile'
