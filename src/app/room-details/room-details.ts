import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'room-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './room-details.html',
  styleUrl: './room-details.scss'
})
export class RoomDetails {

    // items = ["Meeting Room", "Date", "Time", "Agenda"]
    @Input() bookedRooms:any;
}