const acquireAccount = (id: number) => {
  const accounts = [
    {
      email: process.env.USER_0_GOOGLE_EMAIL || "",
      password: process.env.USER_0_GOOGLE_PASSWORD || "",
    },
    {
      email: process.env.USER_1_GOOGLE_EMAIL || "",
      password: process.env.USER_1_GOOGLE_PASSWORD || "",
    },
  ];

  return accounts[id];
};

export default acquireAccount;
