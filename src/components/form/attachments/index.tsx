import { useState } from "react";
import Checkbox from "@/components/checkbox";
import UploadFile from "@/components/upload-file";
import { FormSchemaType } from "@/app/page";
import { useFormContext } from "react-hook-form";

export default function Attachments() {
  const [files, setFiles] = useState({
    term: "",
    translation: "",
  });

  const [checkboxs, setCheckboxs] = useState({
    term: false,
    translation: false,
  });

  const { setValue } = useFormContext<FormSchemaType>();

  const handleTermFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFiles((prev) => ({ ...prev, term: files[0].name }));
      setValue("termBase.file", files[0].name);
    }
  };

  const handleTranslationFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFiles((prev) => ({ ...prev, translation: files[0].name }));
      setValue("translationMemory.file", files[0].name);
    }
  };

  const handleTermCheckbox = (check: boolean) => {
    if (!check) {
      setFiles((prev) => ({ ...prev, term: "" }));
      setValue("termBase.file", "");
    }
    setCheckboxs((prev) => ({ ...prev, term: check }));
    setValue("termBase.isRequired", check);
  };

  const handleTranslationCheckbox = (check: boolean) => {
    if (!check) {
      setFiles((prev) => ({ ...prev, translation: "" }));
      setValue("translationMemory.file", "");
    }
    setCheckboxs((prev) => ({ ...prev, translation: check }));
    setValue("translationMemory.isRequired", check);
  };

  return (
    <div className="my-5">
      <h5 className="font-semibold text-base my-4">Attachments</h5>
      <div className="flex flex-row align-center mt-5 mb-2">
        <div className="w-7">
          <Checkbox handleCheckbox={handleTermCheckbox} />
        </div>
        <p className="font-semibold text-sm tracking-wide">Term Base</p>
      </div>
      <p className="italic text-xs mb-2 tracking-wide">
        If you attach a term base, your term base will be used as primary term
        base. If not, Latis term will be used only.
      </p>
      <UploadFile
        file={files.term}
        isDisable={!checkboxs.term}
        handleFile={handleTermFile}
      />

      <div className="flex flex-row align-center mt-6 mb-2">
        <div className="w-7">
          <Checkbox handleCheckbox={handleTranslationCheckbox} />
        </div>
        <p className="font-semibold text-sm tracking-wide">
          Translation Memory
        </p>
      </div>
      <p className="italic text-xs mb-2 tracking-wide">
        If you attach a translation memory, your translation memory will be used
        as the primary translation memory. If not, Latis translation memory will
        be used only.
      </p>
      <UploadFile
        file={files.translation}
        isDisable={!checkboxs.translation}
        handleFile={handleTranslationFile}
      />
    </div>
  );
}
