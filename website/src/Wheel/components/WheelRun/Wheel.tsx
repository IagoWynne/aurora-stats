import React, { useEffect, useRef, useState } from "react";

import { WheelModel } from "../../models";

interface Props {
  items: string[];
  size: number;
}

const getSpeedModifier = (currentSpeed: number): number => {
  if (currentSpeed > 10000) {
    return 30;
  } else if (currentSpeed > 5000) {
    return 50;
  } else if (currentSpeed > 2000) {
    return 70;
  } else {
    return 90;
  }
};

const Wheel = ({ items, size }: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const afterStopDelaySeconds = 5;
  const idleSpeed = 50;
  const fps = 60;

  const [wheel, setWheel] = useState<WheelModel | null>(null);
  const [speed, setSpeed] = useState(idleSpeed);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelStopped, setWheelStopped] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const wheel = new WheelModel(items, size, context);
      wheel.paint();
      setWheel(wheel);
    }
  }, [items, size, canvasRef]);

  useEffect(() => {
    if (wheel) {
      const interval = setInterval(() => {
        wheel.rotate(speed);
        wheel.paint();
      }, 1000 / fps);

      return () => {
        clearInterval(interval);
      };
    }
  }, [speed, wheel]);

  useEffect(() => {
    if (wheel) {
      const interval = setInterval(
        () => {
          const randomNumber = Math.random();

          if (speed <= 1) {
            setWheelStopped(true);
            setSpeed(0);

            setTimeout(() => {
              setIsSpinning(false);
              setWheelStopped(false);
              setSpeed(idleSpeed);
            }, afterStopDelaySeconds * 1000);
          } else if (isSpinning) {
            if (!wheelStopped) {
              const speedModifier = getSpeedModifier(speed);
              setSpeed(
                speed -
                  (speed /
                    (Math.floor(randomNumber * speedModifier) +
                      speedModifier)) *
                    10,
              );
            }
          }
        },
        1000 / (fps / 5),
      );

      return () => {
        clearInterval(interval);
      };
    }
  }, [wheel, speed, wheelStopped]);

  const spin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setSpeed(Math.floor(Math.random() * 100000) + 50000);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={`${size + 20}px`}
        height={size}
        onClick={spin}
      />
    </div>
  );
};

export default Wheel;
