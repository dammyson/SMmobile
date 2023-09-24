import React from 'react'
import { Alert, Text, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, AsyncStorage, StatusBar } from 'react-native';
import Moment from 'moment';
import color from '../../component/color'
import { getType } from '../../component/utilities';
import { lightTheme } from '../../theme/colors';
import { font } from '../../constants';
import { Icon } from 'react-native-elements'

const BeneficiaryItem = ({ item, selectBeneficiary }) => {
    console.warn(item);
    return (
        <View style={{ height: 70, paddingHorizontal: 20, justifyContent: 'center', borderTopWidth: 0.3, borderTopColor: '#BFBFBF' }}>
            <TouchableOpacity onPress={() => selectBeneficiary(item)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>

                <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor:lightTheme.PRIMARY_COLOR, borderRadius: 8 }}>
                    <Icon
                        name={ "bank"}
                        size={20}
                        type='material-community'
                        color={lightTheme.WHITE_COLOR}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <View style={{ flex: 1 }}>

                        <View style={{}}>
                            <Text style={{ fontFamily: font.SEMI_BOLD, color: '#2E2E2E', fontSize: 14, opacity: 0.8, }}> {item.account_name}</Text>
                        </View>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#BFBFBF', fontSize: 10, }}>{item.bank_name} </Text>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#BFBFBF', fontSize: 10, }}>{item.account_number} </Text>

                    </View>

                   
                </View>
            </TouchableOpacity >
        </View>
    )
}

export default BeneficiaryItem

const styles = StyleSheet.create({

    resultDescription: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultBox: {
        height: 40,

        marginRight: 20,
        marginLeft: 20,
        marginBottom: 2,
        marginTop: 2,
        borderColor: '#70707040',
        borderBottomWidth: 0.4
    },
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    activeType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    inActiveType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    toggleText: {
        color: color.black,
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4
    },
    toggleTextInactive: {
        color: '#5F5C7F',
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
});
