import React, { Component } from 'react';
import { 
    Text,
    View,
    Modal,
    Image
 } from 'react-native';
 import { Button } from './Button';

 class Popup extends Component {
        
    renderConfirmButton() {
        if (this.props.confirm) {
            return (
                <Button 
                    onPress={this.props.onDecline}
                    style={styles.buttonStyle}
                >
                    No
                </Button>
            );
        }
    }

    renderHeader() {
        if (this.props.imageURI) {
            return (
                <View style={styles.imageBoxStyle}>
                    <Image
                        source={{ uri: this.props.imageURI }}
                        style={styles.imageStyle}
                        defaultSource={{ uri: 'placeholder_badge' }}
                    />
                </View>
            );
        } else if (this.props.children) {
            return (
                <View style={styles.imageBoxStyle}>
                    {this.props.children}
                </View>
            );
        }
    }

    renderTitle(title) {
        if (title) {
            return (
                <Text style={styles.titleStyle}>{title}</Text>
            );
        }
        return null;
    }

    render() {
        const { boxStyle,
                textBoxStyle, 
                buttonBoxStyle, 
                containerStyle, 
                buttonStyle,
                textStyle } = styles;
        return (
            <Modal
                visible={this.props.visible}
                transparent
                animationType='fade'
                onRequestClose={() => {}}
            >
                <View style={containerStyle}>
                    <View style={boxStyle}>
                        {this.renderHeader()}
                        <View style={textBoxStyle}>
                            {this.renderTitle(this.props.title)}
                            <Text style={textStyle}>{this.props.message}</Text>
                        </View>
                        <View style={buttonBoxStyle}>
                            <Button
                                onPress={this.props.onAccept}
                                style={buttonStyle}
                            >
                                OK
                            </Button>
                            {this.renderConfirmButton()}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
 
}

 const styles = {
     imageStyle: {
         height: 80,
         width: 80,
         alignSelf: 'center',
     },
     imageBoxStyle: {
         justifyContent: 'center',
         borderWidth: 0,
         borderBottomWidth: 1,
         borderColor: '#657C8E',
         paddingTop: 10,
         paddingBottom: 10
     },
     textBoxStyle: {
         justifyContent: 'center',
         alignSelf: 'center',
         paddingRight: 10,
         paddingLeft: 10,
         paddingTop: 10,
         paddingBottom: 10,
         backgroundColor: 'transparent'
     },
     textStyle: {
         color: '#202931'
     },
     titleStyle: {
         textAlign: 'center',
         fontWeight: 'bold',
         color: '#202931'
     },
     buttonStyle: {
        flex: 1,
     },
     buttonBoxStyle: {
         height: 60,
         paddingTop: 10,
         paddingBottom: 10,
         flexDirection: 'row',
     },
     boxStyle: {
         backgroundColor: '#FFFFFF',
         alignSelf: 'center',
         borderRadius: 10,
         borderWidth: 1,
         borderColor: '#657C8E',
         marginLeft: 50,
         marginRight: 50,
     },
     containerStyle: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
         position: 'relative',
         flex: 1,
         justifyContent: 'center'
     }
 };

 export { Popup };
