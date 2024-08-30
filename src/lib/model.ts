import { z } from "zod";

export const formSchema = z.object({
  seconds: z.coerce.number({ invalid_type_error: "Seconds should be number", required_error: "Minutes are required" }).min(0).max(59),
  minutes: z.coerce.number({ invalid_type_error: "Hours should be number" }).min(0).max(59),
  hours: z.coerce.number({ invalid_type_error: "Hours should be number" }).min(0).max(23),
});

export type IFormValues = z.infer<typeof formSchema>;
