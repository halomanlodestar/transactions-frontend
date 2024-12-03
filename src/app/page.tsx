import StopSelection from "@/components/StopSelection";
import DisplayJourneys from "@/components/DisplayJourneys";

export default function Home() {
  return (
    <main className={"container-main space-container"}>
      <h1 className={"text-2xl font-bold"}>Select your stops</h1>
      <div className={"flex flex-col space-y-5"}>
        <StopSelection />
        <DisplayJourneys />
      </div>
    </main>
  );
}
