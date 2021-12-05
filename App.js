import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./filters/Filter1";
import Filter2 from "./filters/Filter2";
import Filter3 from "./filters/Filter3";
import Filter4 from "./filters/Filter4";
import Filter5 from "./filters/Filter5";
import Filter6 from "./filters/Filter6";
import Filter7 from "./filters/Filter7";

const data = [
  {
    id: "1",
    image: require("./assets/crown.png"),
  },
  {
    id: "2",
    image: require("./assets/glasses-round.png"),
  },
  {
    id: "3",
    image: require("./assets/glasses.png"),
  },
  {
    id: "4",
    image: require("./assets/crown-pic1.png"),
  },
  {
    id: "5",
    image: require("./assets/crown-pic2.png"),
  },
  {
    id: "6",
    image: require("./assets/flower-pic1.png"),
  },
  {
    id: "7",
    image: require("./assets/flower-pic2.png"),
  },
];

const App = () => {
  const [hasCameraPermission, setCameraPermission] = useState();
  const [faces, setFaces] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("filter_1");
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
          {faces.map((face) => {
            if (currentFilter === "filter_1") {
              return <Filter1 key={face.faceID} face={face} />;
            } else if (currentFilter === "filter_2") {
              return <Filter2 key={face.faceID} face={face} />;
            } else if (currentFilter === "filter_3") {
              return <Filter3 key={face.faceID} face={face} />;
            } else if (currentFilter === "filter_4") {
              return <Filter4 key={face.faceID} face={face} />;
            } else if (currentFilter === "filter_5") {
              return <Filter5 key={face.faceID} face={face} />;
            } else if (currentFilter === "filter_6") {
              return <Filter6 key={face.faceID} face={face} />;
            } else if (currentFilter === "filter_7") {
              return <Filter7 key={face.faceID} face={face} />;
            }
          })}
        </View>
        <View style={styles.framesContainer}>
          <ScrollView
            style={{ flexDirection: "row" }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {data.map((filter) => {
              return (
                <TouchableOpacity
                  style={styles.filterImageContainer}
                  onPress={() => setCurrentFilter(`filter_${filter.id}`)}
                >
                  <Image
                    source={filter.image}
                    style={{ height: 32, width: 80 }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headingContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 30 },
  cameraStyle: { flex: 0.65 },
  framesContainer: {
    flex: 0.2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  filterImageContainer: {
    height: "8%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginRight: 20,
  },
});
