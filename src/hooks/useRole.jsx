import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import {useQuery} from "@tanstack/react-query";

const useRole = () => {
	const {user, loading} = useAuth();
	const axiosSecure = useAxiosSecure();

	const {data: role, isLoading: isRoleLoading} = useQuery({
		enabled: !loading && !!user?.email,
		queryKey: ["role", user?.email],
		queryFn: async () => {
			const {data} = await axiosSecure(`/users/role/${user?.email}`);
			return data.role;
		},
	});

	//   return { role, isRoleLoading }
	return [role, isRoleLoading];
};

export default useRole;
