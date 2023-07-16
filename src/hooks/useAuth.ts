import { useAppSelector } from "@/redux/hook";

export const useAuth = () => {
    const auth = useAppSelector(state=>state.auth);
    const user = useAppSelector(state=>state.user);

    if(auth?.accessToken && user.user.email ) {
        return true;
    } else {
        return false;
    }
}