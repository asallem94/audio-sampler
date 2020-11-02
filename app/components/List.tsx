import React from 'react'
import { FlatList, Text, ImageStyle, TextStyle, ViewStyle, TouchableOpacity, ImageBackground, Dimensions, View, SafeAreaView } from 'react-native'
import { fetchAudios } from '../utils'
import Player from './Player'
import Header from './Header'
import { Typography } from '../theme'
interface ListProps {
}
interface ListState {
    audios: Array<AudioType>
}
interface AudioType {
    id: string
    imgUrl: string
    audioUrl: string
}

class List extends React.Component<ListProps, ListState> {
    state = {
        audios: [],
        selectedAudioId: ''
    }
    componentDidMount() {
        this.fetchAudios()
    }
    fetchAudios = async () => {
        const audios = await fetchAudios()
        this.setState({ audios })
    }
    setAudio = selectedAudioId => e => {
        this.setState({ selectedAudioId })
    }
    renderItem = ({ item: audio }) => (
        <TouchableOpacity onPress={this.setAudio(audio.id)} style={styles.cardContainer}>
            <ImageBackground
                source={{ uri: audio.imgUrl }}
                style={styles.imageStyle}
            >
                <Text style={styles.title}>{audio.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
    
    render() {
        const { audios, selectedAudioId } = this.state
        return (
            <> 
                <Header title='Sound Tester'/>
                <FlatList
                    style={Typography.listContainer}
                    data={audios}
                    renderItem={this.renderItem}
                    keyExtractor={({id}) => id }
                    ListFooterComponent={selectedAudioId !== '' && audios[selectedAudioId] && <View style={styles.emptyPlayerContainer}/>}
                />
                {selectedAudioId !== '' && audios[selectedAudioId] && 
                    <Player
                        audio={audios[selectedAudioId]}
                        setAudio={this.setAudio} />}
            </>
        )
    }
}
export default List
    
const { width } = Dimensions.get('window')
interface CardStyle {
    cardContainer: ViewStyle
    imageStyle: ImageStyle
    title: TextStyle,
    emptyPlayerContainer: ViewStyle
}
const styles: CardStyle = {
    cardContainer: {
        width: width - 20,
        alignSelf: 'center'
    },
    imageStyle: {
        flex: 1,
        height: 200,
        margin: 10,
    },
    emptyPlayerContainer: {
        height: 200
    },
    title: {
        ...Typography.title,
        ...Typography.textShadow,
    }
}