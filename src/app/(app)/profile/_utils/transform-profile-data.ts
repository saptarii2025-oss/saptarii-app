import { UpdateUserInput } from "@/types/user";

export const transformProfileData = (data: any): UpdateUserInput => {
  return {
    name: data.name,
    username: data.username,
    phoneNumber: data.phoneNumber,
    addressId: data.addressId?.value || data.addressId,
  };
};
