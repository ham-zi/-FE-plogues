export const deleteAccount = (userPwd) => {
  return api.delete(`/users`, {
    data: { userPwd },
  });
};