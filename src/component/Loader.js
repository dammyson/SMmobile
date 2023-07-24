import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { SkypeIndicator } from 'react-native-indicators';
import { lightTheme } from '../theme/colors';
import { font } from '../constants';

const { height, width } = Dimensions.get("window");

class Loader extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }

    render() {
        const loader = this.props.loader
        return (
            <>
                {
                    loader.loading ?
                        <View style={styles.container} >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.welcome}>
                                    <SkypeIndicator color={lightTheme.PRIMARY_COLOR} size={45} />
                                    <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.LIGHT_ITALICS, fontSize: 11, marginBottom: 2, marginTop: 2 }}>{loader.message}</Text>
                                </View>

                            </View>
                        </View>
                        : null
                }
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        loader: state.loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        elevation: 2,
        height,
        width,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
    },
    welcome: {
        height: 85
    },
})
