import { all, put, takeEvery } from "redux-saga/effects";
import { createToast, removeToast, updateToast } from "./toast.slice";

export default function* toastSagas() {
  yield all([
    deleteToast(),
  ]);
}

function* deleteToast() {
  yield takeEvery(removeToast, function* () {
    try {
      yield put((updateToast()));
    } catch (err) {
      yield put(createToast(
        {
          children: "Error handling toasts",
          title: "Toast Service",
          type: "error",
          sticky: true,
        }
      ))
    }
  });
}