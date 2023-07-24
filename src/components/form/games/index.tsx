import { FormSchemaType } from "@/app/page";
import { useFormContext } from "react-hook-form";
import FinalFantasyIcon from "@/components/icon/final-fantasy";
import SettingsIcon from "@/components/icon/settings";
import { useModal } from "@/components/modal/context";
import ErrorMessageDisplay from "@/components/errorMessage";

export default function Games() {
  const { openModal } = useModal((state) => ({ openModal: state.openModal }));

  const {
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  return (
    <div className="grid grid-cols-2 my-9">
      <div className="mr-3 w-full">
        <button
          type="button"
          onClick={() => openModal("GAME_SETTINGS", "")}
          className="p-2 w-full rounded text-description transition ease-in-out delay-150 bg-white hover:text-primary hover:-translate-y-1 hover:scale-110 hover:bg-[#FAF3F0] duration-300"
        >
          <div className="flex flex-row align-center justify-center">
            <div className="w-7 py-1">
              <SettingsIcon />
            </div>
            <span className="font-semibold">Select Game Settings</span>
          </div>
        </button>
        {errors.gameSettings && (
          <ErrorMessageDisplay message={String(errors.gameSettings.message)} />
        )}
      </div>
      <div className="ml-3 w-full">
        <button
          type="button"
          onClick={() => openModal("GAME_GENRE", "")}
          className="w-full p-2 rounded text-description transition ease-in-out delay-150 bg-white hover:text-primary hover:-translate-y-1 hover:scale-110 hover:bg-[#FAF3F0] duration-300"
        >
          <div className="flex flex-row align-center justify-center">
            <div className="w-7 py-1">
              <FinalFantasyIcon />
            </div>
            <span className="font-semibold">Select Game Genre</span>
          </div>
        </button>
        {errors.gameGenre && (
          <ErrorMessageDisplay message={String(errors.gameGenre.message)} />
        )}
      </div>
    </div>
  );
}
