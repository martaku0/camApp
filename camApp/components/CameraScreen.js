import React, { Component } from 'react';
import { Camera, FlashMode } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { View, Text, StyleSheet, Button, TextInput, FlatList, BackHandler, ToastAndroid, Animated } from 'react-native';
import CircleButton from './CircleButton';
import RadioGroup from './RadioGroup';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            pos: new Animated.Value(1000),
            wb: 0,
            fm: 0,
            ratio: "16:9",
            size: "1920x1080",
            sizes: ["1920x1080"],
            camera: null
        };
        this.setState = this.setState.bind(this);
        this.isHidden = true
        this.camera = null
        console.log("Camera")
    }

    toggle = () => {
        this.getSizes()
        if (this.isHidden) toPos = 0; else toPos = 1000
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentDidUpdate() {
        this.getSizes()
    }

    getSizes = async () => {
        if (this.state.camera) {
            const sizes_1 = await this.state.camera.getAvailablePictureSizesAsync(this.state.ratio)
            if (sizes_1 != this.state.sizes) {
                this.setState({
                    sizes: sizes_1
                })
            }
        }
        else {
            // console.log('cannot find sizes')
        }
    }

    takePhoto = async () => {
        if (this.state.camera) {
            let foto = await this.state.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            ToastAndroid.showWithGravity(
                "Photo taken",
                ToastAndroid.CENTER,
                ToastAndroid.SHORT
            )
        }
        else {
            alert("cannot take a photo")
        }
    }

    getCameraRef = (ref) => {
        // this.camera = ref
        this.setState({
            camera: ref
        })
        this.getSizes()
    }

    async componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack()
        return true;
    }

    changeCameraView = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {

            const wbTypes = [];
            for (let key of Object.keys(Camera.Constants.WhiteBalance)) {
                wbTypes.push({ name: key, value: Camera.Constants.WhiteBalance[key] })
            }

            const flashTypes = [];
            for (let key of Object.keys(Camera.Constants.FlashMode)) {
                flashTypes.push({ name: key, value: Camera.Constants.FlashMode[key] })
            }

            const sizeTypes = [];
            this.state.sizes.forEach(element => {
                sizeTypes.push({ name: element, value: element })
            });

            const ratioTypes = [{ name: "4:3", value: "4:3" }, { name: "16:9", value: "16:9" }];



            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={this.getCameraRef}
                        style={{ flex: 1 }}
                        type={this.state.type}
                        whiteBalance={this.state.wb}
                        flashMode={this.state.fm}
                        ratio={this.state.ratio}
                        pictureSize={this.state.size}
                    >
                        <View style={styles.buttons}>
                            <CircleButton title="⚙" onPress={this.toggle} />
                            <CircleButton title="↻" onPress={this.changeCameraView} />
                            <CircleButton title="＋" onPress={this.takePhoto} />
                        </View>
                    </Camera>
                    <Animated.View
                        style={[
                            styles.animatedView,
                            {
                                transform: [
                                    { translateY: this.state.pos }
                                ]
                            }]} >
                        <Text style={{ color: "white", fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>SETTINGS</Text>
                        <RadioGroup groupName="WHITE BALANCE" data={wbTypes.reverse()} currentState={this.state.wb} changeState={this.setState} type={'wb'} />
                        <RadioGroup groupName="CAMERA RATIO" data={ratioTypes} currentState={this.state.ratio} changeState={this.setState} type={'ratio'} />
                        <RadioGroup groupName="PICTURE SIZES" data={sizeTypes} currentState={this.state.size} changeState={this.setState} type={'size'} />
                        <RadioGroup groupName="FLASH MODE" data={flashTypes.reverse()} currentState={this.state.fm} changeState={this.setState} type={'fm'} />

                    </Animated.View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 20
    },
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: 200,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5
    }
})

export default CameraScreen;