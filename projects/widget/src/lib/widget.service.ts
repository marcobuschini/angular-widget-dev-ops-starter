import { Injectable, inject } from '@angular/core'
import { ParkingSlot } from './parkingslot'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Feature } from './feature'
import { Vendor } from './vendor'

/**
 * This service loads parking data from a remote server.
 */
@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  public http = inject(HttpClient)

  /** A list of parking slots loaded from the remote server. */
  private parkingSlots: ParkingSlot[]

  /**
   * The constructor injects the HttpClient to conntact the remote server.
   */
  public constructor() {}

  /**
   * Loads parking slots for the given vendor from the backend.
   *
   * @param vendor the vendor
   */
  public getParkingSlots(vendor: Vendor): Observable<ParkingSlot[]> {
    return this.http.get<ParkingSlot[]>(
      '/assets/vendor/' + encodeURIComponent(vendor.name) + '/parkingslots.json'
    )
  }

  /**
   * Loads the features for the given vendor from the backend.
   *
   * @param vendor the vendor
   */
  public getVendorFeatures(vendor: Vendor): Observable<Feature[]> {
    return this.http.get<Feature[]>(
      '/assets/vendor/' + encodeURIComponent(vendor.name) + '/features.json'
    )
  }
}
