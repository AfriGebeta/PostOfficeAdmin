import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define PostalUserRoles
// type PostalUserRole = 'basic' | 'lemaj' | 'Limd yalew' | 'master' | 'owner';
export enum PostalUserRole {
  basic = 'basic',
  lemaj = 'lemaj',
  Limd_yalew = 'Limd yalew',
  master = 'master',
  owner = 'owner',
}

// Define user type
export interface PostalUser {
  phone: string;
  firstName: string;
  lastName: String;
  role: PostalUserRole;
}

// Define context type
interface AuthContextType {
  user: PostalUser | null;
  setUser: (PostalUser: PostalUser) => void;
  login: (phone: string, password: string) => Promise<PostalUser>,
  logout: () => Promise<void>;
  hasPostalUserRole: (PostalUserRole: PostalUserRole) => boolean;
}

// Initial context state
const initialPostalUserState: PostalUser | null = null;

// Create context
const AuthContext = createContext<AuthContextType>({
  user: initialPostalUserState,
  setUser: () => {},
  login: () => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  hasPostalUserRole: () => false,
});

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setPostalUser] = useState<PostalUser | null>(initialPostalUserState);
  useEffect(() => {
    let localUser
    if (user) {
      localUser = user
    } else {
      const result = localStorage.getItem('user')
      if (result) {
        localUser = JSON.parse(result)
        console.log('Local user:', localUser)
        setUser(localUser)
      }
    }
  
  }, [user])

  // Simulate login
  const login = (phone: string, password: string) => {
    // login request logic here
    // for now its a dummy request
    let dummyUser;
    if(phone === '912345678' && password === 'admin') {
      dummyUser = { phone, firstName: "John", lastName: "Doe", role: PostalUserRole.owner } 
    } else if (phone === '912345679' && password === 'employee') {
      dummyUser = { phone, firstName: "Jane", lastName: "Doe", role: PostalUserRole.Limd_yalew } 
    } else {
      dummyUser = { phone, firstName: "Jill", lastName: "Doe", role: PostalUserRole.basic }
    }

    capitalizeNames(dummyUser);
    setPostalUser(dummyUser);
    //set localStorage
    localStorage.setItem('user', JSON.stringify(dummyUser));
    return Promise.resolve(dummyUser);
  };

  // Logout function
  const logout = () => {
    // logout request logic here
    setPostalUser(null);
    // remove localStorage
    localStorage.removeItem('user');
    return Promise.resolve();
  };

  // Check if user has a certain PostalUserRole
  const hasPostalUserRole = (PostalUserRole: PostalUserRole): boolean => {
    return !!user && user.role.includes(PostalUserRole);
  };

  // update the user
  const setUser = (PostalUser: PostalUser) => {
    setPostalUser(PostalUser);
  };

  // capitalize the first letter of the name
  const capitalizeNames = (user: PostalUser) => {
    user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, hasPostalUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
