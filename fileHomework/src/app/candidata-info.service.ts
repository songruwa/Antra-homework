import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateInfoService {

  private _candidateInfo = new BehaviorSubject<any[]>([]);
  public readonly candidateInfo$ = this._candidateInfo.asObservable();

  constructor() { }

  setCandidateInfo(data: any[]) {
    this._candidateInfo.next(data);
  }

  getCandidateInfo() {
    return this.candidateInfo$;
  }

}
