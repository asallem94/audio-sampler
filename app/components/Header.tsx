import React from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import { Typography, Images } from '../theme'

export default function ({ title }) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        ...Typography.header,
        ...Typography.shadow,
    },
    title: {
        ...Typography.title,
        color: 'black'
    }
});