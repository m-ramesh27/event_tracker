import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    Events:  undefined,
    TrackEvents:undefined
    EventDetail:{id:number,isUserEvent:boolean}
  };
  export type LoginProps =  StackScreenProps<RootStackParamList, "Login">;
  export type EventDetailProps  = StackScreenProps<RootStackParamList, "EventDetail">;
  export type EventsProps<P = {}> = StackScreenProps<RootStackParamList , "Events" |"TrackEvents">

  //Data types ... ... ...
  export type Event = {
    id: number;
    title: string;
    description: string;
    image: string;
    city: string;
    isTracked?:boolean
    visitors?:string[]
};
type EventList = Event[];

//Omit , pick , exclude , partial  union  and assertion
//types and interface different and usage
//type alias ...
//graph ql ... basic question
//generic questions ...
//Generics, Union Type, Intersection Type, Type Guards, Nullish Coalescing
