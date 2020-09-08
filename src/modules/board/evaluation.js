import * as boardAPI from "../../lib/api/board";

import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";

import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";

const INITIALIZE = "evaluation/INITIALIZE";

const [
  REPORT_POST,
  REPORT_POST_SUCCESS,
  REPORT_POST_FAILURE,
] = createRequestActionTypes("evaluation/REPORT_POST");

const [
  REPORT_COMMENT,
  REPORT_COMMENT_SUCCESS,
  REPORT_COMMENT_FAILURE,
] = createRequestActionTypes("evaluation/REPORT_COMMENT");

const [
  HEALTH_POST,
  HEALTH_POST_SUCCESS,
  HEALTH_POST_FAILURE,
] = createRequestActionTypes("evaluation/HEALTH_POST");

const SETEVALUATION = "evaluation/SETEVALUATION";

export const initialize = createAction(INITIALIZE);
export const healthPost = createAction(HEALTH_POST, ({ BO_Code }) => ({
  BO_Code,
}));

export const reportPost = createAction(REPORT_POST, ({ BO_Code }) => ({
  BO_Code,
}));

export const setEvaluation = createAction(
  SETEVALUATION,
  ({ isHealthsee, isReport, BO_Healthsee_Count, BO_Report_Count }) => ({
    isHealthsee,
    isReport,
    BO_Healthsee_Count,
    BO_Report_Count,
  })
);

export const reportComment = createAction(
  REPORT_COMMENT,
  ({ BC_Code, page, BO_Code }) => ({
    BC_Code,
    page,
    BO_Code,
  })
);

const healthPostSaga = createRequestSaga(HEALTH_POST, boardAPI.healthPost);

const reportPostSaga = createRequestSaga(REPORT_POST, boardAPI.reportPost);

const reportCommentSaga = createRequestSaga(
  REPORT_COMMENT,
  boardAPI.reportComments
);

export function* evaluationSaga() {
  yield takeLatest(HEALTH_POST, healthPostSaga);
  yield takeLatest(REPORT_COMMENT, reportCommentSaga);
  yield takeLatest(REPORT_POST, reportPostSaga);
}

const initialState = {
  report: false,
  healthsee: false,
  healthseeCount: 0,
  reportCount: 0,

  comments: {
    value: null,
    page: null,
  },

  healthError: null,
  reportError: null,

  commentsError: null,
};

// reportComments를 통해 받아온 댓글들을 저장할 변수 만들고 그걸 다시 post에 있는 comment로 이동시켜줘야함

const evaluation = handleActions(
  {
    [INITIALIZE]: () => initialState,
    [SETEVALUATION]: (
      state,
      {
        payload: { isHealthsee, isReport, BO_Healthsee_Count, BO_Report_Count },
      }
    ) => ({
      ...state,
      healthsee: isHealthsee,
      report: isReport,
      healthseeCount: BO_Healthsee_Count,
      reportCount: BO_Report_Count,
    }),
    [HEALTH_POST_SUCCESS]: (state, { payload: health }) => ({
      ...state,

      healthseeCount: health.BO_Healthsee_Count,
      healthsee: health.isHealthsee,
      healthError: null,
    }),
    [HEALTH_POST_FAILURE]: (state, { payload: healthError }) => ({
      ...state,
      healthError,
    }),
    [REPORT_POST_SUCCESS]: (state, { payload: report }) => ({
      ...state,
      reportCount: report.BO_Report_Count,
      report: report.isReport,
      reportError: null,
    }),
    [REPORT_POST_FAILURE]: (state, { payload: reportError }) => ({
      ...state,
      reportError,
    }),
    [REPORT_COMMENT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      comments: {
        ...state.comments,
        value: data.comments,
        page: data.lastPage,
      },
    }),
    [REPORT_COMMENT_FAILURE]: (state, { payload: commentsError }) => ({
      ...state,
      commentsError,
    }),
  },
  initialState
);

export default evaluation;
