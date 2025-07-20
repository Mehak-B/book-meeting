import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RoomDetails } from '../room-details/room-details';
import {  MeetingRooms } from '../config/data'
import { Meeting } from '../services/meeting.service';
import { TimeRange } from '../services/time-range.service';
import { CommonModule } from '@angular/common';
interface Room{
  id:number,
  label:number
}
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, RoomDetails, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})



export class HomePage {
    
 roomDetails!:FormGroup
 bookedRooms: any[] = [ ];

 meetingService = inject(Meeting)
 timeRange = inject(TimeRange)
constructor(private fb: FormBuilder){}

@ViewChild('formDialog') formDialog! :any
rooms:Room[] = MeetingRooms

minDate: string = new Date().toISOString().split('T')[0];


ngOnInit(){
  console.log(this.minDate)
        this.roomDetails = this.fb.group({
            meetingroom:['',[Validators.required]],
            selectdate:['',[Validators.required, this.weekdayValidator]],
            fromTime: ['',[Validators.required]],
            toTime: ['',[Validators.required]],
            agenda:['',[Validators.required]]
        },
      {
        validators:this.timeRange.timeRangeValidator()
        
      })  
      

    }

bookRoom(){
 this.formDialog.nativeElement.open = true
console.log(this.formDialog)
    }


weekdayValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const day = new Date(value).getDay();
    if (day === 0 || day === 6) {
      return { weekend: true };
    }

    return null;
  }




handleSubmission(){
  console.log(this.roomDetails)
  console.log(this.roomDetails.value.fromTime)
this.meetingService.saveBookedMeeting(this.roomDetails.value)
    const allMeetings = this.meetingService.getAllMettings() || null
    if(allMeetings?.length)
    this.bookedRooms = JSON.parse(JSON.stringify(allMeetings)) 
    this.roomDetails.reset()
    this.formDialog.nativeElement.close();
    }  
}