import { useEffect, useState } from "react";
import { useParams } from "react-router";

const usePathFromParams = () => {
  const params = useParams();
  const [path, setPath] = useState("");

  useEffect(() => {
    if (params && Object.keys(params).length > 0) {
      const pathStr = Object.entries(params)
        .map(([key, value]) => `${key}/${value}`)
        .join("/");
      setPath(pathStr);
    } else {
      setPath("");
    }
  }, [params]);

  return path;
};

export default usePathFromParams;
