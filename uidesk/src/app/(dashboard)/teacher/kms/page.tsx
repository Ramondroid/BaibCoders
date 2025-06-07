/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Save,
  Database,
  Users,
  Settings,
  BookOpen,
  Calendar,
  FileText,
  MessageCircle,
  Phone,
  Home,
  FileMinus,
  Book,
  Monitor,
  Briefcase,
  Building,
  DollarSign,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

import { StringUtils } from "@azure/msal-browser";

// Type definitions (unchanged)
type CourseRegistrationInfo = {
  DegreeProgram: string;
  Semester: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  Instructions: string;
  Schedule: string;
  Requirements: string;
};

type OfficeDirectory = {
  OfficeName: string;
  Location: string;
  Hours: string;
  Email: string;
  Phone: string;
};

type SupportServices = {
  Service: string;
  ContactOffice: string;
  Description: string;
  Website: string;
};

type AssessmentIssues = {
  Issue: string;
  RelevantOffice: string;
  ResolutionSteps: string;
};

type GradeAppealProcess = {
  Step: number;
  Deadline: string;
  ActionRequired: string;
  ContactPersonOrOffice: string;
};

type ScheduleConflictsHelp = {
  ConflictType: string;
  RecommendedAction: string;
  ContactOffice: string;
};

type AdvisingSupport = {
  Topic: string;
  Description: string;
  Advisor: string;
};

type ContactDirectory = {
  Name: string;
  Department: string;
  Email: string;
  Title: string;
  Phone: string;
};

type CourseWithdrawalPolicies = {
  PolicyID: string;
  PolicyDescription: string;
  KeyDeadline: string;
  RelevantForm: string;
};

type DocumentRequestInfo = {
  Document: string;
  ProcessingTime: string;
  Fee: string;
  RequestProcedure: string;
};

type DormitorySupport = {
  Topic: string;
  Question: string;
  Answer: string;
};

type FacilityReservations = {
  Facility: string;
  Capacity: string;
  BookingLeadTime: string;
  ContactOffice: string;
};

type ITSupportFAQ = {
  Question: string;
  Answer: string;
  Category: string;
};

type LibraryInfo = {
  LibraryName: string;
  Location: string;
  Hours: string;
  ContactInfo: string;
  Services: string;
  SpecialCollections: string;
  LibrarianCharge: string;
  Capacity: string;
  Notes: string;
};

type Opportunities = {
  Type: string;
  Title: string;
  Deadline: string;
  CompanyOrOrganization: string;
};

type ScholarshipSupport = {
  ScholarshipName: string;
  EligibilityCriteria: string;
  Amount: string;
  ApplicationDeadline: string;
};

type SchoolCalendar = {
  Event: string;
  Notes: string;
  StartDate: string;
  EndDate: string;
};

type StudentOrganization = {
  OrganizationName: string;
  Category: string;
  Email: string;
  President: string;
};

type StudyTips = {
  Category: string;
  Tip: string;
  Explanation: string;
};
type StudentConcernContacts = {
  ConcernType: string;
};

