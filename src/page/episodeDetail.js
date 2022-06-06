import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView, Image, Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../lib/components/Loading';
import Header from '../lib/components/Header';
import { getDetailEpisode } from '../redux/episode/actions';
import { API } from '../lib/api';
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';

const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;

const EpisodeDetailPage = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();
    const results = useSelector(state => state.episode.detail_episode);
    const resultsCharacters = useSelector(state => state.episode.detail_episode?.characters);
    const loading = useSelector(state => state.episode.loading);

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [dataImage, setDataImage] = useState([]);
    const netInfo = useNetInfo();

    const { id } = route.params

    useEffect(() => {
        dispatch(getDetailEpisode(id))
    }, [isFocus]);

    useEffect(() => {
        if (resultsCharacters) {
            _loadImage()
        }
    }, [resultsCharacters]);

    const _loadImage = async () => {
        const { request } = API();
        let arrResults = []
        for (const arrImage of resultsCharacters) {
            try {
                await request.get(arrImage.substring(32))
                    .then(res => {
                        let resp = res?.data
                        let arrImage = {
                            image: resp.image,
                            name: resp.name
                        }
                        arrResults.push(arrImage)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        setDataImage(arrResults)
    }

    const _loadColor = (val) => {
        let number = Math.round(val.substring(1, 3))
        let color = '#87C2F6'
        if (number % 2 == 0) {
            color = '#30CE72'
        }
        return color
    }


    const _renderItem = () => {
        console.log('episode')
        return (
            <View>
                <View style={styles.containerTitle}>
                    <Text style={[styles.textTitle, { color: _loadColor(results.episode) }]}>{results.episode}</Text>
                    <Text style={styles.textTitle}>{results.name}</Text>
                    <Text style={styles.textLabel}>{results.air_date}</Text>
                </View>
                <Text style={styles.textLabel}>This characters appeared in this episode : </Text>
                {
                    dataImage &&
                    dataImage.length > 0 &&
                    dataImage.map((el, ek) => {
                        return (
                            <View key={ek} style={styles.containerList}>
                                <Image style={styles.avatar} source={{ uri: el.image }} />
                                <Text style={styles.contentTitle}>{el.name}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Header
                title="Episode Detail"
                onPressLeft={() => navigation.pop(1)}
            />
            <Loading visible={loading} />
            <View style={styles.container}>
                {
                    results &&
                    _renderItem()
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    containerTitle: {
        borderBottomColor: '#D1D5DB',
        borderBottomWidth: 1,
    },
    containerList: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
    contentContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 28,
        marginVertical: 5
    },
    textLabel: {
        fontSize: 16,
        marginVertical: 10
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 5
    },
    contentTitle: {
        color: '#000',
        fontSize: 20,
        marginLeft: 20
    },
    contentSubTitle: {
        fontSize: 14,
        padding: 5,
        width: '100%',
        textAlign: 'center'
    }
})


export default EpisodeDetailPage