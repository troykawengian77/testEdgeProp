import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    TextInput, ActivityIndicator,
    ScrollView, Image, TouchableOpacity
} from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loading from '../lib/components/Loading';
import { getListEpisode } from '../redux/episode/actions';
import { API } from '../lib/api';
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';

const EpisodePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();
    const results = useSelector(state => state.episode.list_episode);
    const info = useSelector(state => state.episode.info);
    const loading = useSelector(state => state.episode.loading);
    const netInfo = useNetInfo();

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [dataImage, setDataImage] = useState([]);
    const [loadImage, setLoadImage] = useState(false);

    useEffect(() => {
        setPage(1)
        dispatch(getListEpisode(page))
    }, [isFocus]);

    useEffect(() => {
        if (results) {
            setData(results)
        }
    }, [results]);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const _onLoadMore = () => {
        let pageCount = page + 1
        if (pageCount <= info.pages) {
            setPage(pageCount)
            dispatch(getListEpisode(pageCount))
            setData(data.concat(results))
        }
    }

    const _onImageLoad = (index, arrData) => {
        let results = []
        setLoadImage(true)
        for (let i = 0; i < 4; i++) {
            const { request } = API();
            try {
                request.get(arrData[i].substring(32))
                    .then(res => {
                        let resp = res?.data
                        results.push(resp.image)
                        let temp_state = [...data];
                        let temp_element = { ...temp_state[index] };
                        temp_element.image = results;
                        temp_state[index] = temp_element;
                        setData(temp_state);
                    })
            } catch (err) {
                if (err.toJSON().message === 'Network Error') {
                    Toast.show({
                        text1: 'Please check your internet connection. You need to be online to access the app.',
                        type: 'error',
                        visibilityTime: 2500,
                    });
                }
            }
        }
    }

    const _renderItem = (item, key) => {
        let countImage = data[key].characters.length
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EpisodeDetail', { id: item.id })} key={key} style={styles.containerBox}>
                <View style={styles.containerList}>
                    <Text style={[styles.contentTitle]}>{item.episode}: {item.name}</Text>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.contentSubTitle]}>Aired in {item.air_date}</Text>
                        {
                            !item.image &&
                            <TouchableOpacity onPress={() => _onImageLoad(key, item.characters)}>
                                <Text style={[styles.contentSubTitle, { color: '#6393dF' }]}>Who appeared in this episode ?</Text>
                            </TouchableOpacity>
                        }
                        <View style={styles.imageContainer}>
                            {
                                item.image &&
                                item.image.map((eVal, eKey) => {
                                    return (
                                        <Image
                                            key={eKey}
                                            resizeMode='cover'
                                            style={styles.avatar}
                                            source={{ uri: eVal }}
                                        />
                                    )
                                })
                            }
                            {
                                item.image &&
                                <View style={styles.avatarCount}>
                                    <Text style={styles.avatarCountText}>{countImage - 4}+</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    _onLoadMore()
                }
            }}
            scrollEventThrottle={400}
        >
            <Loading visible={loading} />
            <View style={styles.container}>
                <Text style={styles.textLabel}>Episode List</Text>
                <View>
                    {
                        data &&
                            data.length > 0 &&
                            data.map((item, key) => _renderItem(item, key))
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    containerBox: {
        backgroundColor: '#fff',
        color: '#424242',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0.15,
            height: 0.15,
        },
        shadowOpacity: 0.075,
        shadowRadius: 5,
        elevation: 3,
        backfaceVisibility: 'hidden',
    },
    containerList: {
        // flexDirection: 'row'
    },
    imageContainer: {
        flexDirection: 'row'
    },
    contentContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    input: {
        backgroundColor: '#fff',
        color: '#424242',
        padding: 3,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0.15,
            height: 0.15,
        },
        shadowOpacity: 0.075,
        shadowRadius: 5,
        elevation: 3,
        backfaceVisibility: 'hidden',
    },
    textLabel: {
        fontSize: 20,
        marginVertical: 10
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginHorizontal: 5
    },
    avatarCount: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9DA3AE',
    },
    avatarCountText: {
        color: '#fff',
        fontSize: 20
    },
    contentTitle: {
        fontSize: 15,
        backgroundColor: '#737BC6',
        color: '#fff',
        padding: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    contentSubTitle: {
        fontSize: 14,
        marginVertical: 5
    }
})


export default EpisodePage