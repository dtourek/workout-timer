import { useState, useEffect } from "react";

interface IDimensions {
  width: number;
  height: number;
  isLandscape: boolean;
}

const isLandscape = ({ innerWidth, innerHeight }: { innerWidth: number; innerHeight: number }) => innerWidth > innerHeight;

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState<IDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    isLandscape: isLandscape(window),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight, isLandscape: isLandscape(window) });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};
