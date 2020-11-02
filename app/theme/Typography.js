export const typography = {
    header: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textShadow: {
        textShadowColor:'#585858',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius: 10,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        // alignItems: 'center'
    },
    mask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.8)',
        // backgroundColor: 'red',
    },
    playerContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white',
        backgroundColor: 'lightgray',
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
    },
    title: {
        margin: 10,
        paddingHorizontal: 40,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: 'white',
        flex: 0,
    },
    seekBall: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -10+1.5,
        left: -10,
        borderRadius: 25,
        backgroundColor: 'red'
    }
}