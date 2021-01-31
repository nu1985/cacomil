import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default class Loading extends React.Component {

    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        elevation: 5,
    }
  })