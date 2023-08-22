import { Component } from '@angular/core';

import * as caption from '../assets/subtitle.json'; 
import { Transcript } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  audio: HTMLAudioElement;
  transcripts: any[] = []; // Replace with your actual transcript data
  currentText: string = '';
  currentId = 0;

  data: any = caption
  
  constructor() {
    this.audio = new Audio();
    this.audio.src = 'https://ia600707.us.archive.org/8/items/alice_in_wonderland_librivox/wonderland_ch_01.mp3';
    this.audio.addEventListener('timeupdate', this.updateText.bind(this));

    const value = this.data.default;
    this.transcripts = [...value.captions]

    let id = 1;
    this.transcripts = this.transcripts.reduce((acc,curr: Transcript) => {
      const index = this.transcripts.indexOf(curr)
      const isLast = index === this.transcripts.length - 1;
      if(!isLast)
      {
        const next = this.transcripts[index + 1]
        curr.endTime = next.startTime;
        curr.id = id;
        acc.push(curr)
        id++;
      }


      return acc
    }, [] as Transcript[])
    console.log('data', this.transcripts);

  


  }

  selectPhrase(transcript: Transcript){
    this.audio.pause()
    const {startTime} = transcript;
    const timeParts = startTime.split(':');
    const start = new Date(0, 0, 0, parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2].split('.')[0]), parseInt(timeParts[2].split('.')[1]));
    const value = this.hmsToSeconds(start.getHours(),start.getMinutes(), Number(start.getSeconds() +'.'+ start.getMilliseconds()));
    console.log('startTime', start, 'value', value, 'id: ', transcript.id)

    this.audio.currentTime = value;
    this.audio.play();
    this.currentId = transcript.id;
  }

  playing = false;
  playAudio() {
    
    if(!this.playing)
    {
    this.audio.play();
    this.playing = true;
    }
    else
    {
      this.audio.pause();
      this.playing = false;
    }

  }

  updateText() {
    const currentTime = this.convertDecimalTimeToDateTime(this.audio.currentTime);
    console.log('current', currentTime.getSeconds(),'.', currentTime.getMilliseconds())
    
    const currentSegment = this.transcripts.find(segment =>
      {
        const {startTime, endTime} = segment;

        const currentTimeString = `${currentTime.getHours()}:${currentTime.getMinutes()}:`.concat(currentTime.getSeconds().toString().concat('.').concat(currentTime.getMilliseconds().toString()));
        const valor = this.compareTimeStrings(startTime, endTime, currentTimeString )

        return valor
      } );
    if (currentSegment) {
      this.currentId = currentSegment.id;
      this.currentText = currentSegment.content;
    }
  }

  convertDecimalTimeToDateTime(decimalTime: number): Date {
    const totalMilliseconds = decimalTime * 1000; // Convert seconds to milliseconds
  
    const date = new Date(0,0,0,0,0); // Create a new Date object with the epoch (January 1, 1970)
    date.setMilliseconds(totalMilliseconds);
  
    return date;
  }

  compareTimeStrings(timeStart: string, timeEnd: string, currentTime: string): boolean {
    const timeStartParts = timeStart.split(':');
    const timeEndParts = timeEnd.split(':');
    const currentTimeParts = currentTime.split(':');
  
    const dateStart = new Date(0, 0, 0, parseInt(timeStartParts[0]), parseInt(timeStartParts[1]), parseInt(timeStartParts[2].split('.')[0]), parseInt(timeStartParts[2].split('.')[1]));
    const dateEnd = new Date(0, 0, 0, parseInt(timeEndParts[0]), parseInt(timeEndParts[1]), parseInt(timeEndParts[2].split('.')[0]), parseInt(timeEndParts[2].split('.')[1]));
    const dateCurrent = new Date(0, 0, 0, parseInt(currentTimeParts[0]), parseInt(currentTimeParts[1]), parseInt(currentTimeParts[2].split('.')[0]), parseInt(currentTimeParts[2].split('.')[1]));
  
    if (dateCurrent >= dateStart && dateCurrent < dateEnd) 
      return true;
    else 
      return false;
  }

  hmsToSeconds(hours: number, minutes: number, seconds: number) {
    var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalSeconds;
  }
}
