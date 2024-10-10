import { z } from "zod";

const hours = z.coerce.number({ invalid_type_error: "Hours should be number" }).min(0).max(23);
const minutes = z.coerce.number({ invalid_type_error: "Hours should be number" }).min(0).max(59);
const seconds = z.coerce.number({ invalid_type_error: "Seconds should be number", required_error: "Minutes are required" }).min(0).max(59);

export const formSchema = z.object({
  rounds: z.number().int().min(1).max(100),
  "prepare-hours": hours,
  "prepare-minutes": minutes,
  "prepare-seconds": seconds,
  "work-hours": hours,
  "work-minutes": minutes,
  "work-seconds": seconds,
  "rest-hours": hours,
  "rest-minutes": minutes,
  "rest-seconds": seconds,
});

export type IFormValues = z.infer<typeof formSchema>;
