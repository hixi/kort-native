import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    START_MISSION
 } from '../actions/types';
import Config from '../constants/Config';

const INITIAL_STATE = {
    activeMission: {},
    missionAnnotations: [],
    missionsData: [],
    missionsLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MISSIONS_DOWNLOAD:
            return { ...state, missionsLoading: true };        
        case MISSIONS_DOWNLOADED_ERROR:
            return { ...state, missionsLoading: false };
        case MISSIONS_DOWNLOADED_SUCCESS:
            return { ...state, missionsLoading: false, missionsData: action.payload, missionAnnotations: createMissionAnnotations(action.payload, null) };
        case START_MISSION:
            return { ...state, activeMission: action.payload[0], missionAnnotations: createMissionAnnotations(action.payload[1], action.payload[2]) };
        default:
            return state;
    }
};

export const createMissionAnnotations = (data, highlightedFeature) => {
    const annotations = [];
    for (const mission of data) {
        if (highlightedFeature === mission.id && mission.geomType !== 'point') {
                annotations.push({
                id: 'geom',
                type: mission.geomType,
                coordinates: mission.coordinates,
                strokeColor: '#395971',
                strokeAlpha: 0.6,
                fillAlpha: 0.6,
                fillColor: '#395971'
            });
        }
        annotations.push({
            id: mission.id,
            type: 'point',
            title: mission.title,
            coordinates: mission.annotationCoordinate,
            annotationImage: {
                source: { uri: `${mission.image}` },
                width: Config.MAPBOX_ANNOTATION_SIZE,
                height: Config.MAPBOX_ANNOTATION_SIZE
            },
        });
    }
    return annotations;
};

