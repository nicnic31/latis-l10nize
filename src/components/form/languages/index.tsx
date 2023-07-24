import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormSchemaType } from "@/app/page";
import { listOfLanguages } from "@/utils/languages";

import SingleSelect from "@/components/select/single-select";

const findLanguage = (selectedValue: string) => {
  return listOfLanguages.find((language) => language.value === selectedValue);
};

export default function Languages() {
  const [sourceValue, setSourceValue] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const {
    setValue,
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  const handleSourceDropdown = (value: string) => {
    const language = findLanguage(value);
    if (language && sourceValue !== language.name) {
      setSourceValue(language.name);
      setValue("sourceLanguage", language.name);
    } else {
      setSourceValue("");
      setValue("sourceLanguage", "");
    }
  };

  const handleTargetDropdown = (value: string) => {
    const language = findLanguage(value);
    if (language && targetValue !== language.name) {
      setTargetValue(language.name);
      setValue("targetLanguage", language.name);
    } else {
      setTargetValue("");
      setValue("targetLanguage", "");
    }
  };

  return (
    <div>
      <div className="flex flex-row align-center w-full mt-9 mb-5">
        <div className="w-2/5 py-2">
          <p className="font-semibold tracking-wide">Source Language:</p>
        </div>
        <SingleSelect
          placeholder="Select language"
          options={listOfLanguages}
          selectedValue={sourceValue}
          handleSelect={handleSourceDropdown}
          selection
          errorMessage={errors.sourceLanguage && errors.sourceLanguage.message}
        />
      </div>
      <div className="flex flex-row align-center w-full my-3">
        <div className="w-2/5 py-2">
          <p className="font-semibold tracking-wide">Target Language:</p>
        </div>
        <SingleSelect
          placeholder="Select language"
          options={listOfLanguages}
          selectedValue={targetValue}
          handleSelect={handleTargetDropdown}
          selection
          errorMessage={errors.targetLanguage && errors.targetLanguage.message}
        />
      </div>
    </div>
  );
}
