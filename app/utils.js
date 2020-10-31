import { images } from "./theme/Images"


const Img = [
  'https://img.chainimage.com/images/blurry-circles-wallpaper-abstract-wallpapers.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhJ7doB1uAo4-fDwTkT2e4jyF7eZuWDhHTfQ&usqp=CAU',
  'https://free4kwallpapers.com/uploads/originals/2020/09/04/neon-background--wallpaper.jpg',
  'https://i.pinimg.com/originals/0d/ba/57/0dba57a96d995f5b92d6294245ead3eb.jpg',
  'https://i.pinimg.com/originals/0a/4d/cb/0a4dcb92fa2d3c601b58d72720d6bec4.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9xo1RRS-B5H460nfNX5JaOIhuw8YEDZ6NgQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT34pQFW39JCVCiH1SSuIm_oPgVczeeiQh1-g&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcC8zH-_iSRtXh0FF5Tbss0skgfLtWGyVMrw&usqp=CAU',
  'https://thermaltake.azureedge.net/pub/media/wysiwyg/key3/wallpaper/pc/TT_Chao2_2560x1600.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzFZvFiV7FAYwqznS6qZATSQLg5mcfPeeP1g&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS_ktQDmQacBrW0p5n4QuVKjAHSN_GGFybGw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQyYffHUVtLlaw3_fdVhf0tCp4zepYJbL8Q6Q&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBSuUr9tNb1Syw_1jsxKNOny4fDbdZNrzYOw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9uT1-Z8fxZNK4gpFGSvnNH4vLWSmnOXQkAQ&usqp=CAU',
  'https://cdn.wallpaperhub.app/cloudcache/1/b/5/8/e/f/1b58ef6e3d36a42e01992accf5c52d6eea244353.jpg',
  'https://media.idownloadblog.com/wp-content/uploads/2019/01/Abstract-leaves-for-iPhone-XS-Max-evgeniyzemelko.png',
]

export const fetchAudios = () => {
    return Array.from(new Array(16).keys()).map((index) => ({
        id: `${index}`,
        title: `Sound Helix ex: ${index+1}`,
        artist: 'Track Artist',
        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${index+1}.mp3`,
        imgUrl: Img[index],
    }))
}

export const debounce = function (fn, wait) {
  let t
  return function () {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, arguments), wait)
  }
}
