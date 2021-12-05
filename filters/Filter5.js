import React from "react";
import { View, Image } from "react-native";

const Filter1 = ({
  face: {
    bounds: {
      size: { width: fw, height: fh },
    },
    leftEyePosition,
    rightEyePosition,
  },
}) => {
  const gh = fh / 3;

  const transformAngle = (
    angle = Math.atan(
      (rightEyePosition.y - leftEyePosition.y) /
        (rightEyePosition.x - leftEyePosition.x)
    )
  ) => (angle * 180) / Math.PI;

  return (
    <View
      style={{
        position: "absolute",
        left: leftEyePosition.x - fw,
        top: leftEyePosition.y - fh * 0.675,
      }}
    >
      <Image
        source={require("../assets/crown-pic2.png")}
        style={{
          width: fw,
          height: gh,
          resizeMode: "contain",
          transform: [{ rotate: `${transformAngle()}deg` }],
        }}
      />
    </View>
  );
};

export default Filter1;
