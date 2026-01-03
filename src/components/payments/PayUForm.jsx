"use client"
import { useEffect, useRef } from "react";

export default function PayUForm({ action, payload }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (payload) {
      formRef.current.submit();
    }
  }, [payload]);

  return (
    <form ref={formRef} method="POST" action={action}>
      {Object.entries(payload).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
    </form>
  );
}
