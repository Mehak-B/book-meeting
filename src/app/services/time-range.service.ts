import { Injectable } from  "@angular/core" ;
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
 
 @Injectable ({
    providedIn: "root"
 })

 export class TimeRange{
  


 timeRangeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fromTime = group.get('fromTime')?.value;
    const toTime = group.get('toTime')?.value;

    console.log('from:', fromTime);


    if (!fromTime || !toTime) return null;

    // Convert string time "HH:mm" to minutes since midnight
    const getMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const from = getMinutes(fromTime);
    const to = getMinutes(toTime);

    // Check if times are within 09:00 - 18:00
    const minTime = 9 * 60;
    const maxTime = 18 * 60;

    if (from < minTime || from > maxTime || to < minTime || to > maxTime) {
      console.log(from,minTime)
      return { outOfWorkingHours: true };
    }

    const duration = to - from;

    // Duration should be between 30 and 60 minutes
    if (duration < 30 || duration > 60) {
      return { invalidDuration: true };
    }

    return null; // valid
  };
}

}