import { Permissions, Notifications } from "expo";
import * as types from "./types";
import axios from "axios";

export const registerForPushNotifications = () => {
  return async dispatch => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return dispatch => {
        dispatch({
          type: types.HANDLE_NOTIFICATION_TOKEN_ERROR
        });
      };
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to backend server
    try {
      response = await axios.patch("auth/me", { token: token });
      //dispatch action to store
      return dispatch => {
        dispatch({
          type: types.HANDLE_NOTIFICATION_TOKEN,
          payload: token
        });
      };
    } catch (error) {
      console.log(error);
    }
  };
};

export const subscripeForPushNotifications = () => {
  Notifications.addListener(notification => {
    return dispatch => {
      dispatch({
        type: types.HANDLE_NOTIFICATION,
        payload: notification
      });
    };
  });
};
