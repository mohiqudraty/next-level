interface User {
  name: string;
  role: string;
}

interface ApiRespons<T> {
  data: T;
  success: boolean;
  statusCode: number;
  message: string
}


const fetchUser = async () : Promise<User | undefined> => {
  try {
    const res = await fetch("/api/v1/end");
    const data = (await res.json()) as ApiRespons<User>;

    if (!res.ok || !data.success) {
      throw new Error("Faild to Fetch User Data!" + data.message)
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Something went wrong");
      
    }
    
  }
}

// const userData = await fetchUser()
// console.log(userData);