// Form configurations (unchanged)
const formConfigs = {
  CourseRegistrationInfo: {
    title: "Course Registration Info",
    icon: BookOpen,
    fields: [
      {
        name: "DegreeProgram",
        label: "Degree Program",
        type: "text",
        required: true,
      },
      { name: "Semester", label: "Semester", type: "text", required: true },
      {
        name: "RegistrationStart",
        label: "Registration Start",
        type: "date",
        required: true,
      },
      {
        name: "RegistrationEnd",
        label: "Registration End",
        type: "date",
        required: true,
      },
      {
        name: "Instructions",
        label: "Instructions",
        type: "textarea",
        required: true,
      },
      { name: "Schedule", label: "Schedule", type: "text", required: true },
      {
        name: "Requirements",
        label: "Requirements",
        type: "text",
        required: true,
      },
    ],
  },
  OfficeDirectory: {
    title: "Office Directory",
    icon: Users,
    fields: [
      {
        name: "OfficeName",
        label: "Office Name",
        type: "text",
        required: true,
      },
      { name: "Location", label: "Location", type: "text", required: true },
      { name: "Hours", label: "Office Hours", type: "text", required: true },
      { name: "Email", label: "Email", type: "email", required: true },
      { name: "Phone", label: "Phone", type: "tel", required: true },
    ],
  },
  SupportServices: {
    title: "Support Services",
    icon: Settings,
    fields: [
      { name: "Service", label: "Service", type: "text", required: true },
      {
        name: "ContactOffice",
        label: "Contact Office",
        type: "text",
        required: true,
      },
      {
        name: "Description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      { name: "Website", label: "Website", type: "text", required: true },
    ],
  },
  AssessmentIssues: {
    title: "Assessment Issues",
    icon: Calendar,
    fields: [
      { name: "Issue", label: "Issue", type: "text", required: true },
      {
        name: "RelevantOffice",
        label: "Relevant Office",
        type: "text",
        required: true,
      },
      {
        name: "ResolutionSteps",
        label: "Resolution Steps",
        type: "textarea",
        required: true,
      },
    ],
  },
  GradeAppealProcess: {
    title: "Grade Appeal Process",
    icon: FileText,
    fields: [
      { name: "Step", label: "Step", type: "textarea", required: true },
      { name: "Deadline", label: "Deadline", type: "date", required: true },
      {
        name: "ActionRequired",
        label: "Action Required",
        type: "url",
        required: true,
      },
      {
        name: "ContactPersonOrOffice",
        label: "Contact Person or Office",
        type: "text",
        required: true,
      },
    ],
  },
  ScheduleConflictsHelp: {
    title: "Schedule Conflicts Help",
    icon: MessageCircle,
    fields: [
      {
        name: "ConflictType",
        label: "Conflict Type",
        type: "text",
        required: true,
      },
      {
        name: "RecommendedAction",
        label: "Recommended Action",
        type: "textarea",
        required: true,
      },
      {
        name: "ContactOffice",
        label: "Contact Office",
        type: "email",
        required: true,
      },
    ],
  },
  AdvisingSupport: {
    title: "Advising Support",
    icon: BookOpen,
    fields: [
      { name: "Topic", label: "Topic", type: "text", required: true },
      {
        name: "Description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      { name: "Advisor", label: "Advisor", type: "text", required: true },
    ],
  },

  ContactDirectory: {
    title: "Contact Directory",
    icon: Phone,
    fields: [
      { name: "Name", label: "Name", type: "text", required: true },
      { name: "Department", label: "Department", type: "text", required: true },
      { name: "Email", label: "Email", type: "text", required: true },
      { name: "Title", label: "Title", type: "text", required: true },
      { name: "Phone", label: "Phone", type: "text", required: true },
    ],
  },

  CourseWithdrawalPolicies: {
    title: "Course Withdrawal Policies",
    icon: FileMinus,
    fields: [
      { name: "PolicyID", label: "Policy ID", type: "text", required: true },
      {
        name: "PolicyDescription",
        label: "Policy Description",
        type: "textarea",
        required: true,
      },
      {
        name: "KeyDeadline",
        label: "Key Deadline",
        type: "text",
        required: true,
      },
      {
        name: "RelevantForm",
        label: "Relevant Form",
        type: "text",
        required: true,
      },
    ],
  },

  DocumentRequestInfo: {
    title: "Document Request Info",
    icon: FileText,
    fields: [
      { name: "Document", label: "Document", type: "text", required: true },
      {
        name: "ProcessingTime",
        label: "Processing Time",
        type: "text",
        required: true,
      },
      { name: "Fee", label: "Fee", type: "text", required: true },
      {
        name: "RequestProcedure",
        label: "Request Procedure",
        type: "textarea",
        required: true,
      },
    ],
  },

  DormitorySupport: {
    title: "Dormitory Support",
    icon: Home,
    fields: [
      { name: "Topic", label: "Topic", type: "text", required: true },
      { name: "Question", label: "Question", type: "text", required: true },
      { name: "Answer", label: "Answer", type: "textarea", required: true },
    ],
  },

  FacilityReservations: {
    title: "Facility Reservations",
    icon: Building,
    fields: [
      { name: "Facility", label: "Facility", type: "text", required: true },
      { name: "Capacity", label: "Capacity", type: "text", required: true },
      {
        name: "BookingLeadTime",
        label: "Booking Lead Time",
        type: "text",
        required: true,
      },
      {
        name: "ContactOffice",
        label: "Contact Office",
        type: "text",
        required: true,
      },
    ],
  },

  ITSupportFAQ: {
    title: "IT Support FAQ",
    icon: Monitor,
    fields: [
      { name: "Question", label: "Question", type: "text", required: true },
      { name: "Answer", label: "Answer", type: "textarea", required: true },
      { name: "Category", label: "Category", type: "text", required: true },
    ],
  },

  LibraryInfo: {
    title: "Library Info",
    icon: Book,
    fields: [
      {
        name: "LibraryName",
        label: "Library Name",
        type: "text",
        required: true,
      },
      { name: "Location", label: "Location", type: "text", required: true },
      { name: "Hours", label: "Hours", type: "text", required: true },
      {
        name: "ContactInfo",
        label: "Contact Info",
        type: "text",
        required: true,
      },
      { name: "Services", label: "Services", type: "textarea", required: true },
      {
        name: "SpecialCollections",
        label: "Special Collections",
        type: "text",
        required: true,
      },
      {
        name: "LibrarianCharge",
        label: "Librarian In Charge",
        type: "text",
        required: true,
      },
      { name: "Capacity", label: "Capacity", type: "text", required: true },
      { name: "Notes", label: "Notes", type: "textarea", required: false },
    ],
  },

  Opportunities: {
    title: "Opportunities",
    icon: Briefcase,
    fields: [
      { name: "Type", label: "Type", type: "text", required: true },
      { name: "Title", label: "Title", type: "text", required: true },
      { name: "Deadline", label: "Deadline", type: "text", required: true },
      {
        name: "CompanyOrOrganization",
        label: "Company or Organization",
        type: "text",
        required: true,
      },
    ],
  },

  ScholarshipSupport: {
    title: "Scholarship Support",
    icon: DollarSign,
    fields: [
      {
        name: "ScholarshipName",
        label: "Scholarship Name",
        type: "text",
        required: true,
      },
      {
        name: "EligibilityCriteria",
        label: "Eligibility Criteria",
        type: "textarea",
        required: true,
      },
      { name: "Amount", label: "Amount", type: "text", required: true },
      {
        name: "ApplicationDeadline",
        label: "Application Deadline",
        type: "text",
        required: true,
      },
    ],
  },

  SchoolCalendar: {
    title: "School Calendar",
    icon: Calendar,
    fields: [
      { name: "Event", label: "Event", type: "text", required: true },
      { name: "Notes", label: "Notes", type: "textarea", required: false },
      { name: "StartDate", label: "Start Date", type: "text", required: true },
      { name: "EndDate", label: "End Date", type: "text", required: true },
    ],
  },

  StudentOrganization: {
    title: "Student Organization",
    icon: Users,
    fields: [
      {
        name: "OrganizationName",
        label: "Organization Name",
        type: "text",
        required: true,
      },
      { name: "Category", label: "Category", type: "text", required: true },
      { name: "Email", label: "Email", type: "text", required: true },
      { name: "President", label: "President", type: "text", required: true },
    ],
  },

  StudyTips: {
    title: "Study Tips",
    icon: Lightbulb,
    fields: [
      { name: "Category", label: "Category", type: "text", required: true },
      { name: "Tip", label: "Tip", type: "text", required: true },
      {
        name: "Explanation",
        label: "Explanation",
        type: "textarea",
        required: true,
      },
    ],
  },

  StudentConcernContacts: {
    title: "Student Concern Contacts",
    icon: AlertTriangle,
    fields: [
      {
        name: "ConcernType",
        label: "Concern Type",
        type: "text",
        required: true,
      },
    ],
  },
};

export default function KMSManagement() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const resetForm = () => {
    setFormData({});
    setSubmitMessage(null);
  };

  useEffect(() => {
    if (submitMessage?.includes("✅")) {
      const timeout = setTimeout(() => {
        resetForm();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [submitMessage]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const config = formConfigs[selectedTable as keyof typeof formConfigs];
      const requiredFields = config.fields.filter((field) => field.required);

      for (const field of requiredFields) {
        if (!formData[field.name] || formData[field.name].trim() === "") {
          setSubmitMessage(`❌ ${field.label} is required.`);
          setIsSubmitting(false);
          return;
        }
      }

      const response = await fetch("/api/kms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: selectedTable,
          data: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unknown error");
      }

      setSubmitMessage("✅ Entry added successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Submission error:", error);
        setSubmitMessage(`❌ Error: ${error.message}`);
      } else {
        setSubmitMessage("❌ An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (!selectedTable) return null;
    const config = formConfigs[selectedTable as keyof typeof formConfigs];
    const IconComponent = config.icon;

    return (
      <div className="bg-[#2a2b31] text-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <IconComponent className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold">{config.title}</h2>
        </div>

        <div className="space-y-6">
          {config.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1e1f24] border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors text-white"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1e1f24] border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors text-white"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Add Entry
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>

          {submitMessage && (
            <div
              className={`p-4 rounded-lg text-center font-medium ${
                submitMessage.includes("✅")
                  ? "bg-green-800 text-green-100"
                  : "bg-red-800 text-red-100"
              }`}
            >
              {submitMessage}
            </div>
          )}
        </div>

        <button
          onClick={() => setSelectedTable(null)}
          className="mt-6 text-purple-400 hover:text-purple-300 font-medium"
        >
          ← Back to selection
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4.25rem)] bg-gradient-to-br from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-extrabold">KMS Management System</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Manage your knowledge base entries across different categories
          </p>
        </div>

        {!selectedTable ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(formConfigs).map(([tableName, config]) => {
              const IconComponent = config.icon;
              return (
                <div
                  key={tableName}
                  onClick={() => setSelectedTable(tableName)}
                  className="bg-gray hover:bg-[#34353c] transition text-white rounded-xl shadow-md p-8 cursor-pointer transform hover:scale-105 duration-300 border border-gray-700"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-800/20 rounded-full mb-4">
                      <IconComponent className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {config.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Add new entries to the {config.title.toLowerCase()}{" "}
                      database
                    </p>
                    <div className="flex items-center justify-center gap-2 text-purple-300 font-medium">
                      <Plus className="h-4 w-4" />
                      Add New Entry
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          renderForm()
        )}
      </div>
    </div>
  );
}
