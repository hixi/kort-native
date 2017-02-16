import {
    ANSWER_MODAL_VISIBLE,
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SELECTION_AVAILABLE,
    ANSWER_SET
 } from '../actions/types';

const INITIAL_STATE = {
    answerModalVisible: false,
    selectedAnswer: null,
    selectionAvailable: true,
    freetextAvailable: false,
    answer: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ANSWER_MODAL_VISIBLE:
            return { ...state, answerModalVisible: action.payload };
        case SELECTED_ANSWER:
            return { ...state, selectedAnswer: action.payload };
        case ANSWER_SELECTION_AVAILABLE:
            return { ...state, selectionAvailable: action.payload };
        case ANSWER_FREETEXT_AVAILABLE:
            return { ...state, freetextAvailable: action.payload };
        case ANSWER_SET:
            return { ...state, answer: action.payload };
        default:
            return state;
    }
};