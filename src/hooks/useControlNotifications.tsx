import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import useNotificationStore from "stores/useNotificationStore";

import {
  getAllNotification,
  deleteNotification,
  deleteAllNotification,
} from "services/notificationServices";

const useControlNotifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    async (notificationId: string) => {
      try {
        await deleteNotification(notificationId);
        setRemoveNotification(notificationId);
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "알림을 삭제하는데 실패했어요." },
        });
      }
    },
    [setRemoveNotification, navigate, location]
  );

  const handleDeleteAllNotification = useCallback(async () => {
    try {
      await deleteAllNotification();
      setAllNotification([]);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "전체 알림을 삭제하는데 실패했어요." },
      });
    }
  }, [setAllNotification, navigate, location]);

  return {
    toast,
    allNotification,
    getUserNotifications,
    handleDeleteNotification,
    handleDeleteAllNotification,
  };
};

export default useControlNotifications;
