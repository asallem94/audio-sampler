import React from 'react'
import { FlatList, Image } from 'react-native'
import { fetchAudios } from '../utils'
import AudioCard from './AudioCard'
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
        selectedAudioId: null
    }
    componentDidMount() {
        this.setAudios()
    }
    setAudios = async () => {
        const audios = await fetchAudios()
        this.setState({ audios })
    }
    renderItem = ({item: audio}) => {
        return (
            <Image
                source={{uri: audio.imgUrl}}
                style={{ width: 200, height: 300, backgroundColor: 'red' }}
            />
        )
    }
    render() {
        const { audios } = this.state
        console.log('Typography', Typography.listContainer)
        return (
            <>
                <FlatList
                    style={Typography.listContainer}
                    data={audios}
                    renderItem={AudioCard}
                    keyExtractor={({id}) => id }/>
            </>
        )
    }
}
export default List