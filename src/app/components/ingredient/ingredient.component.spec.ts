import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientComponent } from './ingredient.component';

describe('IngredientComponent', () => {
  let component: IngredientComponent;
  let fixture: ComponentFixture<IngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('komponento html atvaizdavime yra antraštė "Ingredient"', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain(
      'Ingredient'
    );
  });

  it('komponento klasė teisingai skaičiuoja kainą jei price laukelis yra skaičius ir qunatity yra skaičius', () => {
    component.quantity = 10;
    component.price = 15;
    expect(component.totalPrice()).toEqual(150);
  });

  it('komponento klasės metodas totalPrice grąžina null jei price laukelis yra null, o quantity yra skaičius', () => {
    component.quantity = 10;
    component.price = null;
    expect(component.totalPrice()).toEqual(null);
  });

  it('komponente priskyrus pavadinimą jis yra atvaizduojamas komponento HTML faile', () => {
    component.name = 'kazkoks ingredientas';
    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#name').textContent).toContain(
      'kazkoks ingredientas'
    );
  });

  it('komponentui priskyrus quantity ir price atsiranda užrašas su teisingu skaičiumi', () => {
    component.quantity = 10;
    component.price = 150;
    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#totalPrice').textContent).toContain('150');
  });

  it('komponentui priskyrus quantity, o price palikus null nerodomas kainos laukelis', () => {
    component.quantity = 10;
    component.price = null;
    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#totalPrice')).toBeNull();
  });
});
