import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView, Image, Alert
} from 'react-native';
import { getListCharacter } from '../redux/character/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../lib/components/Loading';
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';

const CharacterPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();
    const results = useSelector(state => state.character.list_character);
    const info = useSelector(state => state.character.info);
    const loading = useSelector(state => state.character.loading);
    const netInfo = useNetInfo();

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        setPage(1)
        dispatch(getListCharacter(page))
    }, [isFocus]);

    useEffect(() => {
        if (data.length == 0) {
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
            dispatch(getListCharacter(pageCount))
            setData(data.concat(results))
        }
    }

    const _renderItem = (item, key) => {
        console.log(item)
        return (
            <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { id: item.id })} key={key} style={styles.containerBox}>
                <View style={styles.containerList}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.contentTitle, { color: item.gender == 'Male' ? '#6393dF' : '#FEAFB9' }]}>{item.name}</Text>
                        <Text style={styles.contentSubTitle}>{item.species}</Text>
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
                <Text style={styles.textLabel}>Character List</Text>
                <View>
                    {
                        // console.log('data', data)
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
        padding: 3,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
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
        flexDirection: 'row'
    },
    imageContainer: {
        width: '40%'
    },
    contentContainer: {
        width: '60%'
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
        height: 120,
        width: 120,
        borderRadius: 5
    },
    contentTitle: {
        fontSize: 18
    },
    contentSubTitle: {
        fontSize: 14
    }
})


export default CharacterPage