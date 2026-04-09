"use client";

import { useEffect, useState } from "react";

export default function Toast({ message }: { message: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white text-black px-4 py-2 rounded-full shadow-lg text-sm">
      {message}
    </div>
  );
}