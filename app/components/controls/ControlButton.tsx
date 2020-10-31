import React from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Typography, Images } from '../../theme'

export default function ({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={Images[title]} style={Typography.icon} />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    controlButtonContainer: {
        // flex: 1,
        marginHorizontal: 30,
        padding: 6,
        // backgroundColor: 'red',

    },
});