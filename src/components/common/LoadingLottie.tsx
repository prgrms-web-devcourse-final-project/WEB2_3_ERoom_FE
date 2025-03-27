import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";
import loadingLottie from "../../assets/animations/loadingLottie.json";

const LoadingLottie = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.7);
    }
  }, []);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={loadingLottie}
      loop={true}
      className="w-80 h-80"
    />
  );
};

export default LoadingLottie;
