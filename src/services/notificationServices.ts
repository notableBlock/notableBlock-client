import axios from "axios";

import type { NotificationId } from "types/ids";

const getAllNotification = async () => {
  try {
    const { data } = await axios.get("/notification");
    const { notificationsId } = data;

    return await Promise.all(
      notificationsId.map(async (notificationId: NotificationId) => {
        const { data } = await axios.get(`/notification/${notificationId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteNotification = async (notificationId: NotificationId) => {
  try {
    await axios.delete(`/notification/${notificationId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteAllNotification = async () => {
  try {
    await axios.delete("/notification");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getAllNotification, deleteNotification, deleteAllNotification };
