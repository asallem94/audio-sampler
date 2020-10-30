export const fetchAudios = () => {
    return Array.from(new Array(16).keys()).map((index) => ({
        id: index,
        title: `Sound Helix ex: ${index+1}`,
        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${index+1}.mp3`,
        imgUrl: 'https://img.chainimage.com/images/blurry-circles-wallpaper-abstract-wallpapers.jpg',
    }))
}