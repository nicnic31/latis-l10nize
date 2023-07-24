import Image from "next/image";

interface PageLayoutProps {
  children: React.ReactNode;
}
export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <div className="grid grid-cols-2 p-9">
        <div className="relative m-0">
          <div className="fixed top-[20%] left-[15%]">
            <Image
              src="/assets/image.png"
              alt="side-image"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
