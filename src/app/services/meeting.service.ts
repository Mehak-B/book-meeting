import { Injectable } from '@angular/core';
import { MeetingDetails } from '../config/meeting';

@Injectable({
  providedIn: 'root'
})
export class Meeting {

  allMeetings:MeetingDetails[]=[]
  constructor() { }
saveBookedMeeting(details:MeetingDetails){
    // const userDetail:any = localStorage.getItem('username') || null;
    // const username:string = JSON.parse(userDetail).username
    // const roomDetail:any = {user:userDetail.username,...details}
        const roomDetail:any = {...details}

    this.allMeetings.push(roomDetail)
    // if(username){
      localStorage.setItem('allMeetings',JSON.stringify(this.allMeetings))
    // } 
  }

  getAllMettings(){
    const allMeetings:any = localStorage.getItem('allMeetings') || [];
return JSON.parse(allMeetings)
  }
}