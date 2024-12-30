import { useCallback } from "react";

import { useNavigate } from "react-router";

import useNotificationStore from "../stores/useNotificationStore";

import { getAllNotification, deleteNotification } from "../services/notification";

const useControlNotifications = () => {
  const navigate = useNavigate();
  const { toast, allNotification, setAllNotification, setRemoveNotification } =
    useNotificationStore();

  const getUserNotifications = useCallback(async () => {
    try {
      const fetchedData = await getAllNotification();
      setAllNotification(fetchedData);
    } catch (err) {
      console.log(err);
    }
  }, [setAllNotification]);

  const handleDeleteNotification = useCallback(
    async (notificationId) => {
      try {
        await deleteNotification(notificationId);
        setRemoveNotification(notificationId);
      } catch (err) {
        navigate("/error", { state: { message: "알림을 삭제하는데 실패했습니다." } });
      }
    },
    [setRemoveNotification, navigate]
  );

  return { toast, allNotification, getUserNotifications, handleDeleteNotification };
};

export default useControlNotifications;
