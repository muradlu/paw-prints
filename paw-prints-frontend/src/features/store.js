import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slice";

export default configureStore({
	reducer: {
		user: userReducer,
	},
});
