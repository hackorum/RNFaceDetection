import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./Filter1";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
    };
    this.onCameraPermission = this.onCameraPermission.bind(this);
    this.onFacesDetected = this.onFacesDetected.bind(this);
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
  }
  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
  }
  onCameraPermission = ({ status }) => {
    this.setState({ hasCameraPermission: status === "granted" });
  };
  onFacesDetected = ({ faces }) => {
    this.setState({ faces: faces });
  };
  onFaceDetectionError = (e) => {
    console.log(e);
  };

  render() {
    const { hasCameraPermission } = this.state;
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
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFaceDetectionError}
          />
          {this.state.faces.map((face) => (
            <Filter1 key={face.faceID} face={face} />
          ))}
        </View>
        <View style={styles.filterContainer}></View>
        <View style={styles.actionContainer}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 30 },
  cameraStyle: { flex: 0.65 },
  filterContainer: {},
  actionContainer: {},
});
