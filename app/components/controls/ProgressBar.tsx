import React from "react";
import {
    View,
    Animated,
    Dimensions,
    StyleSheet,
} from "react-native";
import { Typography } from '../../theme'


const { width } = Dimensions.get('window')

export default function ({ progress, progressPosition, ballPosition, panResponder }) {
    return (
        <View style={styles.progress}>
            <View style={{ flex: progressPosition, backgroundColor: "red" }} />
            <View
                style={{
                    flex: progress.duration - progressPosition,
                    backgroundColor: "white"
                }}
            />
            <Animated.View
                style={[
                    Typography.seekBall,
                    { left: ballPosition }
                ]}
                {...panResponder.panHandlers}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    progress: {
        position: 'relative',
        height: 3,
        width: width * 0.9,
        flexDirection: "row"
    },
});