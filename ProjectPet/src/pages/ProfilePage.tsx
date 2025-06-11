import { useEffect, useState, type ReactNode } from "react";
import { GetTestEPAsync } from "../api/testEP";
import { TestEndpoints } from "../api/endpoints";

export default function ProfilePage(): ReactNode {
  const [test, setTest] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    GetTestEPAsync(TestEndpoints.TestAuth).then((response) =>
      setTest(response.result)
    );
  }, []);
  return <>Profile of {test?.map((x) => x)}</>;
}
