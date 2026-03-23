import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "../lib/schemas";

import { FormField } from "../components/form/FormField";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { Radio } from "../components/ui/Radio";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";

import headerImg from "../assets/image/header背景 1.svg";
import footerImg from "../assets/image/footer背景 1.svg";
import vectorImg from "../assets/image/報名按鈕.svg";
import hoverVectorImg from "../assets/image/hover報名按鈕.svg";

const industryOptions = [
  { value: "", label: "請選擇產業類別" },
  { value: "technology", label: "科技業" },
  { value: "medical", label: "醫療產業" },
  { value: "finance", label: "金融業" },
  { value: "education", label: "教育領域" },
  { value: "other", label: "其他" },
];

const sessionOptions = [
  { id: "Session A", label: "Session A" },
  { id: "Session B", label: "Session B" },
  { id: "Session C", label: "Session C" },
  { id: "Session D", label: "Session D" },
];

export function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      industry: "",
      otherIndustry: "",
      sessions: [],
      attendDinner: undefined,
      dietaryHabit: "",
      otherDietaryHabit: "",
    },
  });

  const watchIndustry = watch("industry");
  const watchAttendDinner = watch("attendDinner");
  const watchDietaryHabit = watch("dietaryHabit");

  const onSubmit = (data: RegistrationFormValues) => {
    // 依據條件清除不必要的欄位值 (確保 Payload 乾淨)
    const finalData = { ...data };
    if (finalData.industry !== "other") finalData.otherIndustry = "";
    if (finalData.attendDinner === "no") {
      finalData.dietaryHabit = "";
      finalData.otherDietaryHabit = "";
    } else if (finalData.dietaryHabit !== "other") {
      finalData.otherDietaryHabit = "";
    }

    console.log("=== 表單成功送出 ===");
    console.log("表單資料：", finalData);
    // alert(`表單已成功送出！請查看 Console 輸出。${JSON.stringify(finalData)}`);
    setIsSubmitted(true);
  };

  // 輔助函式：當 Radio 改變時如果有條件關聯需要清空狀態
  const handleDinnerChange = (val: "yes" | "no") => {
    setValue("attendDinner", val, { shouldValidate: true });
    if (val === "no") {
      setValue("dietaryHabit", "", { shouldValidate: true });
      setValue("otherDietaryHabit", "", { shouldValidate: true });
    }
  };

  return (
    <div className="w-full max-w-[576px] mx-auto relative bg-white  shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-screen">
      <img
        src={headerImg}
        alt="Header background"
        className="absolute top-0 left-0 w-full object-cover pointer-events-none z-0"
      />

      <div className="p-6 md:p-8 pt-12 md:pt-16 relative z-10 flex-grow flex flex-col justify-center">
        {isSubmitted ? (
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500 py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#9C0053] tracking-wider">
              感謝您的填寫！
            </h2>
            <p className="text-gray-600 text-lg max-w-sm mx-auto leading-relaxed">
              我們已收到您的報名資訊，<br />
              將會儘速與您聯繫。
            </p>
            <div className="pt-8">
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#9C0053] hover:bg-[#7D0042] text-white px-8 py-2 rounded-full transition-all duration-300"
              >
                返回報名表
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center w-full">
              <h1 className="font-semibold text-[#9C0053] mb-2 tracking-[0.2em] ml-[0.2em] whitespace-nowrap text-[clamp(28px,8vw,48px)] sm:text-[clamp(36px,8.5vw,52px)]">
                線上會議報名表
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 "
              noValidate
            >
              {/* 基本資訊區塊 */}
              <div className="space-y-[40px] text-[16px]">
                <FormField label="姓名" required error={errors.name?.message}>
                  <Input
                    placeholder="請輸入您的姓名"
                    {...register("name")}
                    error={!!errors.name}
                  />
                </FormField>

                <FormField
                  label="常用信箱"
                  required
                  error={errors.email?.message}
                >
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...register("email")}
                    error={!!errors.email}
                  />
                </FormField>

                <FormField
                  label="手機號碼"
                  required
                  error={errors.phone?.message}
                >
                  <Input
                    type="tel"
                    placeholder="0912345678"
                    {...register("phone")}
                    error={!!errors.phone}
                  />
                </FormField>

                <FormField
                  label="服務單位"
                  required
                  error={errors.organization?.message}
                >
                  <Input
                    placeholder="請輸入公司或學校名稱"
                    {...register("organization")}
                    error={!!errors.organization}
                  />
                </FormField>
              </div>

              {/* 產業與場次區塊 */}
              <div className="space-y-[40px]">
                <FormField
                  label="工作產業類別"
                  error={errors.industry?.message}
                >
                  <Select {...register("industry")} error={!!errors.industry}>
                    {industryOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.value === ""}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </FormField>

                {watchIndustry === "other" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormField
                      label="產業名稱"
                      required
                      error={errors.otherIndustry?.message}
                    >
                      <Input
                        placeholder="請輸入您的產業名稱"
                        {...register("otherIndustry")}
                        error={!!errors.otherIndustry}
                      />
                    </FormField>
                  </div>
                )}

                <FormField
                  label="欲參與的會議場次(複選題)"
                  error={errors.sessions?.message}
                >
                  <div className="space-y-3    rounded-md  ">
                    <Controller
                      name="sessions"
                      control={control}
                      render={({ field }) => (
                        <>
                          {sessionOptions.map((session) => (
                            <div
                              key={session.id}
                              className="flex items-center space-x-2  "
                            >
                              <Checkbox
                                id={session.id}
                                value={session.id}
                                checked={field.value.includes(session.id)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      session.id,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (id) => id !== session.id,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <Label
                                htmlFor={session.id}
                                className="cursor-pointer text-[15px] font-medium"
                              >
                                {session.label}
                              </Label>
                            </div>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </FormField>
              </div>

              {/* 晚宴區塊 */}
              <div className="space-y-[40px]">
                <FormField
                  label="是否參與晚宴"
                  error={errors.attendDinner?.message}
                >
                  <div className="flex space-x-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <Radio
                        id="dinner-yes"
                        value="yes"
                        {...register("attendDinner")}
                        onChange={() => handleDinnerChange("yes")}
                      />
                      <Label
                        htmlFor="dinner-yes"
                        className="cursor-pointer text-[15px] font-medium"
                      >
                        是，我會參與
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio
                        id="dinner-no"
                        value="no"
                        {...register("attendDinner")}
                        onChange={() => handleDinnerChange("no")}
                      />
                      <Label
                        htmlFor="dinner-no"
                        className="cursor-pointer text-[15px] font-medium"
                      >
                        否，我不克參與
                      </Label>
                    </div>
                  </div>
                </FormField>

                {watchAttendDinner === "yes" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 ">
                    <FormField
                      label="飲食習慣"
                      error={errors.dietaryHabit?.message}
                    >
                      <div className="flex flex-row space-x-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <Radio
                            id="diet-meat"
                            value="meat"
                            {...register("dietaryHabit")}
                          />
                          <Label
                            htmlFor="diet-meat"
                            className="cursor-pointer text-[15px] font-medium"
                          >
                            葷食
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Radio
                            id="diet-veg"
                            value="vegetarian"
                            {...register("dietaryHabit")}
                          />
                          <Label
                            htmlFor="diet-veg"
                            className="cursor-pointer text-[15px] font-medium"
                          >
                            素食
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Radio
                            id="diet-other"
                            value="other"
                            {...register("dietaryHabit")}
                          />
                          <Label
                            htmlFor="diet-other"
                            className="cursor-pointer text-[15px] font-medium"
                          >
                            其他
                          </Label>
                        </div>
                      </div>
                    </FormField>

                    {watchDietaryHabit === "other" && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <FormField
                          label="請指定飲食習慣"
                          required
                          error={errors.otherDietaryHabit?.message}
                        >
                          <Input
                            placeholder="例如：不吃牛肉、對海鮮過敏等"
                            {...register("otherDietaryHabit")}
                            error={!!errors.otherDietaryHabit}
                          />
                        </FormField>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-10 pb-4 flex justify-center relative z-10">
                <Button
                  type="submit"
                  className="group w-full max-w-[277px] p-0 border-none bg-transparent hover:bg-transparent !h-auto focus:ring-0 focus-visible:ring-0 active:bg-transparent cursor-pointer"
                >
                  <img
                    src={vectorImg}
                    alt="馬上報名"
                    className="w-full h-auto object-contain group-hover:hidden"
                  />
                  <img
                    src={hoverVectorImg}
                    alt="馬上報名Hover"
                    className="w-full h-auto object-contain hidden group-hover:block"
                  />
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
      <img
        src={footerImg}
        alt="Footer background"
        className="absolute bottom-0 left-0 w-full object-cover pointer-events-none z-0"
      />
    </div>
  );
}
