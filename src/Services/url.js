import axios from "axios"

const baseURL="https://upskilling-egypt.com:3006/api/v1"
export const baseImg='https://upskilling-egypt.com:3006/'

// axiosInstance فكرتها تشيل ال (baseurl)
// axios.create هادي بتقدملي ياها الاكسيوس عشان تشيل البيس يو ار ال
export const axiosInstance=axios.create(
    {baseURL, 
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
)

// ****************USER-URL**************
export const USERS_URLS ={
    LOGIN:`/Users/Login`,
    FORGET_PASS:`/Users/Reset/Request`,
    RESET_PASS:`/Users/Reset`,
    REGESTER_USER:'Users/Register',
    VERIFY_ACCOUNT:'Users/verify'


}

// ****************Categories**************
export const CATEGORIES_URLS ={
    GET_CATEGORIES:`/Category/`,
    // ADD_CATEGORIES:`/Category/`,
    // EDIT_CATEGORIES:(id)=>`/Category/${id}`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
    // VIEW_CATEGORY:`/Category/`,


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


