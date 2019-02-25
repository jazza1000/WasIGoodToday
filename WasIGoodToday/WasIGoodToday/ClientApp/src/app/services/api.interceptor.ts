import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http'
import { Observable } from "rxjs";
import {mergeMap} from 'rxjs/operators';



//intercepts each http request and adds headers that we always need


@Injectable()
export class ApiInterceptor implements HttpInterceptor{

    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
                request = request.clone({
                  setHeaders: {
                    //'Authorization': `Bearer ${token}`, don't need this yet
                    'Content-Type': `application/json`,
                    'Accept': `application/json`
                    
                  }
                });
                return next.handle(request);
     
      }






}