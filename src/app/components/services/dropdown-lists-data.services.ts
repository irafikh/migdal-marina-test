import { Injectable } from '@angular/core';
import { NameValuePair } from '../../models/name-value-pairs.model';
import { Observable, Observer, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DropDownListModel } from 'src/app/models/drop-down-list.model';

@Injectable({
    providedIn: 'root'
})
export class DrowDownListsService {

    public constructor(private httpClient: HttpClient) { }

  public GetContactPersonTypeDDList(): Observable<DropDownListModel[]> {
    return new Observable ((observer: Observer<DropDownListModel[]>) => {
        setTimeout(() => {
            try {
                const contactPersonType: DropDownListModel[] = [];
                contactPersonType.push(new DropDownListModel("1", "מבוטח"));
                contactPersonType.push(new DropDownListModel("2", "סוכן"));
                contactPersonType.push(new DropDownListModel("3", "בן/בת זוג"));
                observer.next(contactPersonType);
                observer.complete();
                //console.log("GetContactPersonTypeDDList Service: " + contactPersonType[1].code + "~" + contactPersonType[1]?.value);
            }
            catch (err) {
                observer.error(err);
            }
        }, 0);
    });
  }

  public GetClaimCauseDDList(): Observable<DropDownListModel[]> {
    return new Observable ((observer: Observer<DropDownListModel[]>) => {
        setTimeout(() => {
            try {
                const claimCause: DropDownListModel[] = [];
                claimCause.push(new DropDownListModel("1", "תאונה"));
                claimCause.push(new DropDownListModel("2", "מחלה"));
                claimCause.push(new DropDownListModel("5", "תאונת עבודה"));
                claimCause.push(new DropDownListModel("6", "אחר"));
                observer.next(claimCause);
                observer.complete();
                //console.log("GetClaimCauseDDList Service: " + claimCause[0].code + "~" + claimCause[0]?.value);
            }
            catch (err) {
                observer.error(err);
            }
        }, 0);
    });
  }

  public GetInjuryTypeDDList(): Observable<DropDownListModel[]> {
    return new Observable ((observer: Observer<DropDownListModel[]>) => {
        setTimeout(() => {
            try {
                const injuryType: DropDownListModel[] = [];
                injuryType.push(new DropDownListModel("1", "אגן"));
                injuryType.push(new DropDownListModel("2", "גפיים"));
                injuryType.push(new DropDownListModel("5", "ראש"));
                injuryType.push(new DropDownListModel("6", "גב"));
                injuryType.push(new DropDownListModel("7", "לב"));
                injuryType.push(new DropDownListModel("9", "נפש"));
                observer.next(injuryType);
                observer.complete();
                //console.log("GetInjuryTypeDDList Service: " + injuryType[0].code + "~" + injuryType[0]?.value);
            }
            catch (err) {
                observer.error(err);
            }
        }, 0);
    });
  }

  public GetSubmitedByDDList(): Observable<DropDownListModel[]> {
    return new Observable ((observer: Observer<DropDownListModel[]>) => {
        setTimeout(() => {
            try {
                const submitedBy: DropDownListModel[] = [];
                submitedBy.push(new DropDownListModel("1", "מבוטח"));
                submitedBy.push(new DropDownListModel("2", "סוכן"));
                submitedBy.push(new DropDownListModel("3", "בן/בת זוג"));
                observer.next(submitedBy);
                observer.complete();
                //console.log("GetSubmitedByDDList Service: " + submitedBy[1].code + "~" + submitedBy[1]?.value);
            }
            catch (err) {
                observer.error(err);
            }
        }, 0);
    });
  }

  public GetSubmitionMethodDDList(): Observable<DropDownListModel[]> {
    return new Observable ((observer: Observer<DropDownListModel[]>) => {
        setTimeout(() => {
            try {
                const submitionMethod: DropDownListModel[] = [];
                submitionMethod.push(new DropDownListModel("1", "דואר"));
                submitionMethod.push(new DropDownListModel("2", "דיגיטל"));
                submitionMethod.push(new DropDownListModel("3", "פקס"));
                observer.next(submitionMethod);
                observer.complete();
                //console.log("GetSubmitionMethodDDList Service: " + submitionMethod[1].code + "~" + submitionMethod[1]?.value);
            }
            catch (err) {
                observer.error(err);
            }
        }, 0);
    });
  }

  public GetIdentityTypesDDList(): Observable<DropDownListModel[]> {
    return new Observable ((observer: Observer<DropDownListModel[]>) => {
        setTimeout(() => {
            try {
                const identityTypes: DropDownListModel[] = [];
                identityTypes.push(new DropDownListModel("1", "ת.ז."));
                identityTypes.push(new DropDownListModel("2", "דרכון"));
                identityTypes.push(new DropDownListModel("3", "מבוטח"));
                identityTypes.push(new DropDownListModel("4", "מפעל"));
                observer.next(identityTypes);
                observer.complete();
                //console.log("GetIdentityTypesDDList Service: " + identityTypes[1].code + "~" + identityTypes[1]?.value);
            }
            catch (err) {
                observer.error(err);
            }
        }, 0);
    });
  }

     handleError = (error: any) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      }
      console.log(errorMessage);
      return throwError(error);
    }
  }
