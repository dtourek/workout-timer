import { useState, useEffect } from "react";

interface IDimensions {
  width: number;
  height: number;
}

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState<IDimensions>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};
