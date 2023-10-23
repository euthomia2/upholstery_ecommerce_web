import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchProducts, checkAuth } from '@/slices/cartSlice';
import Cookies from 'js-cookie';

function* workFetchingProducts() {
  const cart = yield call(() => localStorage.getItem('cart'));
  const formattedCart = yield JSON.parse(cart);

  if (!Cookies.get('is_authenticated')) {
    yield put(checkAuth(false));
    return;
  } else {
    yield put(checkAuth(true));
  }

  if (formattedCart) {
    const expirationDate = new Date(formattedCart.expiration);

    if (expirationDate > new Date()) {
      // Data is not expired
      yield put(fetchProducts(formattedCart.data));
    } else {
      // Data is expired, remove it from localStorage
      localStorage.removeItem('cart');
      yield put(fetchProducts([]));
    }
  } else {
    // Data doesn't exist in localStorage
    // Handle missing data as needed
    yield put(fetchProducts([]));
  }
}

function* cartSaga() {
  yield takeEvery('cart/fetchingProducts', workFetchingProducts);
}

export default cartSaga;
