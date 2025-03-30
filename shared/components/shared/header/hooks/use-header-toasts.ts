import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useHeaderToasts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Ваш заказ успешно оплачен!";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Ваш аккаунт успешно подтвержден!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 700);
    }
  }, []);
};
