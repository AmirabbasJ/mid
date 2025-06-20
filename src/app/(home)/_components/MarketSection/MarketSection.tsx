import { FadeUpText, FadeUpWords, Halo, Title } from '@/design';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { MarketList } from './MarketList';

export const MarketSection = () => {
  return (
    <div className="relative flex flex-col gap-8">
      <div className="flex flex-col gap-8 items-center px-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
          <div className="border p-0.5 rounded-md border-violet-300">
            <BarChart2 className="w-4 h-4 text-violet-300" />
          </div>
          <span>New opportunities</span>
        </div>
        <Halo className="-top-8" size={220} color="white" />

        <FadeUpText>
          <Title level={2} className="text-center uppercase">
            <span className="text-indigo-500">Trade</span> Your Favorite Market
          </Title>
        </FadeUpText>
        <FadeUpWords
          containerClassName="justify-center"
          size="sm"
          muted
          text="Want to buy Bitcoin outright or trade CFDs on Gold or EUR/USD? We've got you covered with access to 100+ global markets on one platform"
        />
        <button className="cursor-pointer text-md flex items-center justify-center gap-2 px-10 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition">
          View All coins
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <MarketList />
    </div>
  );
};
