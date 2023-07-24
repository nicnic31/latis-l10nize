import { FormSchemaType } from "@/app/page";
import { useFormContext } from "react-hook-form";
import Checkbox from "@/components/checkbox";

export default function AdditionalOptions() {
  const { setValue } = useFormContext<FormSchemaType>();

  const handleGPT = (check: boolean) => {
    setValue("additionalOptions.gptProofReading", check);
  };

  const handleLinguist = (check: boolean) => {
    setValue("additionalOptions.linguistProofReading", check);
  };

  return (
    <div className="my-5 text-sm">
      <h5 className="font-semibold text-base my-4">Additional Options</h5>
      <div className="grid grid-cols-2">
        <div className="flex flex-row align-center">
          <div className="w-9">
            <Checkbox handleCheckbox={handleGPT} />
          </div>
          <p className="tracking-wide font-semibold">
            GPT Proofreading & Visions
          </p>
        </div>
        <div className="flex flex-row align-center">
          <div className="w-9">
            <Checkbox handleCheckbox={handleLinguist} />
          </div>
          <p className="tracking-wide font-semibold">
            Linguist Proofreading & Revisions
          </p>
        </div>
      </div>
    </div>
  );
}
