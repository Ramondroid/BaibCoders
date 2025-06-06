  'use client';

  import React from 'react';
  import { FaUser, FaChartPie, FaCog } from 'react-icons/fa';
  import CopilotIframe from "@/components/CopilotIframe";
import CopilotChat from '@/components/CopilotChat';

  export default function DashboardPage() {
    return (
      <div className="min-h-screen flex bg-gray-100">
      <CopilotChat />
      </div>
    );
  }

  