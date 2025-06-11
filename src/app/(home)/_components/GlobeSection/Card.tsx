export const Card = () => {
  return (
    <div className="w-[300px] p-6 rounded-2xl bg-[#14161F] text-white shadow-lg flex flex-col gap-2">
      <div className="w-6 h-6 bg-purple-400 rounded-full" />

      <h3 className="text-xs font-semibold">
        Best Crypto Platform For Professionals
      </h3>

      <p className="text-[10px] text-gray-300">
        As A Professional Trader, I Need Reliability And Advanced Features. This
        Platform Delivers Both Flawlessly.
      </p>

      <div className="flex items-center space-x-2 pt-2">
        <span className="text-[10px] font-medium">Daniel M</span>
        <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-400"></div>
      </div>
    </div>
  );
};
