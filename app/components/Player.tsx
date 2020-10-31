import React from 'react'
import Controls from './controls/Controls'
import TrackPlayer, { TrackPlayerEvents } from 'react-native-track-player';

class Player extends React.Component {
    shouldComponentUpdate(prevProps) {
        const { audio } = this.props
        if (audio.id !== prevProps.audio.id) {
            return true
        }
        return false
    }
    componentDidMount(){
        const { audio } = this.props
        TrackPlayer.setupPlayer().then(async (res) => {

            // Adds a track to the queue
            await TrackPlayer.add({
                id: audio.id,
                url: audio.audioUrl,
                title: audio.title,
                artist: audio.artist,
                artwork: audio.imgUrl
            });
            
            // Starts playing it
            TrackPlayer.play();
        });
    }
    componentDidUpdate(prevProps) {
        const { audio } = this.props
        this.handleNewTrack(audio)
    }
    handleNewTrack = async (audio) => {
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: audio.id,
            url: audio.audioUrl,
            title: audio.title,
            artist: 'Track Artist',
            artwork: audio.imgUrl
        });
        TrackPlayer.play();
    }
    onTogglePlayback =(action) => {
        return () => {
            if (action === 'play') {
                TrackPlayer.play();
            } else {
                TrackPlayer.pause();
            }
        }
    }
    onDismiss = () => {
        const { setAudio} = this.props
        setAudio('')()
        TrackPlayer.stop();
        TrackPlayer.destroy();
    }
    render() {
        const { audio} = this.props
        return (
            <Controls 
                audio={audio}
                onTogglePlayback={this.onTogglePlayback}
                onDismiss={this.onDismiss} />
        )
    }
}

export default Player