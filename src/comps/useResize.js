import { useState, useEffect } from 'react';

export default function useResize() {

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Attach event listener to window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions]);

  return {
    reactiveWidth: dimensions.width,
    reactiveHeight: dimensions.height,
    ratio: dimensions.width > dimensions.height ? "landscape" : "portrait",
  }

}
