import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../tasks/fetchApiGroup copy';
import { AcctionType } from '../../types';

const actionGetStartGroup: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= getDataStartGroup('');

export {actionGetStartGroup}