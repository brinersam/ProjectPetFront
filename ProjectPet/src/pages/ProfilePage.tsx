import { type ReactNode } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../modules/Auth/AuthSlice";

export default function ProfilePage(): ReactNode {
  const accessToken = useSelector(authSelectors.selectAccessToken) ?? undefined;

  return (
    <>
      Profile of {accessToken}
      {/* {false ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        test?.map((x) => x)
      )} */}
    </>
  );
}
