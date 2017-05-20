import I18n from 'react-native-i18n';
import { 
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SET,
    HIDE_MODAL,
    SHOW_MODAL,
    ANSWER_MODAL_VISIBLE,
    SEND_SOLUTION,
    SOLUTION_SUCCESS,
    SOLUTION_FAIL,
    SHOW_NEW_ACHIEVEMENTS
} from './types';
import KortAPI from '../data/KortAPI';

export const answerModalVisible = (visible) => {
    return { 
        type: ANSWER_MODAL_VISIBLE,
        payload: visible 
    };  
};

export const answerSet = (answer) => {
        console.log('answer set: ', answer);
    return { 
        type: ANSWER_SET,
        payload: answer 
    };  
};

export const selectedAnswer = (answer) => {
    return { 
        type: SELECTED_ANSWER,
        payload: answer 
    };  
};

export const setFreetextAvailable = (freetextType) => {
        return { 
        type: ANSWER_FREETEXT_AVAILABLE,
        payload: freetextType 
    }; 
};

export const hideModal = (hide) => {
        return { 
        type: HIDE_MODAL,
        payload: !hide 
    }; 
};

export const showModal = (modalConfirm, modalText, modalType) => {
        return { 
        type: SHOW_MODAL,
        payload: {
            modalConfirm,
            modalText,
            modalType
        } 
    }; 
};

export const solveMission = (userId, mission, value, solved, additionalKoins) => {
    return (dispatch) => {  
    dispatch({ type: SEND_SOLUTION });
    const api = new KortAPI();
        const solution = {
            koins: mission.koinReward + additionalKoins,
            osm_id: mission.osmId,
            solved: true,
            userId,
            value
        };
        api.sendSolution(mission.schema, mission.errorId, solution)
            .then(response => {
                if (solved) {
                    dispatch({ 
                        type: SOLUTION_SUCCESS,
                        payload: {
                            response,
                            modalText: I18n.t('mission_message_reward', 
                            { koinReward: mission.koinReward })
                        }
                    });
                }    
            })
            .catch(errorMsg => {
                dispatch({ 
                    type: SOLUTION_FAIL,
                    payload: errorMsg 
                });
            });
    };
};

export const showAchievements = (show) => {
        return { 
        type: SHOW_NEW_ACHIEVEMENTS,
        payload: show 
    }; 
};
