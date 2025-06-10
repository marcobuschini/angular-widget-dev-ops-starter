import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing'

import { expect, jest } from '@jest/globals'

import { WidgetComponent } from './widget.component'
import { Vendor } from './vendor'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { of } from 'rxjs'
import { ParkingSlot } from './parkingslot'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { BrowserModule, By } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { WidgetModule } from './widget.module'
import { WidgetService } from './widget.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'

describe('WidgetComponent', () => {
  let component: WidgetComponent
  let fixture: ComponentFixture<WidgetComponent>

  let vendorSpy: any
  let slotsSpy: any
  let addSpy: any

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

  const setTimeoutPromise = (milliseconds: number): Promise<void> =>
    new Promise(resolve => {
      setTimeout(resolve, milliseconds)
    })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        WidgetModule,
        WidgetComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WidgetService,
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(WidgetComponent)
    component = fixture.componentInstance
  })

  beforeEach(() => {
    component.vendor = dummyVendor
    vendorSpy = jest
      .spyOn(component.service, 'getVendorFeatures')
      .mockReturnValue(of(dummyVendor.features))
    slotsSpy = jest
      .spyOn(component.service, 'getParkingSlots')
      .mockReturnValue(of(dummySlots))
    addSpy = jest.spyOn(component.buying, 'emit')
    component.ngOnInit()

    fixture.detectChanges()
  })

  afterEach(() => {
    component.ngOnDestroy()
  })

  it(
    'should create component with hidden slots, then show, then hide back',
    async () => {
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
    }
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
