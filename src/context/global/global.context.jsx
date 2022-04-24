import React, { createContext, useState } from "react";
import { list } from "../../services/Posts";
import { Auth } from "aws-amplify";

const initialAppState = {
  showForm: false,
  imageURI: "",
  user: null,
  colorDefault: "#581845",
};

export const GlobalContext = createContext(initialAppState);
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialAppState);
  const [post, setPosts] = useState();
  const [usuario, setUsuario] = useState(Auth.user.username);

  function login(email, pwd) {
    setState((current) => ({ ...current, user: usuario }));
  }

  async function logout() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function listPosts() {
    const postFetched = await list();
    if (postFetched) setPosts(postFetched);
  }

    return(
        <GlobalContext.Provider value={{ state, login, logout, listPosts, post, usuario}}>
            {children}
        </GlobalContext.Provider>
    );
};