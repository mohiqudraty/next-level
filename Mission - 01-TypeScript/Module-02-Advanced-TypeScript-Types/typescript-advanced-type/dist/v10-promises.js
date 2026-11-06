const fetchUser = async () => {
    try {
        const res = await fetch("/api/v1/end");
        const data = (await res.json());
        if (!res.ok || !data.success) {
            throw new Error("Faild to Fetch User Data!" + data.message);
        }
        return data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Something went wrong");
        }
    }
};
export {};
// const userData = await fetchUser()
// console.log(userData);
