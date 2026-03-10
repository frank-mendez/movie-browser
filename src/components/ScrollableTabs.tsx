type ScrollableTabItem<T extends string> = {
  label: string;
  value: T;
};

type ScrollableTabsProps<T extends string> = {
  items: ScrollableTabItem<T>[];
  activeValue: T;
  onChange: (value: T) => void;
  className?: string;
};

function ScrollableTabs<T extends string>({
  items,
  activeValue,
  onChange,
  className = "",
}: Readonly<ScrollableTabsProps<T>>) {
  return (
    <div
      role="tablist"
      className={`tabs tabs-box max-w-full flex-nowrap overflow-x-auto whitespace-nowrap ${className}`.trim()}
    >
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          className={`tab shrink-0 ${activeValue === item.value ? "tab-active" : ""}`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default ScrollableTabs;
