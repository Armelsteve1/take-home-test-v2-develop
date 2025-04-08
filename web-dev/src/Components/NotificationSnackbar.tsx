import { Alert, Snackbar } from "@mui/material";
import exp from "constants";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity: NotificationType;
  autoHideDuration?: number;
}

export function NotificationSnackbar ({
    open,
    message,
    onClose,
    severity ="success",
    autoHideDuration = 5000,
}: NotificationSnackbarProps): JSX.Element{
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
