import { createOrder } from "@/src/lib/api";
import { createIntent } from "@/src/lib/api/payment";
import { updateUserCart } from "@/src/lib/api/user";
import { updateCart } from "@/src/lib/redux/userSlice";
import { Box, Button } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutForm = ({
  amount,
  data,
  name,
  phone,
  address,
  note,
  mutate,
  mutateCreateIntent,
}: {
  amount: number;
  data: any;
  name: string;
  phone: string;
  address: string;
  note: string;
  mutate: any;
  mutateCreateIntent: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);

  //   const mutateCreateIntent = useMutation({
  //     mutationFn: createIntent,
  //     onError: () => {
  //       toast.error("Khởi tạo thanh toán thất bại");
  //     },
  //   });

  //   const { mutate, isLoading } = useMutation({
  //     mutationFn: createOrder,
  //     onError: (error) => {
  //       toast.error("Đặt hàng thất bại");
  //     },
  //   });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint

    const { paymentIntent: clientSecret } =
      await mutateCreateIntent.mutateAsync({
        amount: amount,
      });

    if (!clientSecret) {
      return;
    }

    mutate(
      {
        visit: localStorage?.getItem("visit") as string,
        name: name,
        phone: phone,
        address: address,
        note: note,
        user: user._id,
        cart: data?.map((e: any) => ({
          paint: e?.paint?._id,
          amount: e?.amount,
        })),
      },
      {
        onSuccess: async () => {
          dispatch(updateCart([]));
          await updateUserCart({
            listCart: [],
          });

          const { error } = await stripe?.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              return_url: `http://localhost:3000/me/cart`,
            },
          });

          if (error) {
            setErrorMessage(error.message);
          } else {
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          type="submit"
          disabled={!stripe || !elements}
          mt={2}
        >
          Thanh toán
        </Button>
      </Box>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export { CheckoutForm };
