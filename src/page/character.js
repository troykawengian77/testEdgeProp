import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView, Image
} from 'react-native';
import { getListCharacter } from '../redux/character/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../lib/components/Loading';


const CharacterPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();
    const results = useSelector(state => state.character.list_character);
    const info = useSelector(state => state.character.info);
    const loading = useSelector(state => state.character.loading);

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(getListCharacter(page))
        setData(results)
    }, [isFocus]);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const _onLoadMore = () => {
        let pageCount = page + 1
        console.log(pageCount)
        if (pageCount <= info.pages) {
            setPage(pageCount)
            dispatch(getListCharacter(pageCount))
            setData(data.concat(results))
        }
    }

    const _renderItem = (item, key) => {
        return (
            <View key={key} style={styles.containerBox}>
                <View style={styles.containerList}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentTitle}>{item.name}</Text>
                        <Text style={styles.contentSubTitle}>{item.species}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    console.log('masuk')
                    _onLoadMore()
                }
            }}
            scrollEventThrottle={400}
        >
            <Loading visible={loading} />
            <TouchableOpacity style={styles.container}>
                <Text style={styles.textLabel}>Character List</Text>
                <View>
                    {                        
                        data &&
                            data.length > 0 ?
                            data.map((item, key) => _renderItem(item, key))
                            : null
                    }
                </View>
            </TouchableOpacity>
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
        color: '#6393dF',
        fontSize: 18
    },
    contentSubTitle: {
        fontSize: 14
    }
})


export default CharacterPage