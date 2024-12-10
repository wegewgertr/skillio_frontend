import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
  devTools: false,
});

const initializeApp = async () => {
  try {
    
  } catch (error) {
    console.log(error);
  }
};

initializeApp();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;