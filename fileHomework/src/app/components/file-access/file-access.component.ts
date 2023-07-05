import { Component, OnInit } from '@angular/core';
import { CandidateInfoService } from 'src/app/candidata-info.service';

@Component({
  selector: 'app-file-access',
  templateUrl: './file-access.component.html',
  styleUrls: ['./file-access.component.css']
})
export class FileAccessComponent {
  dataInTheCSV: any[];
  titles: string[];

  constructor(private candidateInfoService: CandidateInfoService) {
    this.dataInTheCSV = [];
    this.titles = [];
  }

  loadFile(input: HTMLInputElement) {
    if (input.files && input.files.length > 0) {
      const file: File = input.files.item(0)!; // Get the first file from the input
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const csv = e.target.result;
        const lines = csv.split('\n');
        this.titles = lines[0].split(',');
        this.dataInTheCSV = lines.slice(1).map((line: string) => {
          let obj: { [k: string]: string } = {}; 
          let currentline = line.split(',');
          for (let j = 0; j < this.titles.length; j++) {
            obj[this.titles[j]] = currentline[j];
          }
          return obj;
        });
        this.candidateInfoService.setCandidateInfo(this.dataInTheCSV);
      };
      reader.readAsText(file);
    }
  }
  
  

  removeOrder = (a: any, b: any) => { return 0; };
}
