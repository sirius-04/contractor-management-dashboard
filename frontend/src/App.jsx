import Navbar from "./components/Navbar/Navbar";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import RatingChart from "./components/RatingChart/RatingChart";
import ContractorTable from "./components/ContractorTable/ContractorTable";

function App() {
  return (
    <>
      <Navbar />

      <section className="p-4">
        <div className="flex flex-col justify-center items-center gap-6 lg:flex-row lg:items-stretch">
          <div className="w-full md:w-3/4 lg:flex-1">
            <SummaryCards />
          </div>

          <div className="w-full md:w-3/4 lg:flex-1">
            <RatingChart />
          </div>
        </div>

      </section>

      <section className="p-4">
        <ContractorTable />
      </section>
    </>
  );
}

export default App;