import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types'
import data from './index'

interface EventsContextProps {
  isAuthenticated: boolean,
  userName?: string
  events: Event[];
  addEvent: (event: Event) => void;
  updateEventTracking: (eventId: number, isTracked: boolean) => void;
  login: (userName: string) => void,
  logout: () => void,
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
  const [userName, setName] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const saveEventsToStorage = async () => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to local storage:', error);
    }
  };

  const login = (userName: string) => {
    try {
      setName(userName)
      AsyncStorage.setItem('user', userName).then(e => {
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving events to local storage:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user")
    } catch (error) {
      console.error('Error saving user to local storage:', error);
    }
    setIsAuthenticated(false);
  };

  const loadEventsFromStorage = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
      else {
        setEvents(data)
      }
    } catch (error) {
      console.error('Error loading events from local storage:', error);
    }
  };

  useEffect(() => {
    checkUserIsAutheticate()
    loadEventsFromStorage();
  }, []);

  const checkUserIsAutheticate = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log("User Data", user)
      if (user) {
        setName(user)
        setIsAuthenticated(true)

      }
      else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error loading events from local storage:', error);
    }
  }

  useEffect(() => {
    saveEventsToStorage();
  }, [events]);

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEventTracking = (eventId: number, isTracked: boolean) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        let visitors: string[]
        if (isTracked) {
          visitors = event.visitors ? [...event.visitors, userName] as string[] : [userName] as string[]
        }
        else {
          visitors = event.visitors ? event.visitors.filter(name => name !== userName) : []
        }
        return event.id === eventId ? { ...event, isTracked, visitors } : event
      }
      )
    );
  };
  
  const contextValue: EventsContextProps = {
    isAuthenticated,
    userName,
    events,
    addEvent,
    updateEventTracking,
    login,
    logout,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
