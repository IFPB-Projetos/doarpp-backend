import axios from "axios";
import { mockGoogleUser } from "./mockGoogleUser";

type GoogleResponse = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  hd: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
};

export async function fetchGoogleUser(accessToken: string) {
  // for development uncomment
  // return mockGoogleUser;

  const res = await axios.get<GoogleResponse>(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res.data;
}
