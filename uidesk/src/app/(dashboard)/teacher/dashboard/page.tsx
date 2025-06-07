"use client";

import React from "react";
import { useEffect, useState } from 'react';
import { fetchEvents } from '@/lib/supabase/fetchEvents';
import CopilotChatWrapper from "@/components/CopilotChatWrapper";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
};

function TodaysEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading events...</div>;
  }

  const today = new Date();
  const todayString = today.toDateString();

  // Filter events to only show today's events
  const todaysEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === todayString;
  });

  if (todaysEvents.length === 0) {
    return <div className="text-gray-600">No Events for Today</div>;
  }

  return (
    <div className="space-y-3">
      {todaysEvents.map((event) => (
        <div
          key={event.id}
          className="p-3 rounded-lg"
        >
          <h3 className="text-base font-semibold text-gray-800 mb-1">
            {event.title}
          </h3>
          <p className="text-gray-700 text-sm mb-2">
            {event.description}
          </p>
          <p className="text-xs text-gray-800">
            📅 {event.date}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6 py-20">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-5xl rounded-xl">
          {/* Welcome Message */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white-800 mb-6">
            Welcome to Your Dashboard
          </h1>
          <p className="text-white-600 text-xl mb-10">
            Here is today&apos;s event, your ticket reviews, schedule, and guide for more questions.
          </p>

          <div className="flex flex-col gap-6 rounded-xl shadow-md">
            {/* Row 1 */}
            <div className="flex gap-6">
              <div className="bg-white hover:bg-gray-50 transition rounded-xl p-6 shadow-md flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  📚 Today&apos;s Event
                </h2>
                <div className="text-gray-600">
                 <TodaysEvents />
                </div>
              </div>

              <div className="bg-white hover:bg-gray-50 transition rounded-xl p-6 shadow-md flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  🎫 Tickets
                </h2>
                <p className="text-gray-600">
                  Review students&apos; tickets and take action.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-6">
              <div className="bg-white hover:bg-gray-50 transition rounded-xl p-6 shadow-md flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  🖊️ Enroll
                </h2>
                <p className="text-gray-600">
                  Enroll students to the platform.
                </p>
              </div>

              <div className="bg-white hover:bg-gray-50 transition rounded-xl p-6 shadow-md flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  🎯 Need help?
                </h2>
                <p className="text-gray-600">
                  Ask Uina for more further questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}