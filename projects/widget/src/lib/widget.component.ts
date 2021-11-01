import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { WidgetService } from './widget.service'
import { ParkingSlot } from './parkingslot'
import { Feature } from './feature'
import { Subscription } from 'rxjs'
import { Vendor } from './vendor'

/** The parking widget as described in the repository. */
@Component({
  selector: 'mlb-parking-widget',
  templateUrl: 'widget.component.html',
  styleUrls: ['widget.component.css'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  /** This input property receives the `Vendor` to display in the widget. */
  @Input()
  public vendor: Vendor

  /** The array of `ParkingSlots` to be shown in the widget. */
  public parkingSlots: ParkingSlot[]

  /**
   * The array of booleans that tell the widget what slots are to be viewed in
   * full detail, and what are not.
   */
  public showDetails: boolean[]

  /** The array of features the vendor makes available. */
  public features: Feature[]

  /** The subscription that loads parking slots from the backend. */
  private parkingSlots$: Subscription

  /** The subscription that loads vendor features from the backend. */
  private features$: Subscription

  /** This output property signals what parking slot we want to buy. */
  @Output()
  public buying = new EventEmitter<ParkingSlot>()

  /** The constructor injects the `WidgetService` in the component. */
  public constructor(
    /** The injected backend service. */
    public service: WidgetService
  ) {}

  /**
   * Loads parking slots, and vendor features from the backend as soon as the
   * widget is initialized.
   */
  public ngOnInit() {
    this.parkingSlots$ = this.service
      .getParkingSlots(this.vendor)
      .subscribe(slots => {
        this.parkingSlots = slots
        this.showDetails = []
        for (let index = 0; index < this.parkingSlots.length; index++) {
          this.showDetails[index] = false
        }
      })
    this.features$ = this.service
      .getVendorFeatures(this.vendor)
      .subscribe(features => {
        this.features = features
      })
  }

  /** Frees up resources when disposing the component. */
  public ngOnDestroy() {
    this.parkingSlots$.unsubscribe()
    this.features$.unsubscribe()
  }

  /**
   * Expands the providen slot.
   *
   * @param slot the slot to expand.
   */
  public expand(slot: ParkingSlot) {
    this.showDetails[slot.id] = true
  }

  /**
   * Collapses the providen slot.
   *
   * @param slot the slot to collapse.
   */
  public collapse(slot: ParkingSlot) {
    this.showDetails[slot.id] = false
  }

  /**
   * Signals the host application to add a slot to the shopping cart.
   *
   * @param slot the slot to buy.
   */
  public addToCart(slot: ParkingSlot) {
    this.buying.emit(slot)
  }
}
