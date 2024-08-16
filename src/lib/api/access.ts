import { request } from "../utils/request";

export type CreateAccessType = {
  visit?: string;
};

const createAccess = async (payload: CreateAccessType) => {
  return await request.post("/api/access", payload);
};

const getAccessStatisticsByMonth = () =>
  request.get("/api/access/statistics/by-month");

export { createAccess, getAccessStatisticsByMonth };
