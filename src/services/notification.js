import axios from "axios";

const deleteNotification = async (notificationId) => {
  try {
    await axios.delete(`/notification/${notificationId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default deleteNotification;
