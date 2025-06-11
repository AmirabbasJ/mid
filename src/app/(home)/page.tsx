import { MainLayout } from '@/layouts';
import { GlobeSection } from './_components/GlobeSection/GlobeSection';
import { MarketSection } from './_components/MarketSection/MarketSection';
import { PageTitle } from './_components/PageTitle';

function Home() {
  return (
    <MainLayout>
      <div className="h-screen justify-center items-center flex">
        <PageTitle />
      </div>
      <div className="h-60"></div>
      <MarketSection />
      <div className="h-screen justify-center items-center flex">
        <PageTitle />
      </div>
      <GlobeSection />
      <div className="h-screen" />
    </MainLayout>
  );
}

export default Home;
