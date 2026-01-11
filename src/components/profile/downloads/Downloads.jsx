"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Download,
  FileText,
  Receipt,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  Shield,
  Wallet,
  X,
  FileCheck,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Award,
  FileBadge
} from "lucide-react"
import { useFetchMyDonationsQuery } from "@/utils/slices/donationApiSlice"
import { useSelector } from "react-redux"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function DownloadsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)






  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Form 10BE State
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("2024-25")

  const [currentPage, setCurrentPage] = useState(1)

  // Invoice Filters State
  const [invoiceFilters, setInvoiceFilters] = useState({
    search: "",
    donationType: "all",
    dateFilter: "all",
    customStartDate: "",
    customEndDate: "",
    show80GOnly: false
  })

  // Fetch real transactions
  const { data: myDonationsData, isLoading, isFetching } = useFetchMyDonationsQuery({
    page: currentPage,
    limit: 5,
    ...invoiceFilters
  })

  const donations = myDonationsData?.donations || []
  const pagination = myDonationsData?.pagination || { currentPage: 1, totalPages: 1, totalDonations: 0 }
  const stats = myDonationsData?.stats || { totalFilteredAmount: 0, total80GAmount: 0, eligibleDonationsCount: 0 }

  const [showCustomDateRange, setShowCustomDateRange] = useState(false)

  // Mock Data - Form 10BE Receipts
  const form10BEReceipts = [
    {
      year: "2024-25",
      status: "available",
      issueDate: "2025-04-15",
      totalAmount: 125000,
      transactionCount: 8
    },
    {
      year: "2023-24",
      status: "available",
      issueDate: "2024-05-10",
      totalAmount: 98000,
      transactionCount: 6
    },
    {
      year: "2022-23",
      status: "available",
      issueDate: "2023-05-20",
      totalAmount: 75000,
      transactionCount: 5
    }
  ]

  // Mock Data - Transactions
  const allTransactions = [
    {
      id: "TXN001",
      recipient: "Al-Noor Education Trust",
      cause: "Education",
      amount: 5000,
      date: "2024-11-10",
      time: "10:30 AM",
      type: "80G",
      eligible80G: true,
      donationType: "sadaqah",
      paymentMethod: "UPI",
      color: "blue"
    },
    {
      id: "TXN002",
      recipient: "Hope Medical Foundation",
      cause: "Healthcare",
      amount: 10000,
      date: "2024-11-05",
      time: "2:15 PM",
      type: "80G",
      eligible80G: true,
      donationType: "zakat",
      paymentMethod: "Card",
      color: "emerald"
    },
    {
      id: "TXN003",
      recipient: "Orphan Care Society",
      cause: "Children",
      amount: 7500,
      date: "2024-10-28",
      time: "11:45 AM",
      type: "80G",
      eligible80G: true,
      donationType: "sadaqah",
      paymentMethod: "Net Banking",
      color: "purple"
    },
    {
      id: "TXN004",
      recipient: "Food Relief Program",
      cause: "Food Security",
      amount: 3000,
      date: "2024-10-15",
      time: "4:20 PM",
      type: "General",
      eligible80G: false,
      donationType: "imdaad",
      paymentMethod: "UPI",
      color: "orange"
    },
    {
      id: "TXN005",
      recipient: "Water Wells Project",
      cause: "Clean Water",
      amount: 15000,
      date: "2024-09-20",
      time: "9:00 AM",
      type: "80G",
      eligible80G: true,
      donationType: "sadaqah",
      paymentMethod: "Card",
      color: "blue"
    },
    {
      id: "TXN006",
      recipient: "Masjid Development Fund",
      cause: "Religious",
      amount: 8000,
      date: "2024-08-12",
      time: "3:30 PM",
      type: "General",
      eligible80G: false,
      donationType: "zakat",
      paymentMethod: "UPI",
      color: "green"
    }
  ]

  // Quick Date Filter Options
  const quickDateFilters = [
    { value: "all", label: "All Time" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-6-months", label: "Last 6 Months" },
    { value: "last-year", label: "Last Financial Year" },
    { value: "current-year", label: "Current Financial Year" },
    { value: "custom", label: "Custom Range" }
  ]

  const handleDownload10BE = (year) => {
    alert(`Downloading Form 10BE for FY ${year}`)
  }

  const handleDownloadAcknowledgement = async (txn) => {
    const doc = new jsPDF();
    const name = userInfo?.fullName || "Valued Donor";
    const date = new Date(txn.date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // 1. Logo (Top Left)
    // Using a placeholder TPF logo or text if image not available
    const logoData = await getLogoDataUrl('/TPFAid-Logo.png'); // Assuming standard logo path
    if (logoData) {
      doc.addImage(logoData.dataUrl, 'PNG', 15, 15, 40, 15);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(16, 185, 129); // Emerald
      doc.text("TPF Aid", 15, 25);
    }

    // 2. Company Address (Top Right)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    const addressLines = [
      "The People's Foundation",
      "123, Charity Lane, Main Street,",
      "Mumbai - 400001, Maharashtra. https://www.tpfaid.org",
      "| info@tpfaid.org | (+91) 9876543210"
    ];
    doc.text(addressLines, 200, 18, { align: "right" });

    // 3. Header: "Acknowledgement Of Payment" with Orange Underline
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Acknowledgement Of Payment", 15, 50);

    // Orange Underline
    doc.setDrawColor(245, 158, 11); // Orange
    doc.setLineWidth(1);
    doc.line(15, 52, 100, 52);

    // 4. Receipt Details Section
    let startY = 65;
    const lineHeight = 7;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Helper for bold label + normal value
    const addField = (label, value, y) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 15, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 55, y);
    };

    addField("Receipt No:", txn.id, startY);
    addField("Payment Mode:", txn.paymentMode || "Online", startY + lineHeight);

    startY += 20;

    addField("Donor Name:", name, startY);
    addField("Donation Date:", date, startY + lineHeight);

    // For "Donation To", we might need text wrapping if the cause title is long
    doc.setFont("helvetica", "bold");
    doc.text("Donation To:", 15, startY + lineHeight * 2);
    doc.setFont("helvetica", "normal");
    const causeTitle = txn.recipient || txn.cause || "General Donation";
    const splitCause = doc.splitTextToSize(causeTitle, 140);
    doc.text(splitCause, 55, startY + lineHeight * 2);

    // Adjust Y based on lines wrapped
    const causeHeight = splitCause.length * lineHeight;
    let currentY = startY + lineHeight * 2 + Math.max(lineHeight, causeHeight);

    addField("Fundraiser Type:", "Charity", currentY);
    addField("Fundraiser Owner:", "The People's Foundation", currentY + lineHeight);

    currentY += 15;

    addField("Donation Amount:", `INR ${txn.amount.toLocaleString('en-IN')}`, currentY);
    addField("Transaction ID:", txn.id, currentY + lineHeight);
    addField("Order Date:", date, currentY + lineHeight * 2); // Same as donation date for now

    // 5. Footer Note
    currentY += 25;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Note: Click on below link to download your 80G tax benefit certificate.", 15, currentY);

    currentY += 6;
    doc.setTextColor(29, 78, 216); // Blue link color
    doc.text("https://www.tpfaid.org/profile/downloads", 15, currentY);

    // Separator line
    currentY += 8;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(15, currentY, 195, currentY);

    // Disclaimer
    currentY += 8;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    const disclaimer = "This document is only an acknowledgement of your payment. If you have donated to an organization which is offering tax-exemption, you will receive the same from the non-profit within a month of your transaction. Please consider this as your transaction receipt for future reference.";
    const splitDisclaimer = doc.splitTextToSize(disclaimer, 180);
    doc.text(splitDisclaimer, 15, currentY);

    currentY += splitDisclaimer.length * 4 + 8;

    doc.setFont("helvetica", "normal");
    doc.text("For any further queries about your contribution, please write to ", 15, currentY);

    doc.setTextColor(29, 78, 216);
    doc.text("info@tpfaid.org", 95, currentY); // Adjust X based on text length
    doc.text(".", 118, currentY); // Period after email

    doc.save(`Acknowledgement_${txn.id}.pdf`);
  };

  // Helper function to load image and convert to data URL for PDF
  const getLogoDataUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg'),
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };

  const handleDownloadCertificate = async (currentTxn) => {
    // According to user: Date should be the absolute last donation date
    const lastDate = stats?.lastDonationDate || currentTxn.date;
    const dateStr = new Date(lastDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.')

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    const name = userInfo?.fullName?.toUpperCase() || "VALUED DONOR"

    try {
      // Load the template image
      const templateData = await getLogoDataUrl('/Certificate_Of_Achievement.jpg');
      if (templateData) {
        doc.addImage(templateData.dataUrl, 'JPEG', 0, 0, 297, 210);
      } else {
        // Fallback to simple design if image fails
        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(1);
        doc.rect(5, 5, 287, 200);
      }

      // Text placement adjusted for the provided template layout
      // The text block is on the right side (centered around X = 200)
      const centerX = 200;

      // 1. "CERTIFICATE" heading (large, emerald green, top right)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(48);
      doc.setTextColor(95, 188, 169); // Emerald/teal color matching template
      doc.text("CERTIFICATE", centerX + 16, 50, { align: "center" });

      // 2. "of Appreciation" subheading (smaller, grey)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(18);
      doc.setTextColor(140, 140, 140); // Light grey
      doc.text("of Appreciation", 230, 62, { align: "left" });
      // 3. "This certificate proudly present to"
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(120, 120, 120); // Medium grey
      doc.text("This certificate proudly present to", centerX, 90, { align: "left" });

      // 4. User Name 
      doc.setFont("helvetica", "bold");
      doc.setFontSize(40);
      doc.setTextColor(75, 150, 150);
      doc.text(name, centerX, 112, { align: "center" });



      // 6. Appreciation Text with Dynamic Date
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(110, 110, 110);

      // Line 1: "on [DATE] in sincere appreciation of his generous"
      const line1Part1 = "on ";
      const line1Part2 = dateStr;
      const line1Part3 = " in sincere appreciation of his generous";

      // Calculate widths for proper centering
      doc.setFont("helvetica", "normal");
      const w1 = doc.getStringUnitWidth(line1Part1) * 14 / doc.internal.scaleFactor;
      doc.setFont("helvetica", "bold");
      const w2 = doc.getStringUnitWidth(line1Part2) * 14 / doc.internal.scaleFactor;
      doc.setFont("helvetica", "normal");
      const w3 = doc.getStringUnitWidth(line1Part3) * 14 / doc.internal.scaleFactor;
      const totalWidth = w1 + w2 + w3;
      const startX = centerX - (totalWidth / 3);

      // Render line 1 with bold date
      doc.setFont("helvetica", "normal");
      doc.text(line1Part1, startX, 130, { align: "left" });
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 67); // Darker for date
      doc.text(line1Part2, startX + w1, 130, { align: "left" });
      doc.setFont("helvetica", "normal");
      doc.setTextColor(110, 110, 110);
      doc.text(line1Part3, startX + w1 + w2, 130, { align: "left" });

      // Line 2 & 3: Centered
      doc.text("donation & continued support, which have greatly", startX + w1 + 2, 140, { align: "left" });
      doc.text("contributed to support towards the cause.", startX + w2 + 3, 150, { align: "left" });

      doc.save(`Appreciation_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Certificate generation failed:", error);
      alert("Failed to generate certificate. Please check if the template image exists.");
    }
  }

  const handleDownloadAllInvoices = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...invoiceFilters,
        download: "true",
        status: "SUCCESS"
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/my-donations?${queryParams.toString()}`, {
        credentials: "include"
      });
      const data = await response.json();

      if (data.success) {
        // Simple CSV escape function
        const escapeCSV = (str) => {
          if (str === null || str === undefined) return "";
          str = String(str);
          if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        };

        const headers = ["Transaction ID", "Recipient", "Cause", "Amount", "Date", "Donation Type", "Tax Eligible", "Payment Mode"];
        const rows = data.donations.map(d => [
          d.id,
          d.recipient,
          d.cause,
          d.amount,
          new Date(d.date).toLocaleDateString('en-IN'),
          d.donationType,
          d.taxEligible ? "Yes" : "No",
          d.paymentMode
        ]);

        const csvContent = [
          headers.join(","),
          ...rows.map(r => r.map(escapeCSV).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `TPF_Donations_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("CSV Download failed:", error);
      alert("Failed to download CSV. Please try again.");
    }
  }

  const resetFilters = () => {
    setInvoiceFilters({
      search: "",
      donationType: "all",
      dateFilter: "all",
      customStartDate: "",
      customEndDate: "",
      show80GOnly: false
    })
    setCurrentPage(1)
    setShowCustomDateRange(false)
  }

  const getTypeColor = (color) => {
    const colors = {
      blue: darkMode ? "text-blue-400" : "text-blue-600",
      emerald: darkMode ? "text-emerald-400" : "text-emerald-600",
      purple: darkMode ? "text-purple-400" : "text-purple-600",
      orange: darkMode ? "text-orange-400" : "text-orange-600",
      green: darkMode ? "text-green-400" : "text-green-600",
      red: darkMode ? "text-red-400" : "text-red-600"
    }
    return colors[color] || colors.emerald
  }

  const getTypeBg = (color) => {
    const colors = {
      blue: darkMode ? "bg-blue-500/20" : "bg-blue-100",
      emerald: darkMode ? "bg-emerald-500/20" : "bg-emerald-100",
      purple: darkMode ? "bg-purple-500/20" : "bg-purple-100",
      orange: darkMode ? "bg-orange-500/20" : "bg-orange-100",
      green: darkMode ? "bg-green-500/20" : "bg-green-100",
      red: darkMode ? "bg-red-500/20" : "bg-red-100"
    }
    return colors[color] || colors.emerald
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gradient-to-br from-emerald-50 via-white to-teal-50"}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${darkMode
            ? "bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
            }`}
          style={{ backgroundSize: '48px 48px' }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-4 sm:mb-6"
          >
            <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl ${darkMode
              ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
              : "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl"
              }`}>
              <Download className={`w-12 h-12 sm:w-16 sm:h-16 ${darkMode ? "text-emerald-400" : "text-white"
                }`} />
            </div>
          </motion.div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4 ${darkMode ? "text-white" : "text-gray-900"
            }`}>
            Downloads &{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Receipts
            </span>
          </h1>

          <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4 ${darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
            Access your Form 10BE certificates and transaction invoices anytime
          </p>
        </motion.div>

        {/* Form 10BE Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <div className={`rounded-xl sm:rounded-2xl border overflow-hidden ${darkMode
            ? "bg-zinc-800/50 border-zinc-700"
            : "bg-white border-gray-200 shadow-lg"
            }`}>
            <div className={`p-4 sm:p-6 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"
              }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}>
                  <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold truncate ${darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    Form 10BE Receipts
                  </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                    Official tax exemption certificates
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {form10BEReceipts.map((receipt, index) => (
                  <motion.div
                    key={receipt.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`p-4 sm:p-6 rounded-xl border ${darkMode
                      ? "bg-zinc-900/50 border-zinc-700 hover:border-emerald-500/50"
                      : "bg-gray-50 border-gray-200 hover:border-emerald-400"
                      } transition-all`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          FY {receipt.year}
                        </h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                          <span className="text-xs sm:text-sm font-medium text-emerald-600 capitalize">
                            {receipt.status}
                          </span>
                        </div>
                      </div>
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-4">
                      <div className={`flex justify-between text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                        }`}>
                        <span>Total Amount:</span>
                        <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          ₹{receipt.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className={`flex justify-between text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                        }`}>
                        <span>Donations:</span>
                        <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          {receipt.transactionCount}
                        </span>
                      </div>
                      <div className={`flex justify-between text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                        }`}>
                        <span>Issue Date:</span>
                        <span className={darkMode ? "text-zinc-300" : "text-gray-700"}>
                          {new Date(receipt.issueDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload10BE(receipt.year)}
                      className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${darkMode
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      Download Receipt
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl ${darkMode ? "bg-blue-500/10 border border-blue-500/30" : "bg-blue-50 border border-blue-200"
                }`}>
                <p className={`text-xs sm:text-sm ${darkMode ? "text-blue-400" : "text-blue-700"
                  }`}>
                  <strong>Note:</strong> Form 10BE certificates are issued after the financial year ends and are available for download within 60 days.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Invoices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={`rounded-xl sm:rounded-2xl border overflow-hidden ${darkMode
            ? "bg-zinc-800/50 border-zinc-700"
            : "bg-white border-gray-200 shadow-lg"
            }`}>
            <div className={`p-4 sm:p-6 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"
              }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-blue-500/20" : "bg-blue-100"
                    }`}>
                    <Receipt className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold truncate ${darkMode ? "text-white" : "text-gray-900"
                      }`}>
                      Transaction Invoices
                    </h2>
                    <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                      Download acknowledgement for your donations
                    </p>
                  </div>
                </div>

                {pagination.totalDonations > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleDownloadAllInvoices}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${darkMode
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      Download All ({pagination.totalDonations})
                    </button>

                    <button
                      onClick={() => handleDownloadCertificate(donations[0])}
                      disabled={!stats?.lastDonationDate}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${darkMode
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                        }`}
                    >
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Download Certificate</span>
                      <span className="sm:hidden">Certificate</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-gray-50 border-gray-200"
                  }`}>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                    Filtered Total
                  </p>
                  <p className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    ₹{stats.totalFilteredAmount.toLocaleString('en-IN')}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-gray-500"
                    }`}>
                    {pagination.totalDonations} {pagination.totalDonations === 1 ? 'invoice' : 'invoices'}
                  </p>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${darkMode ? "bg-emerald-900/20 border-emerald-700/50" : "bg-emerald-50 border-emerald-200"
                  }`}>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-emerald-400" : "text-emerald-700"
                    }`}>
                    80G Eligible Amount
                  </p>
                  <p className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}>
                    ₹{stats.total80GAmount.toLocaleString('en-IN')}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? "text-emerald-500" : "text-emerald-600"
                    }`}>
                    {stats.eligibleDonationsCount} eligible donations
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"
                      }`} />
                    <input
                      type="text"
                      value={invoiceFilters.search}
                      onChange={(e) => setInvoiceFilters({ ...invoiceFilters, search: e.target.value })}
                      placeholder="Search..."
                      className={`w-full pl-9 sm:pl-11 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm sm:text-base ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                        }`}
                    />
                  </div>

                  {/* Donation Type Filter */}
                  <div className="relative">
                    <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"
                      }`} />
                    <select
                      value={invoiceFilters.donationType}
                      onChange={(e) => {
                        setInvoiceFilters({ ...invoiceFilters, donationType: e.target.value })
                        setCurrentPage(1)
                      }}
                      className={`pl-9 sm:pl-11 pr-8 py-2.5 rounded-lg border outline-none transition-all appearance-none cursor-pointer text-sm sm:text-base ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500"
                        }`}
                    >
                      <option value="all">All Types</option>
                      <option value="zakat">Zakaat</option>
                      <option value="sadaqah">Sadaqah</option>
                      <option value="lillah">Lillah</option>
                      <option value="imdad">Imdaad</option>
                    </select>
                  </div>
                </div>

                {/* 80G Toggle and Date Filters */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {/* 80G Toggle Button */}
                  <button
                    onClick={() => setInvoiceFilters({ ...invoiceFilters, show80GOnly: !invoiceFilters.show80GOnly })}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center gap-2 ${invoiceFilters.show80GOnly
                      ? darkMode
                        ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                        : "bg-emerald-500 text-white border-2 border-emerald-600"
                      : darkMode
                        ? "bg-zinc-700 text-zinc-400 border-2 border-zinc-600 hover:border-emerald-500/50"
                        : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-emerald-500/50"
                      }`}
                  >
                    <Shield className="w-4 h-4" />
                    80G Only
                  </button>

                  {quickDateFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setInvoiceFilters({ ...invoiceFilters, dateFilter: filter.value })
                        setCurrentPage(1)
                        setShowCustomDateRange(filter.value === "custom")
                      }}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${invoiceFilters.dateFilter === filter.value
                        ? darkMode
                          ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                          : "bg-emerald-500 text-white border-2 border-emerald-600"
                        : darkMode
                          ? "bg-zinc-700 text-zinc-400 border-2 border-zinc-600 hover:border-emerald-500/50"
                          : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-emerald-500/50"
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}

                  {(invoiceFilters.search || invoiceFilters.donationType !== "all" || invoiceFilters.dateFilter !== "all" || invoiceFilters.show80GOnly) && (
                    <button
                      onClick={resetFilters}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center gap-2 ${darkMode
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Custom Date Range */}
                {showCustomDateRange && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-gray-50 border-gray-200"
                      }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-400" : "text-gray-700"
                          }`}>
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={invoiceFilters.customStartDate}
                          onChange={(e) => setInvoiceFilters({ ...invoiceFilters, customStartDate: e.target.value })}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border outline-none transition-all text-sm sm:text-base ${darkMode
                            ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                            }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-400" : "text-gray-700"
                          }`}>
                          End Date
                        </label>
                        <input
                          type="date"
                          value={invoiceFilters.customEndDate}
                          onChange={(e) => setInvoiceFilters({ ...invoiceFilters, customEndDate: e.target.value })}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border outline-none transition-all text-sm sm:text-base ${darkMode
                            ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                            }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Transaction List */}
            <div className={`divide-y relative ${darkMode ? "divide-zinc-800" : "divide-zinc-100"}`}>
              {/* Loading Overlay */}
              {(isLoading || isFetching) && (
                <div className={`absolute inset-0 z-20 flex items-center justify-center ${darkMode ? "bg-zinc-900/40" : "bg-white/40"} backdrop-blur-[2px]`}>
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    <p className={`text-xs font-medium ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>Loading transactions...</p>
                  </div>
                </div>
              )}

              {donations.length === 0 && !isLoading && !isFetching ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${darkMode ? "bg-zinc-700" : "bg-gray-100"
                    }`}>
                    <FileCheck className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? "text-zinc-500" : "text-gray-400"
                      }`} />
                  </div>
                  <p className={`text-base sm:text-lg font-medium mb-1 ${darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    No invoices found
                  </p>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                donations.map((txn, index) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-3 sm:p-4 lg:p-5 transition-all group ${darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${getTypeBg(txn.color)
                        }`}>
                        <Wallet className={`w-5 h-5 sm:w-6 sm:h-6 ${getTypeColor(txn.color)}`} />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className={`font-semibold text-sm sm:text-base truncate ${darkMode ? "text-white" : "text-gray-900"
                            }`}>
                            {txn.recipient}
                          </h3>
                          {txn.taxEligible && (
                            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 flex-shrink-0 ${darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                              }`}>
                              <Shield className="w-3 h-3" />
                              80G
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBg(txn.color)
                            } ${getTypeColor(txn.color)}`}>
                            {txn.cause}
                          </span>
                          <span className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>•</span>
                          <span className={`text-xs capitalize ${darkMode ? "text-zinc-400" : "text-gray-600"
                            }`}>
                            {txn.donationType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <Calendar className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${darkMode ? "text-zinc-500" : "text-gray-400"
                            }`} />
                          <span className={darkMode ? "text-zinc-500" : "text-gray-500"}>
                            {new Date(txn.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className={`hidden sm:inline ${darkMode ? "text-zinc-600" : "text-gray-400"}`}>
                            •
                          </span>
                          <span className={`hidden sm:inline ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                            ID: {txn.id}
                          </span>
                        </div>
                      </div>

                      {/* Amount and Download */}
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className={`text-lg sm:text-xl font-bold ${getTypeColor(txn.color)}`}>
                            ₹{txn.amount.toLocaleString('en-IN')}
                          </p>
                          <p className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                            {txn.paymentMode || "Payment Mode"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() => handleDownloadAcknowledgement(txn)}
                            title="Download Acknowledgement"
                            className={`p-2.5 sm:p-3 rounded-lg transition-all flex-shrink-0 ${darkMode
                              ? "bg-zinc-700 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400"
                              : "bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600"
                              }`}
                          >
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className={`p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? "border-t border-zinc-800" : "border-t border-gray-100"}`}>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Showing <span className="font-semibold text-emerald-500">{(pagination.currentPage - 1) * 5 + 1}</span> to <span className="font-semibold text-emerald-500">{Math.min(pagination.currentPage * 5, pagination.totalDonations)}</span> of <span className="font-semibold text-emerald-500">{pagination.totalDonations}</span> results
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={pagination.currentPage === 1 || isFetching}
                      className={`p-2 rounded-lg border transition-all ${darkMode
                        ? "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white disabled:opacity-50"
                        : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                        }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Basic logic to show limited page numbers
                        if (
                          pageNum === 1 ||
                          pageNum === pagination.totalPages ||
                          (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${pagination.currentPage === pageNum
                                ? "bg-emerald-500 text-white"
                                : darkMode
                                  ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          (pageNum === 2 && pagination.currentPage > 3) ||
                          (pageNum === pagination.totalPages - 1 && pagination.currentPage < pagination.totalPages - 2)
                        ) {
                          return <span key={pageNum} className={darkMode ? "text-zinc-600" : "text-gray-400"}>...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                      disabled={pagination.currentPage === pagination.totalPages || isFetching}
                      className={`p-2 rounded-lg border transition-all ${darkMode
                        ? "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white disabled:opacity-50"
                        : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                        }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${darkMode
            ? "bg-gradient-to-br from-blue-900/30 to-emerald-900/30 border border-blue-700/30"
            : "bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200"
            }`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 ${darkMode ? "bg-blue-500/20" : "bg-blue-100"
              }`}>
              <FileText className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? "text-blue-400" : "text-blue-600"
                }`} />
            </div>
            <div>
              <h3 className={`font-bold text-base sm:text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"
                }`}>
                Important Information
              </h3>
              <ul className={`space-y-1.5 sm:space-y-2 text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>All invoices are generated automatically upon successful donation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Form 10BE certificates include all 80G eligible donations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Keep these documents safe for tax filing purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>You can download your receipts anytime - they don't expire</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-6 sm:mt-8 px-4"
        >
          <p className={`text-xs sm:text-sm mb-2 ${darkMode ? "text-zinc-500" : "text-gray-500"
            }`}>
            Need help? Contact our support team for assistance.
          </p>
          <a href="/contactus" className={`text-xs sm:text-sm font-medium underline ${darkMode ? "text-emerald-400 hover:text-emerald-500" : "text-emerald-600 hover:text-emerald-700"
            }`}>
            Visit Support Center
          </a>
        </motion.div>
      </div>
    </div>
  )
}