"use client";
import { useState } from "react";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import UploadFile from "@/components/upload-file";
import PageLayout from "@/layout/page-layout";
import AdditionalOptions from "@/components/form/additional-options";
import Categories from "@/components/form/categories";
import Languages from "@/components/form/languages";
import Games from "@/components/form/games";
import Attachments from "@/components/form/attachments";
import { error } from "console";
import ModalContainer from "@/components/modal/container";
import ProgressBar from "@/components/progress-bar";

const defaultValues = {
  spreadsheet: "",
  sourceLanguage: "",
  targetLanguage: "",
  secondColumn: {
    isRequired: false,
    category: "",
  },
  thirdColumn: {
    isRequired: false,
    category: "",
  },
  fourthColumn: {
    isRequired: false,
    category: "",
  },
  gameSettings: [],
  gameGenre: [],
  additionalOptions: {
    gptProofReading: false,
    linguistProofReading: false,
  },
  termBase: {
    isRequired: false,
    file: "",
  },
  translationMemory: {
    isRequired: false,
    file: "",
  },
};

const FormValues = z.object({
  spreadsheet: z.string().min(1, { message: "Please upload a spreadsheet" }),
  sourceLanguage: z.string().min(1, { message: "Source language is required" }),
  targetLanguage: z.string().min(1, { message: "Target language is required" }),
  secondColumn: z.object({
    isRequired: z.boolean(),
    category: z.string(),
  }),
  thirdColumn: z.object({
    isRequired: z.boolean(),
    category: z.string(),
  }),
  fourthColumn: z.object({
    isRequired: z.boolean(),
    category: z.string(),
  }),
  gameSettings: z
    .string()
    .array()
    .min(1, { message: "Game Settings is required" }),
  gameGenre: z.string().array().min(1, { message: "Game Genre is required" }),
  additionalOptions: z.object({
    gptProofReading: z.boolean(),
    linguistProofReading: z.boolean(),
  }),
  termBase: z
    .object({
      isRequired: z.boolean(),
      file: z.string(),
    })
    .optional(),
  translationMemory: z
    .object({
      isRequired: z.boolean(),
      file: z.string(),
    })
    .optional(),
});

export type FormSchemaType = z.infer<typeof FormValues>;

export default function Home() {
  const [spreadsheet, setSpreadsheet] = useState<string>("");
  const [isProgress, setProgress] = useState(false);
  const [percent, setPercent] = useState(20);
  const formMethods = useForm<FormSchemaType>({
    defaultValues: defaultValues,
    resolver: zodResolver(FormValues),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const handleSpreadsheetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSpreadsheet(files[0].name);
      setValue("spreadsheet", files[0].name);
    }
  };

  const handleSubmitForm = (data: FormSchemaType) => {
    console.log("Got your data", data);
    setProgress(true);
  };

  if (isProgress && percent <= 100) {
    setTimeout(() => {
      if (percent < 100) {
        setPercent(percent + 5);
      }
    }, 1200);
  }

  return (
    <PageLayout>
      <div className="py-5 px-3 font-sans">
        <h5 className="font-bold text-4xl tracking-wide text-title mb-5">
          L10nize
        </h5>
        <p className="text-sm leading-6 tracking-wide mb-7">
          <span className="font-semibold mr-2">Direction:</span>
          Upload your document as a spreadsheet. The first column should include
          the text to be translated. If you have additional information about
          the text, please use the menu below.
        </p>
        <FormProvider {...formMethods}>
          <form
            className="text-sm text-description"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <UploadFile
              file={spreadsheet}
              handleFile={handleSpreadsheetChange}
              errorMessage={errors.spreadsheet && errors.spreadsheet.message}
            />
            <Languages />
            <Categories />
            <Games />
            <AdditionalOptions />
            <Attachments />
            <ModalContainer />

            {isProgress ? (
              <div className="my-12">
                <ProgressBar width={percent} />
                <p className="text-xs text-center w-full mt-8 font-semibold tracking-wider">
                  Your localization will be finish less than a minute.
                </p>
              </div>
            ) : (
              <div className="text-center mt-12">
                <button
                  type="submit"
                  className="transition text-sm w-36 p-2 rounded text-white tracking-wide font-semibold ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </PageLayout>
  );
}
