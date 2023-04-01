import React from 'react'
import { StyleSheet, Text, Dimensions, View, TextInput } from 'react-native'
import PropTypes from 'prop-types';
import { PulseIndicator } from 'react-native-indicators';
import color from '../color';
const width = Dimensions.get('window').width


export default class InputTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }

    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }

    onSubmitEditing() {
        this.props.onSubmitEditing();
    }

    focus() {
        this.textInput.focus()
    }

    Icon = () => {
        return this.props.Icon();

    }
    handleFocus = () => this.setState({ isFocused: true })

    handleBlur = () => this.setState({ isFocused: false })

    render() {
        const { onSubmitEditing, defaultValue, maxLength, placeholder, onChangeText, keyboardType, editable, label , theme} = this.props;
        return (
            <View style={styles.textInputContainer}>
                <Text style={styles.actionbutton}>{label} </Text>
                <View style={styles.inputtwo}>
                    <TextInput
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        placeholder={placeholder}
                        placeholderTextColor={color.text_inputplace_holder}
                        onSubmitEditing={() => onSubmitEditing()}
                        returnKeyType="next"
                        keyboardType={keyboardType}
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue={defaultValue}
                        onChangeText={text => onChangeText(text)}
                        ref={input => this.textInput = input}
                        editable={editable}  
                        maxLength={maxLength}
                        style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                    />
                    <View style={{ width: 50, margin: 3, justifyContent: 'center', backgroundColor:theme+ '25', alignItems: 'center' }} >
                        <Text style={{ fontSize: 12, color:theme, fontFamily: 'Poppins-SemiBold', }}>NGN </Text>
                    </View>
                </View>
            </View>



        );
    }
}

InputTextField;

const styles = StyleSheet.create({
    textInputContainer: {
        marginRight: 0,
        marginLeft: 0,

    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 10,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    inputtwo: {
        height: 52,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        flexDirection: 'row'
    },

});