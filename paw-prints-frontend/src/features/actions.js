import { setIsLoading, setUser } from "./slice";
import store from "./store";
import axios from "axios";

export const register = async (request) => {
	try {
		store.dispatch(setIsLoading(true));
		await axios.post("/auth/register", request);
		store.dispatch(setIsLoading(false));
		return { type: "success", message: "Registration successfull!" };
	} catch (error) {
		store.dispatch(setIsLoading(false));
		return { type: "error", message: error.response.data.msg };
	}
};

export const login = async (request) => {
	try {
		store.dispatch(setIsLoading(true));
		const { data } = await axios.post("/auth/login", request);
		store.dispatch(setUser({ ...data.user, token: data.token }));
		store.dispatch(setIsLoading(false));
		return { type: "success", message: "Login successfull!" };
	} catch (error) {
		store.dispatch(setIsLoading(false));
		return { type: "error", message: error.response.data.msg };
	}
};

export const logout = async () => {
	await axios.post("/users/logout", null, {});
};
