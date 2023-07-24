import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CheckIcon from "@/components/icon/check";
import ChevronDownIcon from "@/components/icon/chevron-down";
import cn from "classnames";
import ErrorMessageDisplay from "../errorMessage";

type Options = {
  name: string;
  value: string;
};

interface SingleSelectProps {
  placeholder: string;
  options: Array<Options>;
  selectedValue: string;
  handleSelect: (value: string) => void;
  isDisable?: boolean;
  selection?: boolean;
  errorMessage?: string;
}

export default function SingleSelect({
  placeholder,
  options,
  selectedValue,
  handleSelect,
  isDisable = false,
  selection = false,
  errorMessage,
}: SingleSelectProps) {
  return (
    <div className="w-full">
      <Listbox
        value={selectedValue}
        onChange={handleSelect}
        disabled={isDisable}
      >
        <div className="relative text-sm">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
            <span
              className={cn(
                "block truncate",
                selectedValue !== "" ? "text-description" : "text-[#B2B2B2]"
              )}
            >
              {selectedValue !== "" ? selectedValue : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
              <ChevronDownIcon />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 p-4 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
              {options.map((option, idx) => {
                return (
                  <Listbox.Option
                    key={idx}
                    value={option.value}
                    className={cn(
                      "cursor-pointer my-2 tracking-wide hover:bg-[#EFEFEF] p-1",
                      selectedValue === option.name
                        ? "bg-[#C3EDC0]"
                        : "bg-inherit"
                    )}
                  >
                    <div className="flex flex-row align-center">
                      {selection && (
                        <div className="w-5 mx-1">
                          {selectedValue === option.name && <CheckIcon />}
                        </div>
                      )}

                      <p className="text-sm">{option.name}</p>
                    </div>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {errorMessage && <ErrorMessageDisplay message={errorMessage} />}
    </div>
  );
}
