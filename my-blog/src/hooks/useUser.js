import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// unauthorized if not logged in
const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

  return { user, isLoading };
}

export default useUser