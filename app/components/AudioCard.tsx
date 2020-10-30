import React from 'react'
import { Image, ImageStyle } from 'react-native'

export default ({ item: audio }) => {
    return (
        <Image
            source={{ uri: audio.imgUrl }}
            style={styles.imageStyle}
        />
    )
}

interface CardStyle {
    imageStyle: ImageStyle
}
const styles: CardStyle = {
    imageStyle: {
        width: '90%',
        height: 300,
        margin: 10,
        alignSelf: 'center'
    }
}