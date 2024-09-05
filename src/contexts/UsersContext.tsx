import { createContext, useReducer, useEffect, useState } from "react";

type ChildrenType = { children: React.ReactNode};

type UserType = {
    id: string;
    username: string;
    password: string;
    email: string;
    profilePicture: string;
    dob: string;
    passwordVisible: string;
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
        setLoggedInUser(user);
      }
    const logOutUser = () => {
        setLoggedInUser(null);
      }
      
      const [users, dispatch] = useReducer(reducer, []);
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

      useEffect(()=>{
        fetch(`http://localhost:8080/users`)
          .then(res => res.json())
          .then(data => dispatch({
            type: 'setData',
            data: data
          }))
      },[]); 

    const getSpecificUser = (id: string) => users.find(user => user.id === id);  

    return (
        <UsersContext.Provider
           value={{
            users,
            addNewUser,
            loggedInUser,
            logInUser,
            logOutUser,
            getSpecificUser
           }}
       >
          {children}
       </UsersContext.Provider>    
    )
};
export {UsersProvider};
export default UsersContext;
