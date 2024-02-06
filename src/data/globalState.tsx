// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Event } from '../types'
// import data from './index'
//
// interface EventsContextProps {
//   isAuthenticated: boolean,
//   userName?: string
//   events: Event[];
//   userEvents:Event[];
//   updateUserEvents:(event:Event[])=>void,
//   addEvent: (event: Event) => void;
//   updateEventTracking: (eventId: number, isTracked: boolean) => void;
//   login: (userName: string) => void,
//   logout: () => void,
// }
//
// const EventsContext = createContext<EventsContextProps | undefined>(undefined);
//
// export const useEventsContext = (): EventsContextProps => {
//   const context = useContext(EventsContext);
//   if (!context) {
//     throw new Error('useEventsContext must be used within an EventsProvider');
//   }
//   return context;
// };
//
// interface EventsProviderProps {
//   children: ReactNode;
// }
//
// export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
//   const [events, setEvents] = useState<Event[]>(data);
//   const [userName, setName] = useState('')
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userEvents, setUserEvents] = useState<Event[]>([])
//   const saveEventsToStorage = async () => {
//     try {
//       await AsyncStorage.setItem('events', JSON.stringify(events));
//     } catch (error) {
//       console.error('Error saving events to local storage:', error);
//     }
//   };
//
//   const saveUserEventsToStorage = async () => {
//     try {
//       await AsyncStorage.setItem(userName, JSON.stringify(userEvents));
//     } catch (error) {
//       console.error('Error saving events to local storage:', error);
//     }
//   };
//
//   const loadUserEventsFromStorage = async () => {
//     try {
//       const storedEvents = await AsyncStorage.getItem(userName);
//       if (storedEvents) {
//         setUserEvents(JSON.parse(storedEvents));
//       }
//       else {
//         setUserEvents([])
//       }
//     } catch (error) {
//       console.error('Error loading events from local storage:', error);
//     }
//   };
//
//
//   const login = (userName: string) => {
//     try {
//       setName(userName)
//       AsyncStorage.setItem('user', userName).then(e => {
//       });
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error('Error saving events to local storage:', error);
//     }
//   };
//
//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem("user")
//     } catch (error) {
//       console.error('Error saving user to local storage:', error);
//     }
//     setIsAuthenticated(false);
//   };
//
//   const loadEventsFromStorage = async () => {
//     try {
//       const storedEvents = await AsyncStorage.getItem('events');
//       if (storedEvents) {
//         setEvents(JSON.parse(storedEvents));
//       }
//       else {
//         setEvents(data)
//       }
//     } catch (error) {
//       console.error('Error loading events from local storage:', error);
//     }
//   };
//
//   useEffect(() => {
//     checkUserIsAutheticate()
//     loadEventsFromStorage();
//    // loadUserEventsFromStorage();
//   }, []);
//
//   const checkUserIsAutheticate = async () => {
//     try {
//       const user = await AsyncStorage.getItem('user');
//       console.log("User Data", user)
//       if (user) {
//         setName(user)
//         setIsAuthenticated(true)
//       }
//       else {
//         setIsAuthenticated(false)
//       }
//     } catch (error) {
//       console.error('Error loading events from local storage:', error);
//     }
//   }
//
//   useEffect(() => {
//     saveEventsToStorage();
//   }, [events]);
//
//   useEffect(() => {
//     //saveUserEventsToStorage()
//   }, [userEvents]);
//
//   const updateUserEvents = (events:Event[])=>{
//     setUserEvents((prevEvents) => [...new Set([...prevEvents, ...events])])
//   }
//
//   const addEvent = (event: Event) => {
//     setEvents((prevEvents) => [...prevEvents, event]);
//   };
//
//   const updateEventTracking = (eventId: number, isTracked: boolean) => {
//     setEvents((prevEvents) =>
//       prevEvents.map((event) => {
//         let visitors: string[]
//         if (isTracked) {
//           visitors = event.visitors ? [...event.visitors, userName] as string[] : [userName] as string[]
//         }
//         else {
//           visitors = event.visitors ? event.visitors.filter(name => name !== userName) : []
//         }
//         return event.id === eventId ? { ...event, isTracked, visitors } : event
//       }
//       )
//     );
//   };
//
//   const contextValue: EventsContextProps = {
//     isAuthenticated,
//     userName,
//     events,
//     addEvent,
//     updateEventTracking,
//     login,
//     userEvents,
//     updateUserEvents,
//     logout,
//   };
//
//   return (
//     <EventsContext.Provider value={contextValue}>
//       {children}
//     </EventsContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types';
import data from './index';

interface EventsContextProps {
  isAuthenticated: boolean;
  userName?: string;
  events: Event[];
  userEvents: Event[];
  updateUserEvents: (event: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEventTracking: (eventId: number, isTracked: boolean) => void;
  login: (userName: string) => void;
  logout: () => void;
}

const EventsContext = createContext<EventsContextProps | undefined>(undefined);

export const useEventsContext = (): EventsContextProps => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }
  return context;
};

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(data);
  const [userName, setName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEvents, setUserEvents] = useState<Event[]>([]);

  const saveEventsToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to local storage:', error);
    }
  }, [events]);

  const saveUserEventsToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem(userName, JSON.stringify(userEvents));
    } catch (error) {
      console.error('Error saving events to local storage:', error);
    }
  }, [userName, userEvents]);

  const loadUserEventsFromStorage = useCallback(async () => {
    try {
      const storedEvents = await AsyncStorage.getItem(userName);
      if (storedEvents) {
        setUserEvents(JSON.parse(storedEvents));
      } else {
        setUserEvents([]);
      }
    } catch (error) {
      console.error('Error loading events from local storage:', error);
    }
  }, [userName]);

  const login = useCallback((userName: string) => {
    try {
      setName(userName);
      AsyncStorage.setItem('user', userName).then(() => {
        setIsAuthenticated(true);
      });
    } catch (error) {
      console.error('Error saving events to local storage:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error saving user to local storage:', error);
    }
  }, []);

  const loadEventsFromStorage = useCallback(async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error loading events from local storage:', error);
    }
  }, []);

  const checkUserIsAuthenticated = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setName(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error loading events from local storage:', error);
    }
  }, []);

  useEffect(() => {
    checkUserIsAuthenticated();
    loadEventsFromStorage();
    // loadUserEventsFromStorage();
  }, [checkUserIsAuthenticated, loadEventsFromStorage]);

  useEffect(() => {
    saveEventsToStorage();
  }, [events, saveEventsToStorage]);

  useEffect(() => {
    // saveUserEventsToStorage()
  }, [userEvents, saveUserEventsToStorage]);

  const updateUserEvents = useCallback((events: Event[]) => {
    setUserEvents((prevEvents) => [...new Set([...prevEvents, ...events])]);
  }, []);

  const addEvent = useCallback((event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  }, []);

  const updateEventTracking = useCallback((eventId: number, isTracked: boolean) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        let visitors: string[] = [];
        if (isTracked) {
          visitors = event.visitors ? [...event.visitors, userName] : [userName];
        } else {
          visitors = event.visitors ? event.visitors.filter((name) => name !== userName) : [];
        }
        return event.id === eventId ? { ...event, isTracked, visitors } : event;
      })
    );
  }, [userName]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      userName,
      events,
      addEvent,
      updateEventTracking,
      login,
      userEvents,
      updateUserEvents,
      logout,
    }),
    [isAuthenticated, userName, events, addEvent, updateEventTracking, login, userEvents, updateUserEvents, logout]
  );

  return <EventsContext.Provider value={contextValue}>{children}</EventsContext.Provider>;
};
