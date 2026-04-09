"use client";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-sm">
      {children}
    </div>
  );
}

export function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full p-2.5 rounded-md bg-[#0b0f19] border border-[#1f2937] text-sm focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
    />
  );
}

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] transition py-2.5 rounded-md text-sm font-medium"
    >
      {children}
    </button>
  );
}