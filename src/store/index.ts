import { createStore, combineReducers} from 'redux';
import treeTypeReducer from './reducers/treeType';
import dataTypeReducer from './reducers/dataType';
import maxDegreeReducer from './reducers/maxDegree';
import viewTreeReducer from './reducers/viewTree';
import treeObjectReducer from './reducers/treeObject';

const reducers = combineReducers({
    treeType: treeTypeReducer,
    dataType: dataTypeReducer,
    maxDegree: maxDegreeReducer,
    viewTree: viewTreeReducer,
    treeObject: treeObjectReducer,
});

const store = createStore(reducers);

export default store;