import { Feature } from './feature'

/** A parking slot vendor. */
export class Vendor {
  /** The vendor's name. */
  public name: string
  /** The vendor's description. */
  public description: string
  /** The features this vendor has available. */
  public features: Feature[]
}
