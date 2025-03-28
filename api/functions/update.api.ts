import { updateProps } from "@/typescript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import { MutationFunction } from "@tanstack/react-query";


export const updateProductFn: MutationFunction<updateProps> = async (
  variables: unknown
) => {
  const payload = variables as updateProps;
  if (!payload._id) {
    throw new Error("Product ID is required for update.");
  }

  const res = await axiosInstance.put<updateProps>(
    `${endPoints.pages.update}/${payload._id}`,
    payload
  );
  return res.data;
};
