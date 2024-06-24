import { all } from "redux-saga/effects";
import toastSagas from "./toast/toast.sagas";

export default function* rootSaga() {
  yield all([
    toastSagas(),
  ]);
}