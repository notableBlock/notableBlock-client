import axios from "axios";

const getAllNotification = async () => {
  try {
    const { data } = await axios.get(`/notification`);
    const { notificationsId } = data;

    return await Promise.all(
      notificationsId.map(async (notificationId) => {
        const { data } = await axios.get(`/notification/${notificationId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteNotification = async (notificationId) => {
  try {
    await axios.delete(`/notification/${notificationId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getAllNotification, deleteNotification };
