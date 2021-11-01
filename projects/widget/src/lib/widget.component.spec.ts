import {
  ComponentFixture,
  TestBed,
  async as realAsync,
  fakeAsync,
  flush,
  flushMicrotasks,
} from '@angular/core/testing'

import { WidgetComponent } from './widget.component'
import { Vendor } from './vendor'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of, Observable } from 'rxjs'
import { ParkingSlot } from './parkingslot'
import { Feature } from './feature'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { By } from '@angular/platform-browser'

describe('WidgetComponent', () => {
  let component: WidgetComponent
  let fixture: ComponentFixture<WidgetComponent>

  let vendorSpy: jest.SpyInstance<Observable<Feature[]>>
  let slotsSpy: jest.SpyInstance<Observable<ParkingSlot[]>>
  let addSpy: jest.SpyInstance<void, [ParkingSlot?]>

  const dummyVendor: Vendor = {
    name: 'Test Vendor',
    description: 'This is a test vendor',
    features: [
      { name: 'Feature 1' },
      { name: 'Feature 2' },
      { name: 'Feature 3' },
    ],
  }

  const dummySlots: ParkingSlot[] = [
    {
      id: 0,
      name: 'Slot 1',
      features: ['Feature 1', 'Feature 2'],
    },
  ]

  function setTimeoutPromise(milliseconds: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds)
    })
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [WidgetComponent],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatListModule,
        HttpClientTestingModule,
      ],
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent)
    component = fixture.componentInstance
    component.vendor = dummyVendor
    vendorSpy = jest
      .spyOn(component.service, 'getVendorFeatures')
      .mockReturnValue(of(dummyVendor.features))
    slotsSpy = jest
      .spyOn(component.service, 'getParkingSlots')
      .mockReturnValue(of(dummySlots))
    addSpy = jest.spyOn(component.buying, 'emit')

    fixture.detectChanges()
  })

  afterEach(() => {
    component.ngOnDestroy()
  })

  it(
    'should create component with hidden slots, then show, then hide back',
    realAsync(async () => {
      expect(component).toBeTruthy()

      component.ngOnInit()

      await setTimeoutPromise(1000)

      expect(vendorSpy).toHaveBeenCalled()
      expect(slotsSpy).toHaveBeenCalled()

      expect(fixture).toMatchSnapshot()

      let button = fixture.debugElement.queryAll(By.css('button'))[1]
        .nativeElement as HTMLButtonElement
      button.click()
      fixture.detectChanges()
      await setTimeoutPromise(1000)

      expect(fixture).toMatchSnapshot()

      button = fixture.debugElement.queryAll(By.css('button'))[1]
        .nativeElement as HTMLButtonElement
      button.click()
      fixture.detectChanges()
      await setTimeoutPromise(1000)

      expect(fixture).toMatchSnapshot()
    })
  )

  it('should add to cart', () => {
    component.ngOnInit()

    const button = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement as HTMLButtonElement
    button.click()
    fixture.detectChanges()
    expect(addSpy).toHaveBeenCalled()
  })
})
