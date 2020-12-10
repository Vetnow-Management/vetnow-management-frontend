import React, {ReactElement, ReactNode, useContext} from "react";
import useAppContext from "../../../../AppContext";
import {TutorStore} from "../store";

interface ITutorContext {
  tutorStore: TutorStore
}

const defaultValueTutorContext: ITutorContext = {
  tutorStore: new TutorStore()
};

const tutorContext = React.createContext<ITutorContext>(
  defaultValueTutorContext,
);

export default function useTutorContext(): ITutorContext {
  const tutor = useContext<ITutorContext>(tutorContext);
  const app = useAppContext();
  return {...tutor, ...app};
}

export function TutorContextProvider({children}: { children: ReactNode }): ReactElement {
  const {Provider} = tutorContext;

  return (
    <Provider value={defaultValueTutorContext}>
      {children}
    </Provider>
  )
}
