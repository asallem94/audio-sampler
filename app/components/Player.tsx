import React from 'react'
import Controls from './controls/Controls'
import TrackPlayer, { ProgressComponent, TrackPlayerEvents } from 'react-native-track-player';
import ProgressBar from './controls/ProgressBar';

class Player extends ProgressComponent {
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
            await TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP,
                    // TrackPlayer.CAPABILITY_JUMP_FORWARD,
                    // TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                ]
            })

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
        this.remoteStopListener = TrackPlayer.addEventListener('remote-stop', () => {
            TrackPlayer.destroy()
        })
        this.remotePlayListener = TrackPlayer.addEventListener('remote-play', () => {
            TrackPlayer.play()
        })
        this.remotePauseListener = TrackPlayer.addEventListener('remote-pause', () => {
            TrackPlayer.pause()
        })
        // this.remoteForwardListener = TrackPlayer.addEventListener('remote-jump-forward', () => {
        //     TrackPlayer.seekTo(this.state.position + 30)
        // })
        // this.remoteBackwardListener = TrackPlayer.addEventListener('remote-jump-backward', () => {
        //     TrackPlayer.seekTo(this.state.position - 30)
        // })
    }
    componentWillUnmount() {
        this.remoteStopListener.remove()
        this.remotePlayListener.remove()
        this.remotePauseListener.remove()
        // this.remoteForwardListener.remove()
        // this.remoteBackwardListener.remove()
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