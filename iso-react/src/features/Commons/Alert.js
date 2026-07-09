import Swal from "sweetalert2";
import { theme } from "../../styles/theme";

export const customAlert = {
  success: (title, text = "") => {
    return Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonText: "확인",
      confirmButtonColor: theme.color.main,
      background: "#FFFDF2",
      color: theme.color.text2,
      customClass: {
        popup: "plogues-alert-popup",
        title: "plogues-alert-title",
        confirmButton: "plogues-alert-confirm",
      },
    });
  },

  error: (title, text = "") => {
    return Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonText: "확인",
      confirmButtonColor: theme.color.delete,
      background: "#FFFDF2",
      color: theme.color.text2,
      customClass: {
        popup: "plogues-alert-popup",
        title: "plogues-alert-title",
      },
    });
  },

  confirm: async (title, text = "") => {
    const result = await Swal.fire({
      icon: "question",
      title,
      text,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: theme.color.main,
      cancelButtonColor: "#B8B8B8",
      background: "#FFFDF2",
      color: theme.color.text2,
      customClass: {
        popup: "plogues-alert-popup",
        title: "plogues-alert-title",
      },
    });
    return result.isConfirmed;
  },
};
