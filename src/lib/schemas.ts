import { z } from "zod"

const phoneRegex = /^09\d{8}$/

export const registrationSchema = z.object({
  name: z.string().trim().min(1, { message: "姓名為必填欄位" }),
  email: z.string().trim().email({ message: "請輸入有效的信箱格式" }),
  phone: z.string().trim().regex(phoneRegex, { message: "請輸入有效的手機號碼 (例如: 0912345678)" }),
  organization: z.string().trim().min(1, { message: "服務單位為必填欄位" }),
  industry: z.string().min(1, { message: "請選擇產業類別" }),
  otherIndustry: z.string().trim().optional(),
  sessions: z.array(z.string()).min(1, { message: "請至少選擇一個會議場次" }),
  attendDinner: z.enum(["yes", "no"], { message: "請選擇是否參加" }).optional(),
  dietaryHabit: z.string().optional(),
  otherDietaryHabit: z.string().trim().optional()
}).superRefine((data, ctx) => {
  if (data.industry === "other" && !data.otherIndustry) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "請填寫產業名稱",
      path: ["otherIndustry"]
    })
  }

  if (data.attendDinner === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "請選擇是否參與晚宴",
      path: ["attendDinner"]
    })
  } else if (data.attendDinner === "yes") {
    if (!data.dietaryHabit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "請選擇飲食習慣",
        path: ["dietaryHabit"]
      })
    } else if (data.dietaryHabit === "other" && !data.otherDietaryHabit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "請填寫飲食習慣",
        path: ["otherDietaryHabit"]
      })
    }
  }
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>
