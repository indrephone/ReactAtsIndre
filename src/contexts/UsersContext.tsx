import { createContext, useReducer, useEffect, useState } from "react";

type ChildrenType = { children: React.ReactNode};

export type UserType = {
    id: string;
    username: string;
    password: string;
    email: string;
    profilePicture: string;
    dob: string;
    passwordVisible: string;
    favoritePosts: string[];
};
type ReducerActionTypes = 
{ type: "setData", data: UserType[] } |
{ type: "addNewUser", newUser: UserType }

export type UsersContextTypes ={
  users: UserType[];
  addNewUser: (newUser: UserType) => void;
  loggedInUser: UserType | null;
  logInUser: (user: UserType) => void;
  logOutUser: () => void;
  getSpecificUser: (id: string) => UserType | undefined;
  addFavoritePost: (postId: string) => void;
  removeFavoritePost: (postId: string) => void;
}

const reducer = (state: UserType[], action: ReducerActionTypes) => {
    switch(action.type){
      case 'setData':
        return action.data;
      case 'addNewUser':
        return [...state, action.newUser];
      default:
        return state;
    }
  }

const UsersContext = createContext<UsersContextTypes | undefined >(undefined);
const UsersProvider = ({ children }: ChildrenType) => {

    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);

    const logInUser = (user:UserType) => {
   
   const storedFavorites = JSON.parse(
         localStorage.getItem("favoritePosts") || "[]"
      );


        setLoggedInUser({
          ...user,
          favoritePosts:
          storedFavorites.length > 0 ? storedFavorites : user.favoritePosts || [],
        });
        };

    // Add a post to the user's favorites and save it in localStorage
  const addFavoritePost = (postId: string) => {
    if (loggedInUser) {
      const updatedFavorites = [...loggedInUser.favoritePosts, postId];
      const updatedUser = {
        ...loggedInUser,
        favoritePosts: updatedFavorites,
      };
      setLoggedInUser(updatedUser);
      localStorage.setItem("favoritePosts", JSON.stringify(updatedFavorites)); // Persist to localStorage
    }
  };

  // Remove a post from the user's favorites and update localStorage
  const removeFavoritePost = (postId: string) => {
    if (loggedInUser) {
      const updatedFavorites = loggedInUser.favoritePosts.filter(
        (id) => id !== postId
      );
      const updatedUser = {
        ...loggedInUser,
        favoritePosts: updatedFavorites,
      };
      setLoggedInUser(updatedUser);
      localStorage.setItem("favoritePosts", JSON.stringify(updatedFavorites)); // Persist to localStorage
    }
  };

     // Log out the user and clear favorite posts from localStorage if desired 
    const logOutUser = () => {
        setLoggedInUser(null);
        localStorage.removeItem("favoritePosts"); // Optional: Clear favorite posts from localStorage on logout
      }
      
      const [users, dispatch] = useReducer(reducer, []);

      useEffect(()=>{
        fetch(`http://localhost:8080/users`)
          .then(res => res.json())
          .then(data => dispatch({
            type: 'setData',
            data: data
          }))
      },[]); 

      const addNewUser = (newUser: UserType) => {
        fetch(`http://localhost:8080/users`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(newUser)
        })
        dispatch({
          type: "addNewUser",
          newUser: newUser
        })
      }

 const getSpecificUser = (id: string) => users.find(user => user.id === id);  

    return (
        <UsersContext.Provider
           value={{
            users,
            addNewUser,
            loggedInUser,
            logInUser,
            logOutUser,
            getSpecificUser,
            addFavoritePost,
            removeFavoritePost,
           }}
       >
          {children}
       </UsersContext.Provider>    
    )
};
export {UsersProvider};
export default UsersContext;
