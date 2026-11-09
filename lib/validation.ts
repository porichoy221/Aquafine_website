import { z } from "zod";
import { districts, slots } from "./site";
// Strips HTML tags / angle brackets so scripts can't be injected into stored text.
const clean = (s: string) => s.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
export const phoneSchema = z.string().trim().regex(/^01[3-9]\d{8}$/, "Enter a valid mobile number like 01XXXXXXXXX");
const name = z.string().min(2, "Name is required").max(80).transform(clean);
const address = z.string().min(8, "Enter your full address").max(250).transform(clean);
export const orderSchema = z.object({
  productId: z.string().min(1), qty: z.coerce.number().int().min(1).max(20), name, phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  district: z.enum(districts, { errorMap: () => ({ message: "Choose your district" }) }),
  thana: z.string().min(2, "Enter your thana").max(60).transform(clean), address,
  installation: z.boolean().default(false),
  paymentMethod: z.enum(["COD", "BKASH", "NAGAD", "ROCKET"]).default("COD"),
  trxId: z.string().trim().max(30).regex(/^[A-Za-z0-9]*$/, "Letters and numbers only").optional().default(""),
});
export const bookingSchema = z.object({
  name, phone: phoneSchema, serviceType: z.string().min(2).max(60).transform(clean), date: z.string().min(1, "Pick a date"),
  slot: z.enum(slots, { errorMap: () => ({ message: "Choose a time slot" }) }), issue: z.string().max(500).optional().default("").transform(clean), address,
});
export const leadSchema = z.object({ name, phone: phoneSchema, area: z.string().min(2, "Enter your area").max(80).transform(clean), source: z.enum(["Tap water", "Deep tube-well"]) });
export const contactSchema = z.object({
  name, email: z.string().trim().email("Enter a valid email").max(120),
  subject: z.string().min(2, "Subject is required").max(120).transform(clean),
  message: z.string().max(1500).optional().default("").transform(clean),
});
