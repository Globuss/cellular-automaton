import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class CallService {
    private subject = new Subject<any>();

    sendClickCall(message: string, data: Object = null) {
        this.subject.next({ text: message, data: data });
    }

    getClickCall(): Observable<any> {
        return this.subject.asObservable();
    }
}
