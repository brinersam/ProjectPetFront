import { useStore, useSelector, useDispatch } from "react-redux";
import type { extraStoreArgument, store } from "./store";
import { createAsyncThunk, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ThunkAction<TReturn, AppState, typeof extraStoreArgument, UnknownAction>

export const useAppStore = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{state:AppState, appDispatch: AppDispatch, extra: typeof extraStoreArgument, rejectValue: string}>();