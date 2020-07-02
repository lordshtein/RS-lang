import {
  DIFFERENT_CARDS_COUNTER_PLUS_ONE,
  REWRITE_DATE_OF_RECEIPT_OF_WORDS,
  REDUCE_LEFT_NEW_WORDS_TODAY,
  REDUCE_LEFT_REPEAT_WORDS_TODAY,
  RESET_PROGRESS,
  QUEUE_NEW_WORDS,
  QUEUE_REPEAT_WORDS,
  REWRITE_PROGRESS,
  UPDATE_PROGRESS_AFTER_WORD_PROCESSED,
} from '../actions/types/action-types';

import { BASE_EMPTY_ARRAY_15 } from '../../constants/app-settings';
import { MSEC_PER_DAY } from '../../constants/wordConfig';

const initialProgressState = {
  differentCardsShowedAllTime: 0,
  cardsShowedAllTime: 0,
  rightAnswersAllTime: 0,
  dateOfReceiptOfWords: Date.now() + MSEC_PER_DAY,
  leftNewWordsToday: 10,
  queueNewWords: [],
  queueRepeatWords: [],
  leftRepeatWordsToday: 10,
  longestTodaySeries: 0,
  learnedWordsStatistic: BASE_EMPTY_ARRAY_15,
  cardsShowedStatistic: BASE_EMPTY_ARRAY_15,
  newCardsShowedStatistic: BASE_EMPTY_ARRAY_15,
  rightAnswersStatistic: BASE_EMPTY_ARRAY_15,
};

const progressReducer = (state = initialProgressState, { type, payload }) => {
  const [firstCardShowed15Days, ...otherCardsShowed15Days] = state.cardsShowed15Days;
  switch (type) {
    case UPDATE_PROGRESS_AFTER_WORD_PROCESSED:
      return {
        ...state,
        differentCardsShowedAllTime: state.differentCardsShowedAllTime + 1,
        cardsShowedAllTime: state.cardsShowedAllTime + 1,
        cardsShowedToday: state.cardsShowedToday + 1,
        cardsShowed15Days: [firstCardShowed15Days + 1, ...otherCardsShowed15Days],
      };
    case DIFFERENT_CARDS_COUNTER_PLUS_ONE:
      return {
        ...state,
        differentCardsShowedAllTime: state.differentCardsShowedAllTime + 1,
      };
    case REWRITE_DATE_OF_RECEIPT_OF_WORDS:
      return {
        ...state,
        dateOfReceiptOfWords: state.differentCardsShowedAllTime + 1,
      };
    case REDUCE_LEFT_NEW_WORDS_TODAY:
      return {
        ...state,
        leftNewWordsToday: state.leftNewWordsToday - 1,
        queueNewWords: state.queueNewWords.pop(),
      };
    case REDUCE_LEFT_REPEAT_WORDS_TODAY:
      return {
        ...state,
        leftRepeatWordsToday: state.leftRepeatWordsToday - 1,
        queueRepeatWords: state.queueRepeatWords.pop(),
      };
    case QUEUE_NEW_WORDS:
      return {
        ...state,
        queueNewWords: payload,
      };
    case QUEUE_REPEAT_WORDS:
      return {
        ...state,
        queueRepeatWords: payload,
      };
    case REWRITE_PROGRESS:
      return payload;
    case RESET_PROGRESS:
      return initialProgressState;
    default:
      return state;
  }
};

export default progressReducer;