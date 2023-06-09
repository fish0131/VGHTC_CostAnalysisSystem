import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
@Pipe({
  name: 'formatDateTime'
})
export class FormatDateTimePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    console.log(date)
    if(date == null){
      return '';
    }
    if(typeof date === 'string' || typeof date === 'number'){
      if(date.toString().length == 8 && moment(date.toString(),'YYYYMMDD').isValid()){
        //console.log('convert to tw date');
        return moment(date.toString(),'YYYYMMDD','zh-TW').format('YYYY/MM/DD');
      }
      else if(date.toString().length == 12 && moment(date.toString(),'YYYYMMDDHHmm').isValid()){
        return moment(date.toString(),'YYYYMMDDHHmm','zh-TW').format('YYYY/MM/DD HH:mm');
      }
      else if(date.toString().length == 14 && moment(date.toString(),'YYYYMMDDHHmmss').isValid()){
        return moment(date.toString(),'YYYYMMDDHHmmss','zh-TW').format('YYYY/MM/DD HH:mm:ss');
      }
      else 
          return '';
    }
    /*
    return (date)=>{
          if(date == undefined){
              return '';
          }
          if(typeof date === 'string' || typeof date === 'number'){
              if(date.toString().length == 8 && moment(date.toString(),'YYYYMMDD','zh-TW').isValid()){
                  //console.log('convert to tw date');
                  return moment(date.toString(),'YYYYMMDD','zh-TW').format('YYYY/MM/DD');
              }
              else if(date.toString().length == 12 && moment(date.toString(),'YYYYMMDDHHmm','zh-TW').isValid()){
                  return moment(date.toString(),'YYYYMMDDHHmm','zh-TW').format('YYYY/MM/DD HH:mm');
              }
              else if(date.toString().length == 14 && moment(date.toString(),'YYYYMMDDHHmmss','zh-TW').isValid()){
                return moment(date.toString(),'YYYYMMDDHHmmss','zh-TW').format('YYYY/MM/DD HH:mm:ss');
              }
              else 
                  return '';
          }
        }
     */
  }

}