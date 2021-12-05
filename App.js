import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./filters/Filter1";

const App = () => {
  const [hasCameraPermission, setCameraPermission] = useState();
  const [faces, setFaces] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);
  const onFacesDetected = ({ faces }) => {
    setFaces(faces);
  };
  const onFaceDetectionError = (e) => {
    console.log(e);
  };
  if (hasCameraPermission == null) {
    return <View />;
  }
  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>FACE FILTERS</Text>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all,
            }}
            onFacesDetected={onFacesDetected}
            onFacesDetectionError={onFaceDetectionError}
          />
          {faces.map((face) => (
            <Filter1 key={face.faceID} face={face} />
          ))}
        </View>
        <View style={styles.filterContainer}></View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headingContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 30, color: "#fff" },
  cameraStyle: { flex: 0.65 },
  filterContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  actionContainer: {},
});
