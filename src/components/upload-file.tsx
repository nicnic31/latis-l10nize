"use client";
import { InputHTMLAttributes } from "react";
import FileIcon from "@/components/icon/file";
import ErrorMessageDisplay from "./errorMessage";

interface UploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
  file: string;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  isDisable?: boolean;
}

export default function UploadFile(props: UploadFileProps) {
  const { file, handleFile, errorMessage, isDisable = false, ...rest } = props;

  return (
    <div className="">
      <div className="bg-[#FAF3F0] rounded flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <input
            id="dropzone-file"
            type="file"
            accept=".xlsx, .xls, .xlsm, .def, .123, .xl, .dex, .xlr, .numbers-tef, .pmvx, .ots, .sxc, .gnumeric, .nb, .xltm, .xlsb, .ods, .mar, .cell, .fods, .presto, .chip, .xar, .bks, .numbers, .rdf, .edxz, cts, .tmv, .efu, ._xlsx, .imp, .wq2, .pmd, .nmbtemplate, .sdc, ._xltx, ._xls, .fp, .pmdx, .gsheet, .qpw, .ogwu, .xlshtml, .ncss, .ast, .wks, .dis, .12m, .xlsmhtml, .gnm, .ess, .ogw, .wq1, .edx, .aws, .wkq, .wks, .stc, .xlhtml, , .fcs, .wr1, .pmv, .hcdt, .uos, .tmvt, .dfg, .wku, .wls, .wki"
            className="hidden"
            onChange={handleFile}
            disabled={isDisable}
            {...rest}
          />
          {file && file !== "" ? (
            <p className="font-semibold text-sm text-description">{file}</p>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileIcon />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
          )}
        </label>
      </div>
      {errorMessage && <ErrorMessageDisplay message={errorMessage} />}
    </div>
  );
}
