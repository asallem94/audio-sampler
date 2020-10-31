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
    PanResponder,
} from "react-native";
import {debounce} from '../../utils'
import { Typography } from '../../theme'
import ControlButton from './ControlButton'
import ProgressBar from './ProgressBar'

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
    const offset = useRef(progress.position)
    const seekTo = async (position) => {
        await setSeeker(true)
        await TrackPlayer.seekTo(position)
        await setRefresher(3)
        await setSeeker(false)
    }
    const seekIncrement = increment => {
        if (seeking ) {
            offset.current += increment
        } else {
            seekTo(offset.current + increment)
        }
    }
    if (!seeking) {
        if (refresher > 0) {
            if (refresher === 1 && (offset.current - 15 > progress.position || offset.current + 15 < progress.position )) {
                seekTo(offset.current)
            }
            setRefresher(refresher - 1)
        } else {
            offset.current = progress.position
        }
    }
    // const panResponder = React.useRef(
    //     PanResponder.create({
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderGrant: () => {
    //         },
    //         onPanResponderMove: (_, gestureState) => {
    //             offset.current += gestureState.dx
    //         },
    //         onPanResponderRelease: () => {
                
    //         }
    //     })
    // ).current;
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
                        progressPosition={pausePlayButton === 'pause' ? offset.current : progress.position}
                        // panResponder={panResponder}
                        />
                </View>
            </ImageBackground>
        )
    }
    return null
}

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