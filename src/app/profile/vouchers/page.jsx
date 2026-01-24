"use client";

import VoucherMain from "@/components/profile/vouchers/VoucherMain";

export default function VouchersPage() {
    // Get darkMode from parent layout via context or pass it down
    const darkMode = typeof window !== 'undefined'
        ? localStorage.getItem('darkMode') === 'true'
        : false;

    return <VoucherMain darkModeFromParent={darkMode} />;
}
