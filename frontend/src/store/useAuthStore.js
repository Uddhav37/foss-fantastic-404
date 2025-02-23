import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set)=>({
  authUser: null,
  isSigningUP: false,
  isLoggingIng: false,
  isUpdatingProfile: false,

  ischeckingAuth: true,

  checkAuth: async ()=>{
    try{
      const res = await axiosInstance.get("auth/check");
      set({authUser:res.data});
    }catch(error){
      console.log("error is",error.message);
      set({authUser:null});
    }finally{
      set({authUser:null});
    }
  }
    
}))