import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const baseImg = 'https://upskilling-egypt.com:3006/';

export const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});
// ****************USER-URL**************
export const USERS_URLS ={
    LOGIN:`/Users/Login`,
    FORGET_PASS:`/Users/Reset/Request`,
    RESET_PASS:`/Users/Reset`,
    REGESTER_USER:'Users/Register',
    VERIFY_ACCOUNT:'Users/verify',
    CHANGE_PASS: '/Users/ChangePassword'
}

// ****************Categories**************
export const CATEGORIES_URLS ={
    GET_CATEGORIES:`/Category/`,
    ADD_CATEGORIES:`/Category/`,
    EDIT_CATEGORIES:(id)=>`/Category/${id}`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
    VIEW_CATEGORY:(id)=>`/Category/${id}`,


}

// ****************Recipes**************

export const RECIPES_URL={
  GET_RECIPES:'/Recipe/',
  ADD_RECIPES:'/Recipe/',
  DELETE_RECIPES:(id)=>`/Recipe/${id}`,
  UPDATE_RECIPES:(id)=>`/Recipe/${id}`,
  VIEW_RECIPES:(id)=>`/Recipe/${id}`

}


// ****************Tag**************

export const TAG_URL={
  GET_TAG:'/tag/'
}

// ****************User List URL**************

export const USERS_LIST_URL={
  GET_USERS:'/Users/',
  DELETE_USERS:(id)=>`/Users/${id}`,
  UPDATE_USERS:(id)=>`/Users/${id}`,
  VIEW_USER:(id)=>`/Users/${id}`
}

// ****************Fav Recipe List URL**************

export const FAV_RECIPE_LIST_URL={
  GET_FAV_RECIPES:"/userRecipe/",
  ADD_FAV_RECIPES:"/userRecipe/",
  DELETE_FAV_RECIPE:(id)=>`/userRecipe/${id}`
}