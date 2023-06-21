// actions.js

// Withdrawal action types
export const WITHDRAW_REQUEST = "WITHDRAW_REQUEST";
export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS";
export const WITHDRAW_FAILURE = "WITHDRAW_FAILURE";

// Deposit action types
export const DEPOSIT_REQUEST = "DEPOSIT_REQUEST";
export const DEPOSIT_SUCCESS = "DEPOSIT_SUCCESS";
export const DEPOSIT_FAILURE = "DEPOSIT_FAILURE";

// Withdrawal action creators
export const withdrawRequest = (amount) => ({
  type: WITHDRAW_REQUEST,
  payload: amount,
});

export const withdrawSuccess = () => ({
  type: WITHDRAW_SUCCESS,
});

export const withdrawFailure = (error) => ({
  type: WITHDRAW_FAILURE,
  payload: error,
});

// Deposit action creators
export const depositRequest = (amount) => ({
  type: DEPOSIT_REQUEST,
  payload: amount,
});

export const depositSuccess = () => ({
  type: DEPOSIT_SUCCESS,
});

export const depositFailure = (error) => ({
  type: DEPOSIT_FAILURE,
  payload: error,
});
