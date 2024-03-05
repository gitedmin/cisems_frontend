import  {applyMiddleware, createStore} from 'redux';
import EmployeeReducer from './reducers/EmployeeDataReducer';

const store = createStore(EmployeeReducer);

export default store;


