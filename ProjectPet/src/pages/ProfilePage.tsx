import { useEffect, useState, type ReactNode } from "react";
import { TestEndpoints } from "../api/endpoints";
import { GetTestEPAsync } from "../api/Services/TestService";

export default function ProfilePage(): ReactNode {
  const [test, setTest] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    GetTestEPAsync(TestEndpoints.TestAuth).then((response) =>
      setTest(response.result)
    );
  }, []);
  return <>Profile of {test?.map((x) => x)}</>;
}
