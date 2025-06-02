import { BarChart2 } from 'lucide-react';
import { FadeUpText } from './libs/design/Effects/FadeUpText';
import { FadeUpWords } from './libs/design/Effects/FadeUpWords';
import { Halo } from './libs/design/Effects/Halo';
import { Layout } from './libs/design/Layout';
import { Text } from './libs/design/Typography/Text';
import { Title } from './libs/design/Typography/Title';

export function GlowPill() {
  return (
    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
      <div className="border p-0.5 rounded-md border-violet-300">
        <BarChart2 className="w-4 h-4 text-violet-300" />
      </div>
      <span>New opportunities</span>
    </button>
  );
}

function App() {
  return (
    <Layout>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="relative flex flex-col gap-8 items-center px-4">
        <GlowPill />
        <Halo className="-top-8" size={220} color="white" />

        <FadeUpText>
          <Title level={2} className="text-center uppercase">
            <span className="text-indigo-500">Trade</span> Your Favorite Market
          </Title>
        </FadeUpText>
        <FadeUpWords
          className="justify-center"
          component={({ children }) => (
            <Text size="sm" muted>
              {children}
            </Text>
          )}
          text="Want to buy Bitcoin outright or trade CFDs on Gold or EUR/USD? We've got you covered with access to 100+ global markets on one platform"
        ></FadeUpWords>
      </div>
      <div className="h-screen"></div>
    </Layout>
  );
}

export default App;
