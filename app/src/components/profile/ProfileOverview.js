import React, { Component } from 'react';
import {
    Platform,
    View,
    Image,
    Text,
    ScrollView,
    RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import { KortCoin, Popup } from '../common';
import { updateUser, showConfirmModal, logoutUser } from '../../actions/AuthActions';

class ProfileOverview extends Component {

    componentDidMount() {
        Actions.refresh({ rightTitle: this.props.loggedIn ? 
            I18n.t('profile_logout') : I18n.t('profile_login') });
    }

    onRefresh() {
        if (!this.props.loggedIn) {
            Actions.pop();
        } else {
            this.props.updateUser(this.props.user);
        }
    }

    logout() {
        this.props.logoutUser();
        Actions.pop();
    }

    renderProviderImage() {
        return (
            <Image 
                source={{ uri: this.props.user.oauth_provider }}
                style={styles.providerImageStyle}
            />
        );
    }

    renderMissionsToday() {
        let starName = 'star';
        if (this.props.user.mission_count_today < 6) {
            starName = 'star-half-o';
        }
        if (this.props.user.mission_count_today < 3) {
            starName = 'star-o';
        }
        console.log(starName);
        return (
            <FontAwesome 
                style={{ color: '#fae975', alignSelf: 'center' }}
                size={60} 
                name={starName}
            />
        );
    }

    renderProfileView() {
        if (this.props.loggedIn) {
            return (
                <View style={styles.userViewStyle}>
                    <View style={styles.headerBoxStyle}>
                        <Image
                            source={{ uri: this.props.user.pic_url }}
                            style={styles.imageStyle}
                            defaultSource={{ uri: 'placeholderBadge' }}
                        >
                        {this.renderProviderImage()}
                        </Image>
                        <View style={styles.usernameBoxStyle}>
                            <Text style={styles.textStyle}>{this.props.user.username}</Text>
                        </View>
                    </View>

                <View style={styles.bodyStyle}>
                    <View style={styles.iconStyle}>
                        <KortCoin>K</KortCoin>
                        <Icon 
                            style={{ color: '#EF0000', alignSelf: 'center' }}
                            size={60} 
                            name='map-marker-multiple' 
                        />
                        {this.renderMissionsToday()}
                    </View>
                    <View style={styles.descriptionStyle}>
                        <Text style={styles.textStyle}>
                            {this.props.user.koin_count} koins
                        </Text>
                        <Text style={styles.textStyle}>
                            {this.props.user.mission_count} {I18n.t('profile_missions')}
                        </Text>
                        <Text style={styles.textStyle}>
                            {this.props.user.mission_count_today} {I18n.t('profile_missions_today')}
                        </Text>
                    </View>
                </View>
                <Popup 
                    onAccept={this.logout.bind(this)}
                    visible={this.props.showConfirm}
                    confirm
                    onDecline={() => this.props.showConfirmModal(false)}
                    message={I18n.t('logout_message')}
                >
                    <Icon 
                            style={{ color: '#395971', alignSelf: 'center' }}
                            size={60} 
                            name='logout' 
                    />                
                </Popup>    
            </View>
            );
        } 
        return (
            <Text style={[styles.textStyle, { paddingTop: 100, alignSelf: 'center' }]}>
                {I18n.t('login_please_login')}
            </Text>);
    }

    render() {
        return (
            <ScrollView 
                style={styles.bgColor}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.loading}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['#202931', 'white']}
                        tintColor='white'
                    />}
            >
                {this.renderProfileView()}
            </ScrollView>
        );
    }
}

const styles = {
    descriptionStyle: {
        height: 250,
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 20
    },
    iconStyle: {
        width: 60,
        height: 250,
        justifyContent: 'space-between',
        marginRight: 30
    },
    bodyStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#395971',
        borderColor: '#657C8E',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 30,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    usernameBoxStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    headerBoxStyle: {
        marginTop: 20,
        paddingBottom: 20,
        paddingTop: 20,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        backgroundColor: '#395971',
        borderColor: '#657C8E',
        borderRadius: 5,
        borderWidth: 1
    },
    imageStyle: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginRight: 20,
        alignItems: 'flex-end',
    },
    providerImageStyle: {
        height: 15,
        width: 15,
    },
    textStyle: {
        color: 'white',
        textAlign: 'left',
        fontSize: 20,
    },
    userViewStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 30,
        marginRight: 30,
    },
    bgColor: {
        backgroundColor: '#202931',
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        marginBottom: 50
    }
};

const mapStateToProps = ({ authReducer }) => {
    console.log(authReducer);
    const { user, loggedIn, loading, showConfirm } = authReducer;
    return { user, loggedIn, loading, showConfirm };
};


export default connect(mapStateToProps, 
{ updateUser, logoutUser, showConfirmModal })(ProfileOverview);
