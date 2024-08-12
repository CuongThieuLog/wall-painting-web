import { request } from "../utils/request";

export const createIntent = async ({
  amount,
}: {
  amount: number;
}): Promise<{ paymentIntent: string; client_secret: string }> => {
  try {
    const response = await request.post("api/payment/create-intent", {
      amount,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
