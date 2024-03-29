type Props = {
  text: string;
};

const Badge = ({ text }: Props) => {
  return (
    <div className="bg-secondary-400 text-gray-500 py-2 px-4 lg:py-2 lg:px-6 rounded-md text-[18px] leading-4 font-semibold max-w-[160px] text-center whitespace-nowrap capitalize">
      <span>{text}</span>
    </div>
  );
};

export default Badge;
