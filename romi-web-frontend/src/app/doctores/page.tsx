import DoctorsBrowser from "@/components/doctors/DoctorBrowser";

export const metadata = { title: "ROMI — Doctores" };

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        
      </header>

      <DoctorsBrowser />
    </main>
  );
}
