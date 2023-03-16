export type loginResponse = {
  token: string;
  success: boolean;
};

// export type loginResponse = {
//   logged: boolean;
//   token: {
//     accessToken: string;
//   };
//   user: {
//     person_id: number;
//     login: string;
//   };
// };

export type errorResponse = {
  message: string;
  logged: boolean;
};
