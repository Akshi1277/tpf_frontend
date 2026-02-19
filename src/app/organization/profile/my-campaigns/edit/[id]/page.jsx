"use client";

import { useParams } from "next/navigation";
import CampaignRequestFormPage from "@/components/orgProfile/MyCampaigns/CampaignRequestFormPage";

export default function EditCampaignPage() {
    const { id } = useParams();
    return <CampaignRequestFormPage editId={id} />;
}
