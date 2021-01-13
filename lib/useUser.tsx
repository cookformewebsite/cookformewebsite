import {
  useEffect,
  useState,
  useContext,
  useReducer,
  createContext,
  Dispatch,
} from "react";
import "firebase/auth";
import firebase from "./initFirebase";
import Menu from "../class/MenuClass";
import User from "../class/UserClass";

interface ICard {
  showSideBar: boolean;
  menu: Array<Menu>;
  total: string;
}
interface IPayload {
  id?: string;
  menu?: Menu;
}

interface IAction {
  type: string;
  payload: IPayload;
}

const authContext = createContext<{
  user: User | null;
  signin: (
    email: string,
    password: string
  ) => Promise<firebase.User | undefined>;
  signout: () => Promise<void>;
} | null>(null);
const cardContext = createContext<{
  card: ICard;
  dispatchCard: Dispatch<IAction>;
} | null>(null);

export function priceByPackage(menu: Menu, menuPackage: string) {
  switch (menuPackage) {
    case "Family size":
      return menu.price.familySize;
    case "Party size":
      return menu.price.partySize;
    case "Mix dish":
      return menu.price.mixDish;
    default:
      menu.price.familySize;
  }
}

function menuTotal(menu: Array<Menu>) {
  let total: number = 0;
  for (let i = 0; i < menu.length; i++) {
    let multiplyPriceByQuantity: number;

    if (
      menu[i] !== undefined &&
      menu[i].package !== undefined &&
      menu[i].quantity !== undefined &&
      menu[i].type === "menu"
    ) {
      multiplyPriceByQuantity =
        priceByPackage(menu[i], menu[i].package) * menu[i].quantity;
    } else {
      multiplyPriceByQuantity = menu[i].price * menu[i].quantity;
    }
    total = total + multiplyPriceByQuantity;
  }
  return total.toFixed(2);
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: any) {
  function reducer(state: ICard, action: IAction) {
    switch (action.type) {
      case "ADD_MENU":
        if (action.payload && action.payload.menu) {
          if (
            !(
              state.menu.filter((e) => e.id === action.payload.menu?.id)
                .length > 0
            )
          ) {
            return {
              ...state,
              menu: [...state.menu, action.payload.menu],
              total: menuTotal([...state.menu, action.payload.menu]),
            };
          }
        }

      case "REMOVE_MENU":
        const removeValue = state.menu.filter(
          (e) => e.id !== action.payload.id
        );
        return {
          ...state,
          menu: removeValue,
          total: menuTotal(removeValue),
        };
      case "ADD_QUANTITY":
        const newValueAdd = state.menu.map((e) => {
          if (e.id === action.payload.id) {
            e.quantity = e.quantity += 1;
            return e;
          } else {
            return e;
          }
        });
        return { ...state, menu: newValueAdd, total: menuTotal(newValueAdd) };
      case "REDUCE_QUANTITY":
        const newValueReduce = state.menu.map((e) => {
          if (e.id === action.payload.id) {
            if (e.quantity > 1) {
              e.quantity = e.quantity -= 1;
            }
            return e;
          } else {
            return e;
          }
        });
        return {
          ...state,
          menu: newValueReduce,
          total: menuTotal(newValueReduce),
        };

      case "CHANGE_PACKAGE":
        if (action.payload && action.payload.menu) {
          const newPackage = state.menu.map((e) => {
            if (action.payload.menu && e.id === action.payload.id) {
              e.package = action.payload.menu.package;
              return e;
            } else {
              return e;
            }
          });
          return { ...state, menu: newPackage, total: menuTotal(newPackage) };
        }

      case "SHOW_DIALOG":
        return {
          ...state,
          showSideBar: true,
        };
      case "HIDDE_DIALOG":
        return {
          ...state,
          showSideBar: false,
        };
      case "INIT":
        return {
          showSideBar: false,
          menu: [],
          total: "0",
        };
      default:
        return {
          showSideBar: false,
          menu: [],
          total: "0",
        };
    }
  }
  const initialState: ICard = {
    showSideBar: false,
    menu: [],
    total: "0",
  };

  const [card, dispatchCard] = useReducer(reducer, initialState);

  const auth = useProvideAuth();
  return (
    <cardContext.Provider value={{ card, dispatchCard }}>
      <authContext.Provider value={auth}>{children}</authContext.Provider>;
    </cardContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
export const useCard = () => {
  return useContext(cardContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user) {
          setUser(new User(response.user));
          return response.user;
        }
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(new User(user));
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signout,
  };
}
