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
import { getDetailCharacter } from '../redux/character/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../lib/components/Loading';
import Header from '../lib/components/Header';
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';

const dimensions = Dimensions.get('window');
const Height = dimensions.height;
const Width = dimensions.width;

const CharacterDetailPage = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();
    const results = useSelector(state => state.character.detail_character);
    const loading = useSelector(state => state.character.loading);
    const netInfo = useNetInfo();

    const { id } = route.params

    useEffect(() => {
        dispatch(getDetailCharacter(id))
        console.log(results)
    }, [isFocus]);

    const _renderItem = () => {
        console.log(results)
        return (
            <View>
                <Image
                    resizeMode='cover'
                    style={styles.avatar}
                    source={{ uri: results.image }}
                />
                <View style={styles.containerBox}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentTitle}>{results.name}</Text>
                        <View style={styles.containerList}>
                            <Text style={[styles.contentSubTitle, {borderBottomColor: '#D1D5DB', borderBottomWidth: 0.8}]}>{results.species}</Text>
                            <Text style={[styles.contentSubTitle, {borderBottomColor: '#D1D5DB', borderBottomWidth: 0.8}]}>{results.status}</Text>
                            <Text style={styles.contentSubTitle}>{results.location.name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Header
                title="Character Detail"
                onPressLeft={() => navigation.pop(1)}
            />
            <Loading visible={loading} />
            <View style={styles.container}>
                {
                    results && _renderItem()
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBox: {
        width: Width * 0.9,
        marginTop: -50,
        color: '#424242',
        padding: 3,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#D1D5DB',
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
        width: Width * 0.75,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 20,
        marginVertical: 10
    },
    avatar: {
        height: Width * 0.7,
        width: Width * 0.7,
        borderRadius: 5,
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
        zIndex: 99,
        alignSelf: 'center'
    },
    contentTitle: {
        color: '#000',
        fontSize: 20
    },
    contentSubTitle: {
        fontSize: 14,
        padding: 5,
        width: '100%',
        textAlign: 'center'
    }
})


export default CharacterDetailPage