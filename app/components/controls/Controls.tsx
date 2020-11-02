import React, { useState, useRef } from "react";
import TrackPlayer, {
    useTrackPlayerProgress,
    usePlaybackState,
    useTrackPlayerEvents,
} from "react-native-track-player";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Dimensions,
    PanResponder,
    Animated,
} from "react-native";
import { Typography } from '../../theme'
import ControlButton from './ControlButton'
import ProgressBar from './ProgressBar'
const { width } = Dimensions.get('window')

export default function Controls(props) {
    const { onTogglePlayback, onDismiss, audio } = props;
    const progress = useTrackPlayerProgress();
    
    const playbackState = usePlaybackState(); 
    const {title, imgUrl, artist} = audio

    let pausePlayButton = "play";
    
    if (
        playbackState === TrackPlayer.STATE_PLAYING ||
        playbackState === TrackPlayer.STATE_BUFFERING
    ) {
        pausePlayButton = "pause";
    }
    const [seeking, setSeeker] = useState(false);
    const [refresher, setRefresher] = useState(0);
    const offset = useRef(new Animated.Value(progress.position))
    const seekTo = async (position) => {
        await setSeeker(true)
        await TrackPlayer.seekTo(position)
        await setRefresher(3)
        await setSeeker(false)
    }
    const seekIncrement = increment => {
        if (seeking ) {
            offset.current.setValue(offset.current._value + increment)
        } else {
            offset.current.setValue(offset.current._value + increment)
            seekTo(offset.current._value)
        }
    }
    if (!seeking) {
        if (refresher > 0) {
            if (refresher === 1 && (offset.current._value - 15 > progress.position || offset.current._value + 15 < progress.position )) {
                seekTo(offset.current._value)
            }
            setRefresher(refresher - 1)
        } else {
            offset.current.setValue( progress.position )
        }
    }
    const calculatedBallPosition = () => {
        const progressPosition = seeking ? offset.current._value : progress.position 
        let completionRatio = progress.duration === 0 ? 0 : progressPosition / progress.duration
        completionRatio = completionRatio > 1 ? 1 : completionRatio
        completionRatio = completionRatio < 0 ? 0 : completionRatio
        return (completionRatio * width * 0.9) - 10
    }
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: async () => {
            await setSeeker(true)
        },
        onPanResponderMove: (_, gestureState) => {
            offset.current.setValue(gestureState.moveX)
        },
        onPanResponderRelease: async () => {
            await TrackPlayer.seekTo(offset.current._value)
            await setRefresher(3)
            await setSeeker(false)
        }
    })

    if (playbackState !== TrackPlayer.STATE_NONE) {
        return (
            <ImageBackground
                source={{ uri: imgUrl }}
                style={Typography.playerContainer}>
                <View style={[styles.card]}>
                    <View style={[styles.controls, {}]}>
                        <Text style={styles.title}>{title}</Text>
                        <ControlButton title={'close'} onPress={onDismiss} />
                    </View>
    
                    <Text style={styles.artist}>{artist}</Text>
                    <View style={[styles.controls, styles.card]}>
                        <ControlButton title={'rewind'} onPress={() => seekIncrement(-30)} />
                        <ControlButton title={pausePlayButton} onPress={onTogglePlayback(pausePlayButton)} />
                        <ControlButton title={'fastforward'} onPress={() => seekIncrement(30)} />
                    </View>
                    <ProgressBar
                        progress={progress}
                        progressPosition={pausePlayButton === 'pause' || seeking || refresher > 0 ? offset.current._value : progress.position}
                        ballPosition={calculatedBallPosition()}
                        panResponder={panResponder}
                        />
                </View>
            </ImageBackground>
        )
    }
    return null
}

// 

const styles = StyleSheet.create({
    card: {
        marginVertical: 20,
        alignItems: "center",
    },
    title: {
        marginTop: 10,
        ...Typography.title,
        ...Typography.textShadow,
    },
    artist: {
        fontWeight: "bold",
        color: 'white',
        ...Typography.textShadow,
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    },
});