import { request } from "../utils/request";

type GenerateImage = {
  prompt: string;
};

export const generateImage = async (payload: GenerateImage) => {
  return await request.post("api/chatgpt/generate", payload);
};
