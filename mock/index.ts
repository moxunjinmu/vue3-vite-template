import { MockMethod } from 'vite-plugin-mock';
import userInfo from './userInfo';
import api from './api';

const mocks = [...userInfo, ...api] as MockMethod[];

export default mocks;
