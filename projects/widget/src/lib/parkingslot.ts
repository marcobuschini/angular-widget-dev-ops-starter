/** A parking slot for sale on the widget. */
export class ParkingSlot {
  /** The unique identifier of the slot. */
  public id: number
  /** The human readable name of the slot. */
  public name: string
  /** An array of the feature names available on the slot. */
  public features: string[]
}
