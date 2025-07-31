import { useState, type ReactNode } from "react";
import { selectAccessToken } from "../api/Auth/AuthSlice";
import { useSelector } from "react-redux";

export default function ProfilePage(): ReactNode {
  const accessToken = useSelector(selectAccessToken) ?? undefined;

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
