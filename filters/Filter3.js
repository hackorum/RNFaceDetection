import React from "react";
import { View, Image } from "react-native";

const Filter3 = ({
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
        left: leftEyePosition.x - fw * 0.675,
        top: leftEyePosition.y - gh * 0.5,
      }}
    >
      <Image
        source={require("../assets/glasses.png")}
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

export default Filter3;
