import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        // If already logged in in redux, allow immediately
        const { isAuthenticated } = store.getState().auth;
        if (isAuthenticated) return true;

        // Otherwise request current user from the server
        const data = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });

        const user = data?.user;
        if (!user) return false;

        // Dispatch the actual user object (not the wrapper {user: ...})
        store.dispatch(login(user));

        return true;
    } catch (error) {
        console.log(error);
        return redirect({ to: "/auth" });
    }
};
