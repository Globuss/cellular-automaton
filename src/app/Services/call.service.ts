import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
 
 
@Injectable()
export class CallService {
    private subject = new Subject<any>();
    
    sendClickCall(message: string) {
        this.subject.next({ text: message });
    }
    
    getClickCall(): Observable<any> {
        return this.subject.asObservable();
    }
}