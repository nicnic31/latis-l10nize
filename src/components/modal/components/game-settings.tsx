import { useState } from "react";
import Checkbox from "@/components/checkbox";
import { settings } from "@/utils/settings";
import { useModal } from "../context";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormSchemaType } from "@/app/page";
import cn from "classnames";
export default function GameSettings() {
  const { closeModal } = useModal((state) => ({
    closeModal: state.closeModal,
  }));

  const [gameSettings, setGameSettings] = useState<Array<string>>([]);
  const { setValue } = useFormContext<FormSchemaType>();

  const handleCheckbox = (check: boolean, value: string) => {
    const storage = [...gameSettings];
    if (check) {
      storage.push(value);
      setGameSettings(storage);
    } else {
      const filtered = storage.filter((setting) => setting !== value);
      setGameSettings(filtered);
    }
  };

  const handleSubmit = () => {
    if (gameSettings.length > 0) {
      setValue("gameSettings", gameSettings);
      closeModal();
    }
  };

  const handleCancel = () => {
    setGameSettings([]);
    setValue("gameSettings", []);
    closeModal();
  };

  return (
    <div className="bg-white w-[600px] rounded font-sans p-5">
      <p className="font-semibold text-center text-xl text-title mb-3 tracking-wide">
        Game Settings
      </p>
      <p className="text-xs tracking-wide text-center text-information">
        Here are the list of the settings in a game
      </p>
      <div className="grid grid-cols-3 gap-2 mt-7">
        {settings.map((setting, idx) => (
          <div key={idx} className="flex flex-row align-center my-1">
            <div className="w-7">
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={(e) =>
                  handleCheckbox(e.target.checked, setting.value)
                }
              />
            </div>
            <p className="text-sm">{setting.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center mt-5 mb-2">
        <button
          type="button"
          onClick={handleCancel}
          className={cn(
            "w-full text-white tracking-wide mr-2 text-center  rounded text-sm p-3 font-semibold",
            gameSettings.length < 1
              ? "bg-[#9AC5F4] hover:bg-none"
              : "bg-[#9DB2BF] hover:bg-[#526D82]"
          )}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={gameSettings.length < 1}
          className={cn(
            "w-full cursor-pointer tracking-wide text-white ml-2 text-center rounded text-sm p-3 font-semibold",
            gameSettings.length < 1
              ? "bg-[#AAC8A7] hover:bg-none"
              : "bg-[#7A9D54] hover:bg-[#1A5D1A]"
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
}
