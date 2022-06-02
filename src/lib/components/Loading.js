import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ visible = false }) => {
    return (
        <View>
            <Modal transparent visible={visible}>
                <View style={styles.container}>
                    <ActivityIndicator color={'#6393dF'} size={'large'} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
})

export default Loading;
