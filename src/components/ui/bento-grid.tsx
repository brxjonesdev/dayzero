import { cn } from '@/lib/utils';

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl font-geist-mono group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.1]  border-2 bg-[#ffffff]  border-black justify-between flex flex-col space-y-4',
        className,
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 font-geist-sans">
        {icon}
        <div className="font-geist-sans font-bold text-neutral-900 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-geist-sans font-normal text-neutral-900 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
