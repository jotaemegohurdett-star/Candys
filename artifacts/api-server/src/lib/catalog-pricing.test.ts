import { test } from "node:test";
import assert from "node:assert/strict";
import { priceCheckout, resolvePrice, positiveInteger, priceKey, CheckoutError, type CheckoutItem } from "./catalog-pricing";

const settings = { price_m: "17990", price_l: "18990", price_p5_m: "22990", price_p5_l: "25990" };
const stocks = [
  { productId: "p1", productName: "Bolso existente", size: "M", qty: 10 },
  { productId: "p5", productName: "Bolso nuevo", size: "M", qty: 3 },
  { productId: "p5", productName: "Bolso nuevo", size: "L", qty: 10 },
];
const item = (overrides: Partial<CheckoutItem> = {}): CheckoutItem => ({
  productId: "p5", title: "Título del navegador", size: "M", quantity: 1, unit_price: 1, ...overrides,
});
const shipping = item({ productId: "shipping", size: undefined, title: "Despacho", quantity: 1, unit_price: 1 });
const throwsCode = (items: CheckoutItem[], code: string) =>
  assert.throws(() => priceCheckout(items, settings, stocks), error => error instanceof CheckoutError && error.code === code);

test("product overrides are isolated and old products retain their global prices", () => {
  assert.equal(priceKey("p5", "M"), "price_p5_m");
  assert.equal(resolvePrice(settings, "p5", "M"), 22990);
  assert.equal(resolvePrice(settings, "p5", "L"), 25990);
  assert.equal(resolvePrice(settings, "p1", "M"), 17990);
  assert.equal(resolvePrice({ ...settings, price_m: "19990" }, "p5", "M"), 22990);
  assert.equal(resolvePrice({}, "p1", "L"), 18990);
});

test("browser price, title and currency are not authoritative", () => {
  const [priced] = priceCheckout([item({ currency_id: "USD" })], settings, stocks);
  assert.equal(priced.unit_price, 22990);
  assert.equal(priced.currency_id, "CLP");
  assert.equal(priced.title, "Bolso nuevo · Talla M");
});

test("shipping includes every unit and respects the existing strict threshold", () => {
  assert.equal(priceCheckout([item({ size: "L", quantity: 2 }), shipping], settings, stocks)[1].unit_price, 0);
  assert.equal(priceCheckout([item({ quantity: 2 }), shipping], settings, stocks)[1].unit_price, 3500);
  assert.equal(priceCheckout([item(), shipping], { ...settings, price_p5_m: "49900" }, stocks)[1].unit_price, 3500);
  assert.equal(priceCheckout([item(), shipping], { ...settings, price_p5_m: "49901" }, stocks)[1].unit_price, 0);
});

test("different colors aggregate into the same stock variant", () => {
  throwsCode([item({ color: "Rosa", quantity: 2 }), item({ color: "Negro", quantity: 2 })], "OUT_OF_STOCK");
  assert.equal(priceCheckout([item({ color: "Rosa", quantity: 1 }), item({ color: "Negro", quantity: 2 })], settings, stocks).length, 2);
});

test("deleted products, untracked variants and unknown custom products are rejected", () => {
  throwsCode([item({ productId: "p999" })], "INVALID_PRODUCT");
  throwsCode([item({ size: "XL" })], "INVALID_PRODUCT");
  throwsCode([item({ productId: "p1", size: "L" })], "INVALID_PRODUCT");
  throwsCode([item({ productId: "custom-fake", size: "A6" })], "INVALID_PRODUCT");
});

test("custom notebooks retain their configured prices without stock rows", () => {
  assert.equal(priceCheckout([item({ productId: "custom-veterinary-notebook", size: "A6" })], settings, [])[0].unit_price, 12990);
  assert.equal(priceCheckout([item({ productId: "custom-veterinary-notebook", size: "A5" })], settings, [])[0].unit_price, 15990);
});

test("quantities and shipping lines cannot change the total illicitly", () => {
  for (const quantity of [0, -1, 1.5, NaN, Infinity]) throwsCode([item({ quantity })], "INVALID_ITEMS");
  throwsCode([item(), shipping, shipping], "INVALID_ITEMS");
  throwsCode([item(), { ...shipping, quantity: 2 }], "INVALID_ITEMS");
  throwsCode([shipping], "INVALID_ITEMS");
  throwsCode([], "INVALID_ITEMS");
});

test("invalid configured prices fail explicitly instead of falling back", () => {
  for (const value of ["0", "-1", "1.5", "", "abc", "Infinity", "100clp"]) {
    assert.equal(positiveInteger(value), null);
    assert.equal(resolvePrice({ ...settings, price_p5_m: value }, "p5", "M"), null);
  }
  assert.equal(positiveInteger("22990"), 22990);
});