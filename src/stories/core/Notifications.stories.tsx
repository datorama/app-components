import React from "react";

// Components
import {
  useSnackbar,
  useToast,
  NotificationType,
  NotificationsProvider
} from "packages/core/Notifications";
import Button from "packages/core/Button";

export const Default = () => {
  const { addToast } = useToast();
  const { addSnackbar } = useSnackbar();

  const config = {
    id: new Date().getTime(),
    index: 1,
    type: NotificationType.Info,
    title: "Notification title",
    subtitle: "Notification Subtitle",
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: 240 }}
    >
      <Button onClick={() => addToast(config)}>Add Toast</Button>
      <Button onClick={() => addSnackbar(config)}>Add Snackbar</Button>
    </div>
  );
};

export default {
  title: "Core/Notifications",
  component: NotificationsProvider,
};
