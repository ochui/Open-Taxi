import { Constants } from "expo";

export const API_URL = "https://tripple-a.herokuapp.com/api/v1/";
export const GOOGLE_API = Constants.manifest.extra.googleMapsApi;
//export const FLUTTERWAVE_API_PUBLIC_KEY ="FLWPUBK-d90892204f9ab6eabfd944ae8d559a5c-X";
export const FLUTTERWAVE_API_PUBLIC_KEY = Constants.manifest.extra.flwpubk;
//export const FLUTTERWAVE_API_SECRET_KEY ="FLWSECK-b0b70b9060d082f1a966ec838507c1c8-X";
export const FLUTTERWAVE_API_SECRET_KEY = Constants.manifest.extra.flwseck;
export const SURGE = 1;
export const BASE_FARE = 300;
export const TIME_RATE = 6.5;
export const DISTANCE_RATE = 65;
export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};
export const FLUTTERWAVE_BVN_API_ENDPOINT = "https://api.ravepay.co/v2/kyc/bvn";

export const APP_NAME = "Trip";
